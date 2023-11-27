let keys = {
	left: false,
	right: false,
	up: false, 
    attack: false
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.up = true
            break;
        case 'a':
            keys.left = true
            break;
        case 'd':
            keys.right = true
            break;
		case 's':
			keys.down = true
            break;
        case ' ':
            keys.attack = true
            break;
        default:
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.left = false
            break;
        case 'd':
            keys.right = false
            break;
		case 'w':
			keys.up = false
			break;
		case 's':
			keys.down = false
			break;
        case ' ':
            keys.attack = true
            break;	
        default:
            break;
    }
})

export default keys