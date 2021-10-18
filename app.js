"use strict";
function randomImage(width, height) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return "";
    // code from https://stackoverflow.com/questions/1484506/random-color-generator#comment6801353_5365036
    const colors = [...new Array(3)].map(
        () => `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    );
    const randomNumber = (max = 1, min = 0) =>
        Math.floor(Math.random() * (max - min)) + min;
    const circleCount = (width * height) / 2000;
    const maxRadius = width / 6;
    const minRadius = randomNumber(maxRadius * 0.9, 20);
    const drawCircle = (n) => {
        context.beginPath();
        context.arc(
            randomNumber(width),
            randomNumber(height),
            randomNumber(maxRadius, minRadius),
            0,
            Math.PI * 2,
            false
        );
        context.fillStyle = colors[n % 3];
        context.fill();
    };
    // Initialize canvas
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, height);
    // Filter
    context.filter = "blur(50px) saturate(1.5)";
    // Add circles
    for (let i = 0; i < circleCount; i++) {
        drawCircle(i);
    }
    return canvas.toDataURL();
}

const img = document.createElement("img");
const handleClick = () =>
    (img.src = randomImage(window.innerWidth, window.innerHeight));

handleClick();
img.addEventListener("click", handleClick);

document.getElementById("app").append(img);
