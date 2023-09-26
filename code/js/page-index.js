window.addEventListener('load', () => {
    let btn_connexion = document.querySelector('#connexion');
    let btn_inscription = document.querySelector('#inscription');

    let page_connexion = document.querySelector('.login-box');
    let confirmation = document.querySelector('.confirmation');
    let type_connexion = document.querySelector('#type-connexion');
    let type_connexion_btn = document.querySelector('#type-connexion-btn');

    btn_connexion.addEventListener('click', () => {
        page_connexion.style.display = 'block';
        confirmation.style.display = 'none';
        type_connexion.innerHTML = 'Connexion';
        type_connexion_btn.innerHTML = 'Connexion';
    });

    btn_inscription.addEventListener('click', () => {
        page_connexion.style.display = 'block';
        confirmation.style.display = 'block';
        type_connexion.innerHTML = 'Inscription';
        type_connexion_btn.innerHTML = 'Inscription';
    });
});