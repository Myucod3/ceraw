document.getElementById('upl-form').addEventListener("submit", async e => {
    e.preventDefault();

    await savePosts();
    await loadPosts();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

async function savePosts(){
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
