window.addEventListener('load', () => {
   let topnav = document.querySelector('.topnav');
   let mute = document.querySelector('#muted');
   let volume = document.querySelector('#volumeOn');
   

   topnav.style.display = 'none';
   mute.style.display = 'none';
   volume.style.display = 'none';

   fetch('/static/map1.json')
    .then(response => response.json())
    .then(data => {
        draw_level(data, 0);
    })
    .catch(error => console.log("JSON parsing error: " + error));
});

const draw_level = (data, level) => {
    // let level = data.levels[0];
    // let wallImg = level.layerInstances.find(level => level.__identifier === "Walls");
    // let wallDecoImg = level.layerInstances.find(level => level.__identifier === "WallDeco");
    // let wood = level.layerInstances.find(level => level.__identifier === "Wood");
    // let envImg = level.layerInstances.find(level => level.__identifier === "Environment");
    // let floorImg = level.layerInstances.find(level => level.__identifier === "Floor");
    // let wallSidesImg = level.layerInstances.find(level => level.__identifier === "WallSides");

    


    let lvl = 'Level_' + level

    let ctr = ['Walls', 'WallDeco', 'Wood', 'Environment', 'Floor', 'WallSides', 'BigLadders', 'SmallLaddersAndDoors', 'WallsFar']

    data['levels'].forEach(level => {
        if (level['identifier'] == lvl){
            ctr = level['layerInstances'].length;

            let tab = [];
            level['layerInstances'].forEach(layer => {
                tab.push(layer['__identifier']);
            });

            level['layerInstances'].forEach(layer => {
                tab.forEach(element => {
                    let cpt = 0;
                    if (element[cpt] in ctr) {

                        layer.gridTiles.forEach(tile => {
                            let img = new Image();
                            img.src = layer.__tilesetRelPath;
                            img.onload = () => {
                                let canvas = document.querySelector('.canvas');
                                let ctx = canvas.getContext("2d");
                                ctx.drawImage(img,
                                    tile.src[0],
                                    tile.src[1],
                                    layer.__gridSize,
                                    layer.__gridSize,
                                    tile.px[0],
                                    tile.px[1],
                                    layer.__gridSize,
                                    layer.__gridSize
                                );
                            }
                        });
                        cpt++;
                    }
                });
            })
        }
    });



}
