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


GET_PROJECT_BY_AUTHOR = GET_ALL_PROJECTS + """
WHERE user_2.id = %s
"""

CREATE_PROJECT = """
INSERT INTO "Project" (name, status, documents, author) VALUES ('%s', 0, '%s', %s)
"""

DELETE_PROJECT = """
DELETE FROM "Project" WHERE id = %s
"""

CHANGE_PROJECT_STATUS = """
UPDATE "Project" SET status = %s WHERE id = %s
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