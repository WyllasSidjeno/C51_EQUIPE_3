window.addEventListener('load', () => {
   let topnav = document.querySelector('.topnav');
   let mute = document.querySelector('#muted');
   let volume = document.querySelector('#volumeOn');
   let canvas = document.querySelector('.canvas');
   let floor = document.querySelector('#floor');
   const ctx = canvas.getContext("2d");

   topnav.style.display = 'none';
   mute.style.display = 'none';
   volume.style.display = 'none';

   fetch('/static/map1.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data.defs["layers"]);

        const layers = data.defs["layers"];
        const level = data.levels[0];
        const floorPos = layers.find(layer => layer.identifier === "Floor");
        const floorImg = level.layerInstances.find(level => level.__identifier === "Floor");
        
        let newFloor = document.createElement('div');
        floor.appendChild(newFloor);
        newFloor.classList.add('floor');
        // newFloor.style.backgroundImage = "url('/static/img/floor.png')";
        newFloor.style.width = floorPos.gridSize + "px";
        
        console.log(floorImg);
    })
    .catch(error => console.log("JSON parsing error" + error));
});
