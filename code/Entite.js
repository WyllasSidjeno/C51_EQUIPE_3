import {move} from "./deplacement.js"

export class Entite {
    constructor(){
        this.life = 100
        this.pdd = 0
        this.pdv = 0
        this.pda = 10
        this.pos = [100, 100]

        this.perso = document.createElement("div")
        this.perso.style.height = "100px"
        this.perso.style.width = "100px"
        this.perso.style.backgroundColor = "red"
        this.perso.style.position = "relative"
        this.perso.style.top = this.pos[0] + "px"
        this.perso.style.left = this.pos[1] + "px"
        document.querySelector("#game").append(this.perso)

        this.x = this.perso.offsetLeft
        this.y = this.perso.offsetTop
        console.log(this.x, this.y)
    }

    tick(){
        if (move == 65) {
            this.x -= 2
            console.log(this.x)
        }
        if (move == 68) {
            this.x += 2
            console.log(this.x)
        }
        if (move == 87) {
            this.y += 2
            console.log(this.y)
        }
        if (move == 32) {
            console.log("attack")
        }
        if (move == 16) {
            console.log("defense")
        }
        
        this.perso.style.top = this.y
        this.perso.style.left = this.x


    }
}