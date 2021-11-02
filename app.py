from flask import Flask, request
from server.user_cli import process_file
import os
import json
app = Flask(__name__)


@app.route('/file-upload', methods=['POST'])
def file_upload():
    file = request.files['file']
    filename = file.filename
    if filename == "":
        print("Invalid request data")
        return '400'

    file.save(os.path.join("./data/", filename))
    process_file(filename)
    return '200'


@app.route('/get-results')
def send_data():
    filename = request.args.get('filename')

    if filename is None:
        print("Invalid query params : {}".format(filename))
        return '400'

    filepath = "./data/results-{}.txt".format(filename)
    try:
        f = open(filepath, "r")
        data = f.read()
        json_data = json.loads(data)
        return json_data
    except FileNotFoundError:
        print("File Not found : {}".format(filename))
        return '404'


@app.route("/")
def index():
    return "Hello World!"

