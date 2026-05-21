const API_URL = 'https://edit-additions-links-rebates.trycloudflare.com';

const socket = io(API_URL);

let lastCount = 0;

document.getElementById('upl-form').addEventListener("submit", async e => {
    e.preventDefault();

    await savePosts();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

async function savePosts(){
    try{
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        if(!blob) return;
    
        const formData = new FormData();
        formData.append('image', blob, 'drawing.png');
    
        await fetch(`${API_URL}/drawings`, {
            method: 'POST',
            body: formData,
        });
        lastCount = 0;
    }catch (err){
        console.error(err);
        alert('Ошибка загрузки')
    }
}

async function loadPosts(){
    const response = await fetch(`${API_URL}/drawings`);
    const drawings = await response.json();
    
    const postEl = document.getElementById('post-el');
        
    drawings.forEach(addImage);

    lastCount = drawings.length
}

function addImage(drawing){
    const img = document.createElement('img');
    img.src = drawing.url;
    img.className = 'canvas-post';
    document.getElementById('post-el').appendChild(img);
}

socket.on('new-post', drawing => {
    addImage(drawing);
});

window.onload = async function(e){
    e.preventDefault();

    await loadPosts();
}
