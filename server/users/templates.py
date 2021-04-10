# СТУДЕНТ

# получить всех студентов
# params: NO PARAMS
GET_STUDENTS_ALL = """
SELECT U."name", U."surname", U."second_name", O."name" FROM 
"User" AS U INNER JOIN "Organizate" AS O
ON U.id = (SELECT UO.id_user FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) 
and O.id = (SELECT UO.id_organizate FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) 
and (SELECT UO.status FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) = 'Участник'
WHERE "role" = 1 
"""

# получить студента по id
# params: [id студента]
GET_STUDENT_BY_ID = """
SELECT U."name", U."surname", U."second_name", O."name" FROM 
"User" AS U INNER JOIN "Organizate" AS O
ON U.id = (SELECT UO.id_user FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) 
and O.id = (SELECT UO.id_organizate FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) 
and (SELECT UO.status FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) = 'Участник'
WHERE "role" = 1 and U."id" = %s
"""

# залить студента на проект
# params: [id студента, id проекта, роль]
SET_PROJECT_TO_STUDENT = """
insert into "User-Project" VALUES(%s, %s, %s)
"""

# удалить студента с проекта
# params: [id студента, id проекта]
DELETE_PROJECT_TO_STUDENT = """
delete from "User-Project" WHERE "id_user" = %s and "id_project" = %s;
"""

# добавить студента в избраное
# params: [id организации, id студента]
WATCH_STUDENT = """
insert into "User-Organizate" VALUES(%s, %s, 'Наблюдаемый');
"""

# удалить студента из избранного
# params: [id организации, id студента]
UNWATCH_STUDENT = """
delete from "User-Organizate" where "id_organizate" = %s and "id_user" = %s;
"""

# авторизация
# params: [login студента, password студента]
AUTHORIZE_BY_LOGIN = """
SELECT U."id", R."name" AS role FROM 
"User" AS U inner join "Role" AS R
ON U."role" = R."id"
where "login" = %s and "password" = %s
"""


