import { Personnage } from "./entite/sprite/Personnage.js";

let spriteList = [];
let perso 
 
window.addEventListener("load", () => {
    console.log("test")
    spriteList.push(new Personnage())

    tick()
})

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) { 
	 	spriteList[i].tick();
	}
    window.requestAnimationFrame(tick)
}

