from sys import argv
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/commentaires/')
def commentaires():
    return render_template('commentaires.html') # TODO: Recuperer les commentaires de la base de donnees
 