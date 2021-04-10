import psycopg2 as pg


class Database:
    def __init__(self, clientid=None):
        self.clientid = clientid
        self.conn = pg.connect(
            user='tatfezxgvgaefs',
            password='18355cf6b767ef1f55772b699bfd2f5417f521efc42ea9ce36e68ecdddd4c74d',
            host='ec2-54-247-158-179.eu-west-1.compute.amazonaws.com',
            port=5432,
            database='d2je435j8f2lf8'
        )

    def SqlQuery(self, request, *params, my_conn=None):
        """
        Выполняет sql запрос
        :param request: Запрос. Для корректной вставки в запрос параметров нужно в запросе вставлять %s
        Пример: "select * from "table" where "type" = %s"
        :param params: Параметры, которые нужно вставить запрос
        :param my_conn: Потом расскажу
        :return:
        """
        if my_conn is None:
            cur = self.conn.cursor()
        else:
            cur = my_conn.cursor()
        cur.execute(request, params)
        if my_conn is None:
            self.conn.commit()
        data = cur.fetchall() if cur.description else []
        if data:
            cols = list(map(lambda x: x[0], cur.description))
            result = []
            for row in data:
                row_with_fields = {cols[i]: row[i] for i in range(len(cols))}
                result.append(row_with_fields)
            return result
        else:
            return data

    def SqlQueryScalar(self, request, *params, my_conn=None):
        """
        Выполняет sql запрос
        :param request: Запрос. Для корректной вставки в запрос параметров нужно в запросе вставлять %s
        Пример: "select * from "table" where "type" = %s"
        :param params: Параметры, которые нужно вставить запрос
        :param my_conn: Потом расскажу
        :return:
        """
        data = self.SqlQuery(request, params, my_conn=my_conn)
        return list(data[0].values())[0] if data else None

    def SqlQueryRecord(self, request, *params, my_conn=None):
        res = self.SqlQuery(request, params, my_conn=my_conn)
        return res[0] if res else res
