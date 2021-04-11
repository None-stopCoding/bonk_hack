# СТУДЕНТ

# получить всех студентов
# params: NO PARAMS
GET_STUDENTS_ALL = """
select U."name", "surname", "second_name", O."name" from "User" AS U inner join "Organizate" AS O on "org" = O."id" where role = 1
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

GET_MY_STUDENTS_ORGANIZATE = """
select (select "name" from "User" where "id" = "id_user"), (select "surname" from "User" where "id" = "id_user") from "StudentStatus" where "id_organizate" = %s and "status" = 'Наблюдаемый'
union 
select "name", "surname" from "User" where "org" = %s and role = 1
"""

GET_WANTED_STUDENTS_ORGANIZATE = """
select (select "name" from "User" where "id" = "id_user"), (select "surname" from "User" where "id" = "id_user") from "StudentStatus" where "id_organizate" = %s and "status" = 'Ожидаемый';
"""


WATCH_STUDENT = """
insert into "StudentStatus" VALUES(%s, %s, 'Наблюдаемый');
"""

DROP_STUDENT = """
delete from "StudentStatus" where "id_organizate" = %s and "id_user" = %s;
"""

WANT_STUDENT = """
insert into "StudentStatus" VALUES(%s, %s, 'Ожидаемый');
"""

GET_ORGANIZATE_TO_WANT = """

"""