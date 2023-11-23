import { collisionBlock } from "./collisionBlock.js"

export class LevelGenerator {
    constructor(data) {
        this.data = data
        this.dataLevel = null
    }

    parseLevel2D(level) {
        this.dataLevel = this.data["levels"][level]["layerInstances"][0]
        let matrice = this.dataLevel["intGridCsv"]

        let mapWidth = this.dataLevel["__cWid"]
        let mapHeight = this.dataLevel["__cHei"]

        let canvas = document.querySelector('#canvas')

        canvas.width = mapWidth * 16
        canvas.height = mapHeight * 16

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


}