import { collisionBlock } from "./collisionBlock.js"

export class LevelGenerator {
    constructor(data) {
        this.data = data
        this.dataLevel = null
        this.size = {
            width: 0,
            height: 0
        }
    }

    parseLevel2D(level) {
        this.dataLevel = this.data["levels"][level]["layerInstances"][0]
        let matrice = this.dataLevel["intGridCsv"]

        let mapWidth = this.dataLevel["__cWid"]
        let mapHeight = this.dataLevel["__cHei"]

        let canvas = document.querySelector('#game')

        this.size.width = mapWidth * 16
        this.size.height = mapHeight * 16

        let blockList = []
        for (let i = 0; i < matrice.length; i += mapWidth) {
            blockList.push(matrice.slice(i, i + mapWidth))
        }

        return this.parseLevelCollision(blockList)
    }

    parseLevelCollision(blockList) {
        let collisionBlockList = []

        blockList.forEach((row, y) => {
            row.forEach((block, x) => {
                if (block == 1) {
                    collisionBlockList.push(new collisionBlock({ position: { x: x * 16, y: y * 16} }, "block"))
                } else if (block == 2) {
                    collisionBlockList.push(new collisionBlock({ position: { x: x * 16, y: y * 16} }, "ladder"))
                } else if (block == 3) {
                    collisionBlockList.push(new collisionBlock({ position: { x: x * 16, y: y * 16} }, "door"))
                } 
            })
        })

        return collisionBlockList
    }

    draw_level(level_gotten) {
        let lvl = 'Level_' + level_gotten;
        let ctr = ['Walls','WallsFar', 'WallDeco', 'Wood', 'Environment', 'Floor', 'WallSides', 'BigLadders', 'SmallLaddersAndDoors']
    
        this.data['levels'].forEach(level => {
            if (level['identifier'] === lvl){
    
                let tab = [];
                level['layerInstances'].forEach(layer => {
                    tab.push(layer);
                });
    
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
    
                level['layerInstances'].forEach(layer => {
                    tabOrdre.forEach(element => {
                        element.gridTiles.forEach(tile => {
                            let img = new Image();
                            img.src = element.__tilesetRelPath;
                            img.onload = () => {
                                let canvas = document.querySelector('#game-bg');
                                let ctx = canvas.getContext("2d");
                                ctx.drawImage(img,
                                    tile.src[0],
                                    tile.src[1],
                                    element.__gridSize,
                                    element.__gridSize,
                                    tile.px[0],
                                    tile.px[1],
                                    element.__gridSize,
                                    element.__gridSize
                                );
                            }
                        });
                    });
                })
            }
        });
    }


}