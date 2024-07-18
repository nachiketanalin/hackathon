import mysql.connector
config = {
    'user': 'dataworld_user',
    'password': 'dataworld@123',
    'host': '35.242.167.1',
    'database': 'dataworld_dataset',
    'raise_on_warnings': True
}

def get_links():
    query = "SELECT * FROM VIDEOS"
    return execute_query(query)
    
def get_articles():
    query = "SELECT * FROM ARTICLES"
    return execute_query(query)
      
    
def execute_query(query):
    try:
      cnx = mysql.connector.connect(**config)
      cursor = cnx.cursor()
      query = query
      cursor.execute(query)
      row_list=[row[0] for row in cursor.fetchall()]

      cursor.close()
      cnx.close()
      return {"response":row_list},200
    except Exception as e:
       return {"error":str(e)},400