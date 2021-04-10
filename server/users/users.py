from server.users.templates import AUTHORIZE_BY_LOGIN, ADD_STUDENT_TO_PROJECT
from server.generals import Database
import uuid


def get_login(login, password):
    auth = Database().SqlQueryRecord(AUTHORIZE_BY_LOGIN, login, password)
    if auth:
        token = uuid.uuid4()
        auth['token'] = token
    return auth

def add_users_to_project(user_id, project_id,  role):
     return Database().SqlQuery(ADD_STUDENT_TO_PROJECT, user_id, project_id,  role)