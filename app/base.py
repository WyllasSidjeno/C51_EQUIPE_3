import hashlib
import os

from flask import Flask, render_template, request

from DAO.UserDAO import UserDAO

app = Flask(__name__)


@app.route('/')
@app.route('/index/', methods=('GET', 'POST'))
def index():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

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
    mode_debug = int(1)
    app.run(debug=mode_debug)


if __name__ == '__main__':
    quit(main())
