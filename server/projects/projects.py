from server.projects.templates import *
from server.generals import Database


def get_projects(user_id, status):
    return Database().SqlQuery(GET_PROJECT_BY_STATUS, user_id, status)

def get_project_info(id):
    return Database().SqlQuery(GET_ALL_INFO_ABOUT_PROJECT, id)

def create_project(name, documents, author, mentor):
     return Database().SqlQuery(CREATE_PROJECT, name, documents, author, mentor, author)

def change_project_status(status, user_id, project_id):
    role = Database().SqlQueryRecord(GET_ROLE, user_id)[0]
    if role == "Student":
        if status == 1:
            for i in Database().SqlQuery(GET_OWNER_BY_PROJECT, project_id):
                Database().SqlQuery(CHANGE_PROJECT_STATUS, 1, i["id_user"], project_id)
        elif status == 2:        
            Database().SqlQuery(ADD_MENTOR, project_id, project_id)    
    elif role == "Mentor":
        if status == 1:
            for i in Database().SqlQuery(GET_STUDENTS_BY_PROJECT, project_id):
                Database().SqlQuery(CHANGE_PROJECT_STATUS, 3, i["id_user"], project_id)   
            for i in Database().SqlQuery(GET_OWNER_BY_PROJECT, project_id):
                Database().SqlQuery(CHANGE_PROJECT_STATUS, 3, i["id_user"], project_id)   
            for i in Database().SqlQuery(GET_SUBAUTHOR_BY_PROJECT, project_id):    
                Database().SqlQuery(CHANGE_PROJECT_STATUS, 3, i["id_user"], project_id)   

    return Database().SqlQuery(CHANGE_PROJECT_STATUS, status, user_id, project_id)


def send_to_vus(id_user, id_project, id_vus):
    Database().SqlQuery(CHANGE_PROJECT_STATUS, 2, id_user, id_project)
    Database().SqlQuery(ADD_OWNER_TO_PROJECT, id_vus, id_project, id_vus, id_project)    

def get_mentors():
    return Database().SqlQuery(GET_MENTORS)

def add_student_to_project(id_student, id_project, role):
    Database().SqlQuery(ADD_STUDENT_TO_PROJECT(id_student, id_project, role))

def delete_student_to_project(id_student, id_project):
    Database().SqlQuery(DELETE_PROJECT_TO_STUDENT(id_student, id_project))

def accept_project(id_student, id_project):
    for i in Database().SqlQuery(GET_OWNER_BY_PROJECT, id_project):
        Database().SqlQuery(CHANGE_PROJECT_STATUS, 1, int(i["id_user"]), id_project)
    Database().SqlQuery(CHANGE_PROJECT_STATUS, 1, id_student, id_project)

def send_project(id_student, id_project):
    Database().SqlQuery(ADD_MENTOR, id_project, id_project)   
    Database().SqlQuery(CHANGE_PROJECT_STATUS, 2, id_student, id_project)

def get_all_vus():
    return  Database().SqlQuery(GET_VUS)

def delete_project(id_project):
    Database().SqlQuery(CHANGE_PROJECT_STATUS, id_project, id_project)

def add_competence(student_id, compet, project_id):
    db = Database()
    id_compet = db.SqlQueryScalar(GET_ID_COMPET_BY_NAME, compet)
    if not id_compet:
        id_compet = db.SqlQueryScalar(INSERT_COMPET, compet)
    return db.SqlQueryRecord(ADD_COMPET_IN_USER, student_id, id_compet, project_id)

def delete_competence_from_user(user_id, compet_id, project_id):
    Database().SqlQuery(DELETE_COMPET_USER, user_id, compet_id, project_id)

def get_all_projects(user_id):
    return Database().SqlQuery(GET_PROJECT_BY_USER, user_id)