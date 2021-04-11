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



# авторизация
# params: [login студента, password студента]
AUTHORIZE_BY_LOGIN = """
SELECT U."id", U."org", R."name" AS role FROM 
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
	u.role,
	(select count(*) from "User-Project" up where up.status = 3 and up.id_user = u.id) ready,
	(select count(*) from "User-Project" up where up.status = 1 and up.id_user = u.id) in_work,
	(select count(*) from "User-Competence" up where up.id_user = u.id) comp
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
where u.org = %s
"""

GET_STUDENTS_BY_ORG_IN_PROJECTS = """
select distinct on (u.id)
	u.id,
	u.name,
	u.surname,
	u.second_name,
	p.name project_name
from "Project" p
join "User-Project" up on up.id_project = p.id
join "User" u on u.id = up.id_user
where (p.author = %s or p.subauthor = %s)
and up.role_in_project != 'Owner' and up.role_in_project != 'Mentor'
"""

GET_MY_STUDENTS_ORGANIZATE = """
select
	u.id,
	u.name,
	u.surname,
	u.second_name
from "User" u
join "StudentStatus" ss on ss.id_organizate = %s and ss.status = 'Наблюдаемый'
union
select
	u.id,
	u.name,
	u.surname,
	u.second_name
from "User" u
where u.org = %s and u.role = 1
"""

GET_WANTED_STUDENTS_ORGANIZATE = """
select
	u.id,
	u.name,
	u.surname,
	u.second_name
from "User" u
join "StudentStatus" ss on ss.id_organizate = %s and ss.id_user = u.id
where ss.status = 'Ожидаемый'
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
select o.id, o.name from "Organizate" o
left join "StudentStatus" ss on ss.id_organizate = o.id and ss.id_user = %s
where ss.status is null and o.id != (select u.org from "User" u where u.id = %s)
"""


GET_OWN_COMPETENCE = """
select "name", "comment" from "Competence" inner join "User-Competence" on 
"id" = "id_competence" and "id_user" = %s
"""

GET_WANTED_COMPETENCE = """
select "name", "comment" from "Competence" inner join "User-Competence-Wanted" on 
"id" = "id_competence" and "id_user" = %s
"""