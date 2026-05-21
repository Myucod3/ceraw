let lastCount = 0;

document.getElementById('upl-form').addEventListener("submit", async e => {
    e.preventDefault();

    await savePosts();
    await loadPosts();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

async function savePosts(){
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    if (canvas.toDataURL() === blank.toDataURL()) {
        alert('Рисуй!!!!!!!');
        return
    }
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    const formData = new FormData();
    formData.append('image', blob, 'drawing.png');

    await fetch('https://telecharger-diff-suite-antenna.trycloudflare.com/drawings', {
        method: 'POST',
        body: formData,
    });
}

async function loadPosts(){
    const response = await fetch('https://telecharger-diff-suite-antenna.trycloudflare.com/drawings');
    const drawings = await response.json();

    if (drawing.length === lastCount) return;

    lastCount = drawings.length;
    document.getElementById('post-el').innerHTML = '<h3>Uploads</h3>';
    
    drawings.forEach(drawing => {
        const img = document.createElement('img');
        img.src = drawing.url;
        img.id = "canvas-post";
        document.getElementById('post-el').appendChild(img);
    });
}

window.onload = async function(e){
    e.preventDefault();

    await loadPosts();
}
