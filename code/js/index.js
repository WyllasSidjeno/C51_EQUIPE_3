import { Personnage } from "./entite/sprite/Personnage.js";

let spriteList = [];
let perso 
 
window.addEventListener("load", () => {
    console.log("test")
    spriteList.push(new Personnage())

    tick()
})

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) { //pas necessaire car mon squelette ne sort pas de lecran -> mais si je ne le met pas ca ne fonctionne pas...
	 	spriteList[i].tick();
	}
    window.requestAnimationFrame(tick)
}

