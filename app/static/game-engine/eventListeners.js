window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            if (joueur.velocity.y == 0) joueur.velocity.y = -ENTITY_MOVE_Y * 10
            
            break;
        case 'a':
            keys.left = true
            break;
        case 'd':
            keys.right = true
            break;
    
        default:
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.up = false
            break;
        case 'a':
            keys.left = false
            break;
        case 'd':
            keys.right = false
            break;
    
        default:
            break;
    }
})