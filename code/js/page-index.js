window.addEventListener('load', () => {
    let canvas = document.querySelector('.index-canvas');
    let title = canvas.getContext('2d');
    title.font = '50px Arial';
    title.fillStyle = '#fff';
    title.strokeStyle = '#000';
    title.lineWidth = 2;
    
    title.strokeText('Run Like Hell', 0, 50);
});