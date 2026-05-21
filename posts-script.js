const API_URL = 'https://telecharger-diff-suite-antenna.trycloudflare.com';

let lastCount = 0;

document.getElementById('upl-form').addEventListener("submit", async e => {
    e.preventDefault();

    await savePosts();
    await loadPosts();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

async function savePosts(){
    try{
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
    try{
        const response = await fetch(`${API_URL}/drawings`);
        const drawings = await response.json();
    
        if (drawings.length === lastCount) return;
    
        lastCount = drawings.length;
        document.getElementById('post-el').innerHTML = '<h3>Uploads</h3>';
        
        drawings.forEach(drawing => {
            const img = document.createElement('img');
            img.src = drawing.url + '?t=' + Date.now();
            img.className = "canvas-post";
            document.getElementById('post-el').appendChild(img);
        });
    }catch (err) {
        console.error(err)
    }
}

window.onload = async function(e){
    e.preventDefault();

    await loadPosts();
}
