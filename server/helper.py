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
    try:
        query = "SELECT * FROM ARTICLES"
        ans_list= execute_query(query)
        response=[{
            "title":row[0],
            "url":row[1]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400
    
def get_all_posts():
    try:
        query = "SELECT * FROM POSTS"
        ans_list= execute_query(query)
        response=[{
            "id":row[0],
            "content":row[1],
            "upvotes":row[2],
            "downvotes":row[3]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400

def add_post(text):
    try:
        query=f"INSERT INTO POSTS (CONTENT,UPVOTE,DOWNVOTE) VALUES({text},0,0)"
        ans=execute_query(query)
        return {"response":"Post added successfully"},200
    except Exception as e:
        return {"error":str(e)},400

    
def get_articles():
    try:
        query = "SELECT * FROM ARTICLES"
        ans_list= execute_query(query)
        response=[{
            "title":row[0],
            "id":row[1]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400
      
    
def execute_query(query):
      cnx = mysql.connector.connect(**config)
      cursor = cnx.cursor()
      query = query
      cursor.execute(query)
      row_list=[row for row in cursor.fetchall()]
      cursor.close()
      cnx.close()
      return row_list