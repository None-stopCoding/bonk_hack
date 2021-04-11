# СТУДЕНТ

# получить всех студентов
# params: NO PARAMS
GET_STUDENTS_ALL = """
SELECT U.id, U."name" name_user, U."surname", U."second_name", O."name" name_org FROM 
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
WHERE O.id = (SELECT UO.id_organizate FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) 
and (SELECT UO.status FROM "User-Organizate" AS UO WHERE UO.id_user = U.id and UO.id_organizate = O.id) = 'Участник'
WHERE "role" = 1 and U."id" = %s
"""

# залить студента на проект
# params: [id студента, id проекта, роль]
ADD_STUDENT_TO_PROJECT = """
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

GET_INFO_FOR_PROFILE = """
select 
	u.id, 
	u.surname, 
	u.name, 
	u.second_name, 
	u.role
from "User" u
where u.id = %s
"""

GET_COMPETITIONS_BY_ID = """
select c.name, c.comment from "Competence" c join "User-Competence" uc on uc.id_competence = c.id and uc.id_user = %s
"""

GET_STUDENTS_BY_ORG = """
select 
    u.id,
	u.surname,
	u.name,
	u.second_name,
	o.name org_name
from "User" u
join "User-Organizate" uo on uo.id_user = u.id
join "Organizate" o on uo.id_organizate = o.id
where o.id = %s
"""