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

    
    collisionBlock = lvlGen.parseLevel2D(0)
    collisionBlock.forEach(e => {
        e.draw(ctx)
    })

    joueur = new Entite(100, 60, {collisionBlock})
    joueur.draw(ctx)

    animate()

    
})

const animate = () => {
    window.requestAnimationFrame(animate)

    joueur.velocity.x = 0
    if (keys.left) joueur.velocity.x = -ENTITY_MOVE_X
    if (keys.right) joueur.velocity.x = ENTITY_MOVE_X
    if (keys.up) {
        if (joueur.velocity.y === 0) joueur.velocity.y = -25
        else keys.up = false
    }


    joueur.move()
    joueur.draw()
    
} 
