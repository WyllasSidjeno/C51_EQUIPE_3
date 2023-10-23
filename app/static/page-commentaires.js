window.addEventListener('load', () => {
    let btn_connexion = document.querySelector('#connexion');
    let btn_inscription = document.querySelector('#inscription');
    let username_comment = document.querySelector('.username-comment');
    let username = '';

    btn_connexion.style.display = 'none';
    btn_inscription.style.display = 'none';

    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
        username_comment.value = username;
    }
});