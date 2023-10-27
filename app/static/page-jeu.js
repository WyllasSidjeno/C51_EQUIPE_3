window.addEventListener('load', () => {
   let topnav = document.querySelector('.topnav');
   let mute = document.querySelector('#muted');
   let volume = document.querySelector('#volumeOn');
   let canvas = document.querySelector('.canvas');

   topnav.style.display = 'none';
   mute.style.display = 'none';
   volume.style.display = 'none';

   fetch('/static/map1.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log("JSON parsing error" + error));
});
