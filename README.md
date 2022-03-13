# realTimeChatroom
a simple real time chatroom using node.js and socket.io
- the implemented design : 
### ![](https://i.postimg.cc/VLG9QF6W/chat1.png)
### ![](https://i.postimg.cc/7PX00Ngr/chat2.png)
# how to run the program
you will need following items:
- [node js](https://nodejs.org/en/)
- [express js](https://expressjs.com/)
- [socket.io](https://socket.io/)

first of all make sure node.js is install on your system , you can check that with following command:

> node -v

after check that node.js is installed on your system , execute the following command where you clone the repo:

> npm install

with this command [express js](https://expressjs.com/) and [socket.io](https://socket.io/) package will be install automatically.


now you can run the program via :

> node server.js

now the server is running , open your browser and type :

> localhost:{port}

the default port on this program is 5000

# broadcast to another system
if you want to send the messages to different devices via different location , you should deploy the app on a VPS and use the given address to cmmunicate.
to see the app demo deployed on [heroku](https://www.heroku.com/) click the [following link](https://chat-room-ali-gh.herokuapp.com/).
