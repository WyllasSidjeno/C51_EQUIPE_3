import hashlib
import os

from flask import Flask, render_template, request, redirect, flash

from DAO.UserDAO import UserDAO

app = Flask(__name__)
app.secret_key = 'key'
@app.route('/')
@app.route('/index/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        type_connexion = request.form['type']
        username = request.form['username']
        password = request.form['password']
        if type_connexion == 'connexion':
            user = UserDAO().get_user_with_password(username)
            if user is None:
                flash('Utilisateur non reconnu', 'error')
            elif user['username'] == username:
                salt = user['salt']
                hashed_password = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
                if hashed_password == user['hash']:
                    flash('Connexion réussie', 'success')
                    return redirect('/')
                else:
                    flash('Mot de passe incorrect', 'error')

        elif type_connexion == 'inscription':
            confirm_password = request.form['confirm_password']
            if password != confirm_password:
                flash('Les mots de passe ne correspondent pas', 'error')
            else:
                salt = os.urandom(16)
                hashed_password = hashlib.sha256(salt + password.encode('utf-8')).hexdigest()
                UserDAO().add_user(username, hashed_password, salt)
                flash('Inscription réussie', 'success')
                return redirect('/')

    return render_template('index.html')

@app.route('/jeu/', methods=['GET', 'POST'])
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
