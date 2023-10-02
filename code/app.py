from sys import argv
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index/')
def index():
    return render_template('index.html')

@app.route('/jeu/')
def jeu():
    return render_template('jeu.html')

@app.route('/commentaires/')
def commentaires():
    return render_template('commentaires.html') # TODO: Recuperer les commentaires de la base de donnees
 
@app.route('/apropos/')
def apropos():
    return render_template('apropos.html')

@app.route('/contact/')
def contact():
    return render_template('contact.html')
 
def main():
    mode_debug = int(argv[1])
    app.run(debug=mode_debug)     
     
if __name__ == '__main__':
    quit(main())