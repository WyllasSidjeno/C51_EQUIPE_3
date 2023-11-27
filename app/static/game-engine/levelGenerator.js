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

    draw_level(ctx, level) {
        let img = new Image()
        img.src = '/static/game-engine/assets/levels/Level_' +  level + '.png'
        ctx.drawImage(img, 0, 0, this.size.width, this.size.height)
    }


}