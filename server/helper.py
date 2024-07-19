import mysql.connector
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

config = {
    'user': 'dataworld_user',
    'password': 'dataworld@123',
    'host': '35.242.167.1',
    'database': 'dataworld_dataset',
    'raise_on_warnings': True
}

model_name = "unitary/toxic-bert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
toxicity_pipeline = pipeline("text-classification", model=model, tokenizer=tokenizer)

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
        is_socially_acceptable(text)
        query=f'''INSERT INTO POSTS (CONTENT,UPVOTE,DOWNVOTE) VALUES("{text}",0,0)'''
        ans=execute_query(query)
        return {"response":"Post added successfully"},200
    except Exception as e:
        return {"error":str(e)},400

def get_all_comments(post_id):
    try:
        query = f"SELECT * FROM COMMENTS where POST_ID={post_id}"
        ans_list= execute_query(query)
        response=[{
            "comment_id":row[0],
            "post_id":row[1],
            "content":row[2],
            "upvotes":row[3],
            "downvotes":row[4]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400

def add_comment(text,post_id):
    try:
        is_socially_acceptable(text)
        query=f'''INSERT INTO COMMENTS (POST_ID,CONTENT,UPVOTE,DOWNVOTE) VALUES({post_id},"{text}",0,0)'''
        ans=execute_query(query)
        return {"response":"Comment added successfully"},200
    except Exception as e:
        return {"error":str(e)},400
      
def get_all_replies(comment_id):
    try:
        query = f"SELECT * FROM REPLIES where COMMENT_ID={comment_id}"
        ans_list= execute_query(query)
        response=[{
            "reply_id":row[0],
            "comment_id":row[1],
            "content":row[2],
            "upvotes":row[3],
            "downvotes":row[4]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
         return {"error":str(e)},400

def add_reply(text,comment_id):
    try:
        is_socially_acceptable(text)
        query=f'''INSERT INTO REPLIES (COMMENT_ID,CONTENT,UPVOTE,DOWNVOTE) VALUES({comment_id},"{text}",0,0)'''
        ans=execute_query(query)
        return {"response":"Reply added successfully"},200
    except Exception as e:
        return {"error":str(e)},400
    
def add_action(action,item,id):
    try:
        item=item.upper()
        action=action.upper()
        id_col=""
        if item=="POSTS":
            id_col="ID"
        elif item=="COMMENTS":
            id_col="COMMENT_ID"
        elif item=="REPLIES":
            id_col="REPLY_ID"
            
        query=f'''UPDATE {item} SET {action}={action}+1 where {id_col}={id}'''
        ans=execute_query(query)
        
        return {"response":"Action added successfully"},200
    except Exception as e:
        return {"error":str(e)},400

def add_user(username,pwd1,pwd2):
    if pwd1!=pwd2:
        return {"error":"Passwords are not matching"},400
    try:
        query=f'''select count(*) from USERS where NAME="{username}"'''
        ans=execute_query(query)
        count=ans[0][0]
        if count>0:
            return{"error":"User already exists"},400
        
        query=f'''INSERT INTO USERS( NAME, PWD) values("{username}","{pwd1}")'''
        ans=execute_query(query)
        return {"response":"User created successfully"},200
    
    except Exception as e:
        return {"error":str(e)},400
    
def check_user(username,pwd):
    try:
        query=f'''select count(*) from USER where NAME="{username}" and PWD="{pwd}"'''
        ans=execute_query(query)
        count=ans[0][0]
        if count>0:
            return {"response":"Login successful"},200
        return {"error":"No such user exists"},400
    except Exception as e:
        return {"error":str(e)},400

def get_alerts(id):
    try:
        query=f'''SELECT * FROM ALERTS WHERE USER_ID="{id}"'''
        ans_list=execute_query(query)
        response=[{
            "id":row[0],
            "user_id":row[1],
            "task":row[2],
            "type":row[3],
            "task_time":row[4]
        } for row in ans_list]
        return {"response":response},200
    except Exception as e:
        return {"error":str(e)},400
    

def add_alert(user_id,task,task_time,type):
    try:
        query=f'''SELECT COUNT (*) FROM ALERTS WHERE USER_ID="{user_id}" AND TASK="{task}" AND TYPE="{type}" AND TASK_TIME="{task_time}"'''
        ans=execute_query(query)
        count=ans[0][0]
        if count>0:
            return {"error":"Alert already exists"},400
        query=f'''INSERT INTO ALERTS (USER_ID, TASK, TYPE, TASK_TIME) VALUES ("{user_id}","{task}","{type}","{task_time}")'''
        ans=execute_query(query)
        return {"response":"Alert added successfully"},200
    except Exception as e:
        return {"error":str(e)},400
    
def delete_alert(alert_id):
    try:
        query=f''' DELETE FROM ALERTS WHERE ID="{alert_id}"'''
        ans=execute_query(query)
        return{"response":"Alert deleted succesfully"},200
    except Exception as e:
        return {"error":str(e)},400
    

def modify_alert(alert_id,task,type,task_time):
    try:
        query=f''' UPDATE ALERTS SET TASK="{task}", TYPE="{type}", TASK_TIME="{task_time}" WHERE ID="{alert_id}"'''
        ans=execute_query(query)
        return{"response":"Alert deleted succesfully"},200
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

def is_socially_acceptable(text):
    result = toxicity_pipeline(text)
    print(result)
    for label in result:
        if label['label'] in ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"] and label['score'] > 0.5:
            raise Exception(" Text is against community guidelines")
    return True