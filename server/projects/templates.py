GET_ALL_PROJECTS = """
SELECT 
project.id, 
project.name "Название проекта", 
project.documents "Документы",
project.status "Статус проекта",
user_.name "Имя студента", 
user_.surname "Фамилия студента", 
user_.second_name "Отчество студента",
user_2.name "Имя автора", 
user_2.surname "Фамилия автора", 
user_2.second_name "Отчество автора"
FROM "Project" project
INNER JOIN "User-Project" user_project ON user_project.id_project = project.id
INNER JOIN "User" user_ ON user_.id = user_project.id_user
INNER JOIN "User" user_2 ON user_2.id = project.author
"""

GET_PROJECT_BY_USER = GET_ALL_PROJECTS + """
WHERE user_ = %s
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
select "bisiness" from "Organizate" where "id" = (select "id_organizate" from "User-Organizate" where "id_user" = %s)
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
insert into "User-Project" VALUES(%s, %s, %s)
"""

DELETE_PROJECT_TO_STUDENT = """
delete from "User-Project" WHERE "id_user" = %s and "id_project" = %s;
"""

CREATE_PROJECT = """
INSERT INTO "Project" (name, documents, author, mentor) VALUES (%s, %s, (select "id_organizate" from "User-Organizate" where "id_user" = %s and "status" = 'Участник'), %s);
insert into "User-Project" VALUES(%s, (select "id" from "Project" order by "id" DESC limit 1), 'Owner', 0);
"""

DELETE_PROJECT = """
DELETE FROM "Project" WHERE id = %s;
-- DELETE FROM "User-Project" WHERE id = %s;
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
project.name "Название проекта", 
project.documents "Документы",
user_.name "Имя студента", 
user_.surname "Фамилия студента", 
user_.second_name "Отчество студента",
user_2.name "Имя автора", 
user_2.surname "Фамилия автора", 
user_2.second_name "Отчество автора"
FROM "Project" project
INNER JOIN "User-Project" user_project ON user_project.id_project = project.id
INNER JOIN "User" user_ ON user_.id = user_project.id_user and user_project.role_in_project != 'Owner'
INNER JOIN "User" user_2 ON user_2.id = project.author

WHERE project.id = %s
and not (user_.name = user_2.name and user_.surname = user_2.surname and user_.second_name = user_2.second_name)
"""