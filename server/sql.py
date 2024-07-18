import mysql.connector
config = {
    'user': 'dataworld_user',
    'password': 'dataworld@123',
    'host': '35.242.167.1',
    'database': 'dataworld_dataset',
    'raise_on_warnings': True
}

def get_links():
    try:
        query = "SELECT * FROM VIDEOS"
        ans_list= execute_query(query)
        response=[{
            "title":row[0],
            "id":row[1]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400

    
def get_articles():
    query = "SELECT * FROM ARTICLES"
    return execute_query(query)
      
    
def execute_query(query):
      cnx = mysql.connector.connect(**config)
      cursor = cnx.cursor()
      query = query
      cursor.execute(query)
      row_list=[row for row in cursor.fetchall()]
      cursor.close()
      cnx.close()
      return row_list