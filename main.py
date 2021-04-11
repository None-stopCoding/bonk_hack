import time
from flask import Flask, send_from_directory, request, make_response
from server.users.users import *
import json
from server.projects.projects import *



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
    return make_response(json.dumps(get_projects(params['userId'], params['status'])))


@app.route('/api/project', methods=["POST"])
def project_info_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_project_info(params['id'])))


@app.route('/api/project/create', methods=["POST"])
def project_create_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(create_project(params['name'], params['documents'], params['userId'], params['mentor'])))


@app.route('/api/profile/get', methods=['POST'])
def get_profile_inf():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_profile_info(params['user_id'])))

@app.route('/api/profile/get/mentors', methods=['POST'])
def get_mentors_inf():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_mentors()))

@app.route('/api/students/all', methods=["POST"])
def get_students_all():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_all_students()))

@app.route('/api/project/pm/invite', methods=["POST"])
def project_invite_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(add_student_to_project(params['studentId'], params['projectId'], params['projectRole'])))

@app.route('/api/project/student/accept', methods=["POST"])
def project_accept_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(accept_project(params['userId'], params['projectId'])))


@app.route('/api/project/student/send', methods=["POST"])
def project_send_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(send_project(params['userId'], params['projectId'])))


@app.route('/api/project/student/drop', methods=["POST"])
def project_drop_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(delete_student_to_project(params['userId'], params['projectId'])))

@app.route('/api/project/pm/delete', methods=["POST"])
def project_delete_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(delete_project(params['projectId'])))

@app.route('/api/vus/all', methods=["POST"])
def vus_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_all_vus()))

@app.route('/api/project/pm/redirect', methods=["POST"])
def project_redirect_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(send_to_vus(params['userId'], params['projectId'], params['vusId'])))


@app.route('/api/students/get_by_org', methods=['POST'])
def get_students():
    params = request.get_json(forse=True)
    if params.get('projects'):
        return make_response(json.dumps(get_students_by_org_in_projects([params['id_org']])))
    else:
        return make_response(json.dumps(get_students_by_org(params['id_org'])))


@app.route('/api/pm/student/watch', methods=["POST"])
def st_watch_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(watch_student(params['userId'], params['orgId'])))

@app.route('/api/pm/student/want', methods=["POST"])
def st_want_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(want_student(params['userId'], params['orgId'])))

@app.route('/api/pm/student/drop', methods=["POST"])
def st_drop_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(drop_student(params['userId'], params['orgId'])))

@app.route('/api/pm/student/my', methods=["POST"])
def st_my_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_my_students_organizate(params['orgId'])))

@app.route('/api/pm/student/wanted', methods=["POST"])
def st_wanted_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_wanted_students_organizate(params['userId'])))

@app.route('/api/student/organizate/wanted', methods=["POST"])
def st_org_wanted_pls():
    params = request.get_json(force=True)
    return make_response(json.dumps(get_organizate_to_want(params['userId'])))

if __name__ == '__main__':
    app.run()
