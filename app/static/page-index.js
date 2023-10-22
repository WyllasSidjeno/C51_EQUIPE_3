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
        page_connexion.style.display = 'block';
        page_inscription.style.display = 'none';
        //new Audio(sound.click).play();
    });

    btn_inscription.addEventListener('click', () => {
        page_inscription.style.display = 'block';
        page_connexion.style.display = 'none';
        //new Audio(sound.click).play();
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
    });

    // SON 
    // let element = document.querySelectorAll(".text");
    // let clickAudio = new Audio(sound.click);
    // let menuAudio = new Audio(sound.menu);

    // element.forEach((e) => {
    //     e.addEventListener('click', () => {
    //         clickAudio.play();
    //     });
    // });

});