'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;
var colors = [
    '#E3E36A','#C9E3AC','#92B9BD',
    '#9984D4','#FF495C','#C6878F',
    '#C9B79C','#F1E0C5','#426A5A',
    '#F7A072'];



function connect(event){
    username = document.querySelector('#name').value.trim();

    if(username){
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);

    }
    event.preventDefault();
    console.log('Connected');
}

function onConnected() {
    //Subscribe to the public topic and calls the call back method
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Send username to the Server
    //using the stomp client to send the username to the controller
    //that adds users. we have no-body for this
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type:'JOIN'})
    );
    connectingElement.classList.add('hidden');
    console.log()
}

function onError() {
    connectingElement.textContent = 'Could not connect to a WebSocket server. Please refresh this page and try connecting again ....';
    connectingElement.style.color = 'red';
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN'){
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    }else if(message.type === 'LEAVE'){
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else{
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);

        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function sendMessage(event) {

    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient){
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };

        stompClient.send(
            "/app/chat.sendMessage",
            {},
            JSON.stringify(chatMessage)
        );
        messageInput.value = '';
    }

    event.preventDefault();
}

function getAvatarColor(messageSender){
    var hash = 0;
    for(var i = 0; i <messageSender.length; i++){
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}


usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
