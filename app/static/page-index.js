window.addEventListener('load', () => {
    let sound = new Sound();

    let btn_connexion = document.querySelector('#connexion');
    let btn_inscription = document.querySelector('#inscription');
    let page_inscription = document.querySelector('.inscription-box');
    let page_connexion = document.querySelector('.connexion-box');
    let btn_deconnexion = document.querySelector('#deconnexion');

    btn_connexion.style.display = 'block';
    btn_inscription.style.display = 'block';

    page_connexion.style.display = 'none';
    page_inscription.style.display = 'none';

    btn_connexion.addEventListener('click', () => {
        closeFrame(page_connexion, page_inscription);
        new Audio(sound.click).play();
    });

    btn_inscription.addEventListener('click', () => {
        closeFrame(page_inscription, page_connexion);

        new Audio(sound.click).play();
    });

    if (localStorage.getItem('state') === 'success') {
        btn_connexion.style.display = 'none';
        btn_inscription.style.display = 'none';
        btn_deconnexion.style.display = 'block';
    }

    btn_deconnexion.addEventListener('click', () => {
        localStorage.removeItem('state');
        localStorage.removeItem('username');

        btn_connexion.style.display = 'block';
        btn_inscription.style.display = 'block';
        btn_deconnexion.style.display = 'none';

        new Audio(sound.click).play();
    });

    const closeFrame = (mainFrame, frame) => {
        if (frame.style.display === 'block') {
            toggleFrame(frame);
        }
        toggleFrame(mainFrame);
    }

    const toggleFrame = (frame) => {
        if (frame.style.display === 'none') {
            frame.style.display = 'block';
        } else {
            frame.style.display = 'none';
        }
    }

    let menu_music = new Audio(sound.menu);
    menu_music.loop = true;
    menu_music.play();

});