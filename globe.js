import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from "https://esm.sh/d3-geo@3";
import { feature } from "https://esm.sh/topojson-client@3";

const globeSlot = document.getElementById("home-globe-slot");

let canvas = null;

if (globeSlot) {
    globeSlot.innerHTML = '<canvas id="home-globe"></canvas>';
    canvas = document.getElementById("home-globe");
}

if (canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth || 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const projection = geoOrthographic()
        .scale(size / 2 - 2)
        .translate([size / 2, size / 2])
        .clipAngle(90);

    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();
    const sphere = { type: "Sphere" };

    const markers = [
        { name: "USA", coordinates: [-90.0715, 29.9511] },
        { name: "Bangladesh", coordinates: [90.4125, 23.8103] },
    ];

    let land = null;
    let rotation = 0;

    function isFrontFacing([lng, lat]) {
        const rotate = projection.rotate();
        const center = [-rotate[0], -rotate[1]];
        return geoDistance([lng, lat], center) < Math.PI / 2;
    }

    function render() {
        rotation += 0.25;
        projection.rotate([rotation, -15]);

        ctx.clearRect(0, 0, size, size);

        ctx.beginPath();
        path(sphere);
        ctx.fillStyle = "#f6f6f6";
        ctx.fill();
        ctx.strokeStyle = "#d5d5d5";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        path(graticule);
        ctx.strokeStyle = "#e2e2e2";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (land) {
            ctx.beginPath();
            path(land);
            ctx.fillStyle = "#9a9a9a";
            ctx.fill();
            ctx.strokeStyle = "#7d7d7d";
            ctx.lineWidth = 0.4;
            ctx.stroke();
        }

        markers.forEach((m) => {
            if (!isFrontFacing(m.coordinates)) return;
            const p = projection(m.coordinates);
            if (!p) return;

            ctx.beginPath();
            ctx.arc(p[0], p[1], 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#e5852a";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p[0], p[1], 7, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(229, 133, 42, 0.45)";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = "bold 11px 'Source Code Pro', monospace";
            ctx.fillStyle = "#333333";
            ctx.textAlign = "center";
            ctx.fillText(m.name, p[0], p[1] - 12);
        });

        requestAnimationFrame(render);
    }

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then((res) => res.json())
        .then((world) => {
            land = feature(world, world.objects.countries);
        })
        .catch((err) => console.error("Globe: failed to load world map", err))
        .finally(() => requestAnimationFrame(render));
}
