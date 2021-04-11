GET_ALL_PROJECTS = """
SELECT 
project.id, 
project.name "project_name", 
project.documents "project_doc",
project.status "project_status",
user_.name, 
user_.surname, 
user_.second_name,
user_2.name "author_name", 
user_2.surname "author_surname", 
user_2.second_name "author_second_name"
FROM "Project" project
INNER JOIN "User-Project" user_project ON user_project.id_project = project.id
INNER JOIN "User" user_ ON user_.id = user_project.id_user
INNER JOIN "User" user_2 ON user_2.id = project.author
"""

GET_PROJECT_BY_USER = GET_ALL_PROJECTS + """
WHERE user_.id = %s
"""

GET_STUDENTS_BY_PROJECT = """
select * from "User-Project" where "id_project" = %s and "role_in_project" != 'Owner' and "role_in_project" != 'Mentor'
"""

# GET_STUDENTS_ALL = """
# select * from "User-Project" where "id_project" = %s and "role_in_project" != 'Owner' and "role_in_project" != 'Mentor'
# """

GET_OWNER_BY_PROJECT = """
select * from "User-Project" where "id_project" = %s and "role_in_project" = 'Owner'
"""

GET_MENTOR_BY_PROJECT = """
select * from "User-Project" where "id_project" = %s and "role_in_project" = 'Mentor'
"""

GET_SUBAUTHOR_BY_PROJECT = """ 
select * from "Project" where "id" = %s and "subauthor" is not null
"""

ADD_OWNER_TO_PROJECT = """
update "Project" set "subauthor" = %s where "id" = %s;
insert into "User-Project" VALUES(%s, %s, 'Owner', 0)
"""

IS_ORGANISATE = """
select "bisiness" from "Organizate" where "id" = (select "org" from "User" where "id" = %s)
"""


GET_VUS = """
select * from "Organizate" where "bisiness" = false
"""

GET_PROJECT_BY_AUTHOR = GET_ALL_PROJECTS + """
WHERE user_2.id = %s
"""

GET_MENTORS = """
select * from "User" where "role" = 3
"""

GET_STUDENT = """
select * from "User" where "role" = 1
"""

ADD_MENTOR = """
insert into "User-Project" VALUES((select "mentor" from "Project" where "id" = %s), %s, 'Mentor', 0)
"""

GET_ROLE = """
select (select "name" from "Role" where "id" = U."role") from "User" AS U where "id" = %s;
"""


ADD_STUDENT_TO_PROJECT = """
insert into "User-Project" VALUES(%s, %s, %s, 0)
"""

DELETE_PROJECT_TO_STUDENT = """
delete from "User-Project" WHERE "id_user" = %s and "id_project" = %s;
"""

CREATE_PROJECT = """
INSERT INTO "Project" (name, documents, author, mentor) VALUES (%s, %s, (select "org" from "User" where "id" = %s), %s);
insert into "User-Project" VALUES(%s, (select "id" from "Project" order by "id" DESC limit 1), 'Owner', 0);
"""

DELETE_PROJECT = """
DELETE FROM "User-Project" WHERE "id_project" = %s;
DELETE FROM "Project" WHERE "id" = %s;
"""

CHANGE_PROJECT_STATUS = """
update "User-Project" set "status" = %s where "id_user" = %s and "id_project" = %s
"""

GET_PROJECT_BY_STATUS = """
select (select O."name" from "Organizate" AS O where O."id" = P."author") as author, P."name", 
(select UPP."status" from "User-Project" AS UPP where UPP."id_project" = P."id" and UPP."role_in_project" = 'Owner'),
P."id"
from "User-Project" AS UP
inner join "Project" AS P
on P."id" = UP."id_project"
where UP."id_user" = %s and UP."status" = %s
"""

GET_ALL_INFO_ABOUT_PROJECT = """
SELECT 
project.id, 
project.name "project_name", 
project.documents "project_doc",
(select status from "User-Project" up where up.id_project = project.id and role_in_project = 'Owner' limit 1) "project_status",
user_2.name "author_name", 
user_2.surname "author_surname", 
user_2.second_name "author_second_name",
o.name business_name
FROM "Project" project
INNER JOIN "User-Project" user_project ON user_project.id_project = project.id
INNER JOIN "User" user_2 ON user_2.id = project.author
join "Organizate" o on o.id = project.author

WHERE project.id = %s
"""

GET_ALL_STUDENTS_BY_PROJECT = """
select distinct on (u.id)
	u.id,
	u.name,
	u.surname,
	u.second_name,
	p.name project_name,
	up.role_in_project
from "Project" p
join "User-Project" up on up.id_project = p.id
join "User" u on u.id = up.id_user
where p.id = %s
and up.role_in_project != 'Owner'
"""

GET_ID_COMPET_BY_NAME = """
SELECT id from "Competence" where name = %s
"""

INSERT_COMPET = """
insert into "Competence" (name) values (%s) returning id
"""

ADD_COMPET_IN_USER = """
insert into "User-Competence" (id_user, id_competence, id_project) values (%s, %s, %s) returning id_competence
"""

DELETE_COMPET_USER = """
delete from "User-Competence" where id_user = %s and id_competence = %s and id_project = %s
"""