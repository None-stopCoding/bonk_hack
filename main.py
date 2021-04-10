import time
from flask import Flask, send_from_directory, request, make_response
from server.users.users import get_login
from server.projects.projects import get_projects



app = Flask(__name__, static_url_path='', static_folder='client/build')


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/')
def hello_world():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/auth/login', methods=["POST"])
def login_pls():
    params = request.get_json(force=True)
    return make_response(get_login(params['login'], params['password']))


@app.route('/api/projects', methods=["POST"])
def project_pls():
    params = request.get_json(force=True)
    return make_response(get_projects(params['userId'], params['status']))

if __name__ == '__main__':
    app.run()
