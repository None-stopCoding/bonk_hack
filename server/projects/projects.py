from server.projects.templates import GET_PROJECT_BY_STATUS, GET_ALL_INFO_ABOUT_PROJECT
from server.generals import Database


def get_projects(user_id, status):
    return Database().SqlQuery(GET_PROJECT_BY_STATUS, user_id, status)

def get_project_info(id):
    return Database().SqlQuery(GET_ALL_INFO_ABOUT_PROJECT, id)