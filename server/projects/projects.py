from server.projects.templates import GET_PROJECT_BY_STATUS
from server.generals import Database


def get_projects(user_id, status):
    return Database().SqlQuery(GET_PROJECT_BY_STATUS, user_id, status)
