import hashlib
import os

from flask import Flask, render_template, request

from DAO.UserDAO import UserDAO

app = Flask(__name__)


@app.route('/')
@app.route('/index/', methods=('GET', 'POST'))
def index():
    if request.method == 'POST':
        type_connexion = request.form['type']
        username = request.form['username']
        password = request.form['password']
        print(type_connexion, username, password)
        if type_connexion == 'connexion':
            user = UserDAO().get_user_with_password(username)
            print(user)
            if user is None:
                print('utilisateur non reconnu')
            elif user['username'] == username:
                salt = user['salt']
                hashed_password = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
                if hashed_password == user['hash']:
                    print('connexion reussie')
                else:
                    print('mot de passe incorrect')

        elif type_connexion == 'inscription':
            confirm_password = request.form['confirm_password']
            print(type_connexion, username, password, confirm_password)
            if password != confirm_password:
                print('les mots de passe ne correspondent pas')
            else:
                print('inscription reussie')
                salt = os.urandom(16)
                hashed_password = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
                UserDAO().add_user(username, hashed_password, salt)
    return render_template('index.html')


@app.route('/jeu/')
def jeu():
    return render_template('jeu.html')


@app.route('/commentaires/')
def commentaires():
    return render_template('commentaires.html')  # TODO: Récupérer les commentaires de la base de donnees


@app.route('/apropos/')
def apropos():
    return render_template('apropos.html')


@app.route('/contact/')
def contact():
    return render_template('contact.html')


def main():
    mode_debug = True
    app.run(debug=mode_debug)


if __name__ == '__main__':
    quit(main())
