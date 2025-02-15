from flask import Flask, request
from helper import *
app = Flask(__name__)

@app.route('/',methods=["GET"])
def route_home():
   return "Hello data-world",200

@app.route('/video',methods=["GET"])
def route_video():
   video_links=get_links()
   return video_links

@app.route('/text',methods=["GET"])
def route_text():
   url=get_articles()
   return url

@app.route('/posts',methods=["POST","GET"])
def route_posts():
   if request.method=='GET':
      posts=get_all_posts()
      return posts
   elif request.method=='POST':
      data=request.json
      text=data["text"]
      title=data["title"]
      response=add_post(text,title)
      return response

@app.route('/comments',methods=["POST","GET"])
def route_comments():
   if request.method=='GET':
      post_id=request.args.get("post_id")
      comments=get_all_comments(post_id)
      return comments
   elif request.method=='POST':
      data=request.json
      text=data["text"]
      post_id=data["post_id"]
      response=add_comment(text,post_id)
      return response

@app.route('/replies',methods=["POST","GET"])
def route_replies():
   if request.method=='GET':
      comment_id=request.args.get("comment_id")
      replies=get_all_replies(comment_id)
      return replies
   elif request.method=='POST':
      data=request.json
      text=data["text"]
      comment_id=data["comment_id"]
      response=add_reply(text,comment_id)
      return response

@app.route('/action',methods=["POST"])
def route_action():
   data=request.json
   action=data["action"]
   item=data["item"]
   id=data["id"]
   response=add_action(action,item,id)
   return response

@app.route("/signup",methods=["POST"])
def route_signup():
   data=request.json
   username=data["username"]
   pwd1=data["pwd1"]
   pwd2=data["pwd2"]
   response=add_user(username,pwd1,pwd2)
   return response

@app.route("/login",methods=["GET"])
def route_login():
    username=request.args.get["username"]
    pwd=request.args.get["pwd"]
    user_exists=check_user(username,pwd)
    if user_exists:
       return "Login successful!",200
    return "User does not exist",400

@app.route("/alerts",methods=["POST","GET","DELETE","PUT"])
def route_alert():
   if request.method=="GET":
      user_id=request.args.get("user_id")
      response=get_alerts(user_id)
      return response
   elif request.method=="POST":
      data=request.json
      user_id=data["user_id"]
      task=data["task"]
      task_time=data["task_time"]
      type=data["type"]
      response=add_alert(user_id,task,task_time,type)
      return response
   elif request.method=="DELETE":
      data=request.json
      alert_id=data.get("alert_id")
      response=delete_alert(alert_id)
   elif request.method=="PUT":
      data=request.json
      alert_id=data.get("alert_id")
      task=data.get("task")
      type=data.get("type")
      task_time=data.get("task_time")
      response=modify_alert(alert_id,task,type,task_time)


@app.route('/tips',methods=["GET"])
def route_tips():
   response=get_tips()
   return response




if __name__ == '__main__':
   app.run()

