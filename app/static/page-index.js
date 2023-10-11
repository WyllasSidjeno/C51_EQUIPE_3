window.addEventListener('load', () => {
    // let sound = new Sound();
    // let clickAudio = new Audio(sound.click);
    let btn_connexion = document.querySelector('#connexion');
    let btn_inscription = document.querySelector('#inscription');

    let page_connexion = document.querySelector('.login-box');
    let confirmation = document.querySelector('.confirmation');
    let type_connexion = document.querySelector('#type-connexion');
    let type_connexion_btn = document.querySelector('#type-connexion-btn');

    btn_connexion.style.display = 'block';
    btn_inscription.style.display = 'block';

    btn_connexion.addEventListener('click', () => {
        page_connexion.style.display = 'block';
        confirmation.style.display = 'none';
        type_connexion.innerHTML = 'Connexion';
        type_connexion_btn.innerHTML = 'Connexion';
        new Audio(new Sound().click).play();
    });

    btn_inscription.addEventListener('click', () => {
        page_connexion.style.display = 'block';
        confirmation.style.display = 'block';
        type_connexion.innerHTML = 'Inscription';
        type_connexion_btn.innerHTML = 'Inscription';
        new Audio(new Sound().click).play();
    });

    type_connexion_btn.addEventListener('click', () => {
        document.querySelector('form').submit();
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