const canvas = document.getElementById('post');
const ctx = canvas.getContext('2d');

let drawing = false;
let erasing = false;
let brushColor = 'black';
let brushSize = 2;

document.getElementById('2px-btn').onclick () => {
    brushSize = 2;
    brushSizeInfo();
};

document.getElementById('4px-btn').onclick () => {
    brushSize = 4;
    brushSizeInfo();
};

document.getElementById('6px-btn').onclick () => {
    brushSize = 6;
    brushSizeInfo();
};

document.getElementById('8px-btn').onclick () => {
    brushSize = 8;
    brushSizeInfo();
};

document.getElementById('tool-ers').onclick () => {
    erasing = !erasing;

    document.getElementById('tool-ers').textContent = erasing ? "Pen" : "Eraser";
};

document.getElementById('tool-clr').addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("pointerdown", e => {
    drawing = true;

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointermove", e => {
    if(!drawing) return;

    if(erasing) {
        ctx.globalCompositeOperation = "destination-out";
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = brushColor;
    }
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});



canvas.addEventListener("pointerup", () => drawing = false);
canvas.addEventListener("pointerleave", () => drawing = false);

document.getElementById("brs-size-inf").innerHTML = brushSize;

function brushSizeInfo(){
    document.getElementById("brs-size-inf").textContent = brushSize;
}

window.addEventListener("pointerup", () => drawing = false);
window.addEventListener("pointercancel", () => drawing = false);
