import map from '/static/map_1_matrix.json' assert { type: 'json' }
import { LevelGenerator } from '/static/game-engine/levelGenerator.js';
import { Entite } from '/static/game-engine/entite.js';
import keys from './game-engine/keyEvent.js';

const BLOCK_SIZE = 101
const TEMPSINTERVALLE = 20;
const ENTITY_MOVE_X = 1;
const ENTITY_MOVE_Y = 1;
const FLECHEGAUCHE = 37;
const FLECHEDROITE = 39;
const FLECHEBAS = 40;
const FLECHEHAUT = 38;

let zoneDeJeu
let joueur
let intervalle

let collisionBlock = []
let collisionDoor = []
let collisionLadder = []


window.addEventListener('load', () => {
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')

    let lvlGen = new LevelGenerator(map)
    console.log(map)

    
    let collisionBlock = lvlGen.parseLevel2D(5)

    collisionBlock.forEach(e => {
        if (e.type == "block") ctx.fillStyle = "black"
        else if (e.type == "ladder") ctx.fillStyle = "blue"
        else if (e.type == "door") ctx.fillStyle = "red"

        e.draw(ctx)
    })

    ctx.fillStyle = "green"
    joueur = new Entite(100, 60, {collisionBlock , collisionDoor, collisionLadder})
    joueur.draw(ctx)

    animate()

    
})

const animate = () => {
    window.requestAnimationFrame(animate)
    console.log(joueur.ladder)

    joueur.velocity.x = 0
    if (keys.left) joueur.velocity.x = -ENTITY_MOVE_X
    if (keys.right) joueur.velocity.x = ENTITY_MOVE_X
    if (keys.up) {
        if (joueur.ladder) joueur.position.y -= ENTITY_MOVE_Y
        else if (joueur.velocity.y === 0) joueur.velocity.y = -10
        else keys.up = false
    }
    if (keys.down && joueur.ladder) {
        joueur.position.y += ENTITY_MOVE_Y
    }
    


    joueur.move()
    joueur.draw()
    
} 
