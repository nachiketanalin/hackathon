from flask import Flask, request
from helper import *
app = Flask(__name__)


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
      text=request.form["text"]
      response=add_post(text)
      return response

@app.route('/comments',methods=["POST","GET"])
def route_comments():
   if request.method=='GET':
      post_id=request.args.get("post_id")
      comments=get_all_comments(post_id)
      return comments
   elif request.method=='POST':
      text=request.form["text"]
      post_id=request.form["post_id"]
      response=add_comment(text,post_id)
      return response

@app.route('/replies',methods=["POST","GET"])
def route_replies():
   if request.method=='GET':
      comment_id=request.args.get("comment_id")
      replies=get_all_replies(comment_id)
      return replies
   elif request.method=='POST':
      text=request.form["text"]
      comment_id=request.form["comment_id"]
      response=add_reply(text,comment_id)
      return response

@app.route('/action',method=["POST"])
def route_action():
   action=request.form["action"]
   item=request.form["item"]
   id=request.form["id"]
   response=add_action(action,item,id)
   return response

@app.route("/signup",method=("POST"))
def route_signup():
   username=request.form["username"]
   pwd1=request.form["pwd1"]
   pwd2=request.form["pwd2"]
   response=add_user(username,pwd1,pwd2)
   return response

@app.route("/login",methods=("GET"))
def route_login():
    username=request.args.get["username"]
    pwd=request.args.get["pwd"]
    user_exists=check_user(username,pwd)
    if user_exists:
       return "Login successful!",200
    return "User does not exist",400

# @app.route("/social",methods=("POST,GET"))
# def route_social():
#    if request.method=='GET':
#         #TODO: get all posts from database
#         social_dict={}
#         return social_dict,200
#    else:
#         post=request.form["post"]
#         comments=request.form["comments"]
#         if not comments:
#             #TODO: Create new post
#             return "Post created",200
#         else:
#             #TODO: Add comment to existing post
#             return "Comment added",200

# @app.route("/chatbot",methods=("POST"))
# def route_chatbot():
#     query=request.form["query"]
#     #TODO: Get response from gemini
#     answer=""
#     return answer,200




if __name__ == '__main__':
   app.run()

