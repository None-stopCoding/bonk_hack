import time
from flask import Flask, send_from_directory


app = Flask(__name__, static_url_path='', static_folder='client/build')


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/')
def hello_world():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
 