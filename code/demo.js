import { Personnage } from "./Personnage.js";

let perso 
 
window.addEventListener("load", () => {
    console.log("test")
    perso = new Personnage()
    tick()
})

const tick = () => {
    perso.tick()
    window.requestAnimationFrame(tick)
}

