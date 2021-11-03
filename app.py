from flask import Flask, request
from server.user_cli import process_file
import os
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/file-upload', methods=['POST'])
def file_upload():
    file = request.files['file']
    filename = file.filename
    filetype = filename.split(".")[1]
    if filename == "":
        print("Invalid request data")
        return '400'

    file.save(os.path.join("./data/", filename))
    process_file(filename, filetype)
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
        # response = {"data": json_data}
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return json_data
    except FileNotFoundError:
        print("File Not found : {}".format(filename))
        return '404'


@app.route("/")
def index():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
