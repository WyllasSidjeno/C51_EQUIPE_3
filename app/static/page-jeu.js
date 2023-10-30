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

const draw_level = (data, level_gotten) => {
    let lvl = 'Level_' + level_gotten;
    let ctr = ['WallsFar','Walls', 'WallDeco', 'Wood', 'Environment', 'Floor', 'WallSides', 'BigLadders', 'SmallLaddersAndDoors']

    data['levels'].forEach(level => {
        if (level['identifier'] === lvl){

            let tab = [];
            level['layerInstances'].forEach(layer => {
                tab.push(layer);
            });
            console.log(tab);

            // put the elements in the right order
            let tabOrdre = [];
            for (let i = 0; i < ctr.length; i++) {
                for (let j = 0; j < tab.length; j++) {
                    if (ctr[i] === tab[j]['__identifier']) {
                        let temp = tab[j];
                        tabOrdre.push(temp);
                    }
                }
            }
            console.log(tabOrdre);

            level['layerInstances'].forEach(layer => {
                tabOrdre.forEach(element => {

                    element.gridTiles.forEach(tile => {
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

                });
            })
        }
    });



}
