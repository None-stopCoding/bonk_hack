from server.users.templates import (AUTHORIZE_BY_LOGIN, ADD_STUDENT_TO_PROJECT, GET_INFO_FOR_PROFILE,
                                    GET_COMPETITIONS_BY_ID, GET_STUDENTS_ALL, GET_STUDENTS_BY_ORG)
from server.generals import Database
import uuid


def get_login(login, password):
    auth = Database().SqlQueryRecord(AUTHORIZE_BY_LOGIN, login, password)
    if auth:
        token = uuid.uuid4()
        auth['token'] = token
    return auth


def add_users_to_project(user_id, project_id, role):
    return Database().SqlQuery(ADD_STUDENT_TO_PROJECT, user_id, project_id, role)


def get_profile_info(user_id):
    info = Database().SqlQueryRecord(GET_INFO_FOR_PROFILE, user_id)
    info['competences'] = get_competitions_by_id(user_id)
    return info


def get_competitions_by_id(user_id):
    return Database().SqlQuery(GET_COMPETITIONS_BY_ID, user_id)


def get_all_students():
    return Database().SqlQuery(GET_STUDENTS_ALL)


def get_students_by_org(id_org):
    return Database().SqlQuery(GET_STUDENTS_BY_ORG, id_org)
