////////// variables //////////

//get the container that includes all our data
const app = document.querySelector(".app");

//button to click to join room
const joinBtn = app.querySelector(".join-screen #join-user");

//button to click to send the message
const sendMessageBtn = app.querySelector(".chat-screen #send-message");

//button to click to exit the chat room
const exitBtn = app.querySelector(".chat-screen #exit-chat");

//message container for send messages into it
const messageContainer = app.querySelector(".chat-screen .messages");

//use to store the username on sending message
let uname;

//the global io use for socket in client side
const socket = io();

////////// variables //////////

////////// event listeners //////////

//event when user join the chatroom
joinBtn.addEventListener("click", () => {
  let username = app.querySelector(".join-screen #username").value;
  if (username.length == 0) {
    return;
  }

  socket.emit("newuser", username);
  uname = username;

  app.querySelector(".join-screen").classList.remove("active");
  app.querySelector(".chat-screen").classList.add("active");
});

//event for send the message to chatbox
sendMessageBtn.addEventListener("click", () => {
  //get the message and check if it is empty or not(on empty do nothing and return)
  let message = app.querySelector(".chat-screen #message-input").value;
  if (message.length == 0) {
    return;
  }

  //render message
  renderMessage("my", {
    username: uname,
    text: message,
  });

  //broadcast message to any client on socket
  socket.emit("chat", {
    username: uname,
    text: message,
  });

  //clear the messagebox
  app.querySelector(".chat-screen #message-input").value = "";
});

//event when user click on exit button for left chatroom
exitBtn.addEventListener("click", () => {
  //broadcast the exit of user
  socket.emit("exituser", uname);
  //refresh the client to disconnect
  window.location.reload(true);
});

//event when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  ////////// events for create chat room real-time //////////

  //update event for broadcast the join or exit of a user
  socket.on("update", (update) => {
    renderMessage("update", update);
  });

  // chat event for broadcast the messages to another clients
  socket.on("chat", (message) => {
    renderMessage("other", message);
  });

  ////////// events for create chat room real-time //////////
});

////////// event listeners //////////

////////// functions //////////

/*
function for create a DOM element

example => <p class="className">inner text</p>
        => createElement("p","class","className","inner text");
example => <div class="className"></div>
        => createElement("div","class","className",null);
*/
function createElement(tag, attrName, attrValue, innerText) {
  let element = document.createElement(tag);
  if (attrName != null && attrValue != null) {
    element.setAttribute(attrName, attrValue);
  }
  if (innerText != null) {
    element.innerText = innerText;
  }

  return element;
}

//function for render message base on type
function renderMessage(type, message) {
  if (type == "my") {
    let element = createElement("div", "class", "message", null);

    let sender = createElement("p", "class", "name", "you");

    let msg = createElement("p", null, null, message.text);

    element.appendChild(sender);
    element.appendChild(msg);

    messageContainer.appendChild(element);
  } else if (type == "other") {
    let element = createElement("div", "class", "message", null);

    let sender = createElement("p", "class", "name", message.username);

    let msg = createElement("p", null, null, message.text);

    element.appendChild(sender);
    element.appendChild(msg);

    messageContainer.appendChild(element);
  } else if (type == "update") {
    let element = createElement("p", "class", "update", message);
    messageContainer.appendChild(element);
  }
}
