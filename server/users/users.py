from server.users.templates import AUTHORIZE_BY_LOGIN
from server.generals import Database
import uuid


def get_login(login, password):
    auth = Database().SqlQueryRecord(AUTHORIZE_BY_LOGIN, login, password)
    if auth:
        token = uuid.uuid4()
        auth['token'] = token
    return auth
