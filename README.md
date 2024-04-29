# chat
SpringBoot Web Socket Project, Building a Simple Chat App
Here we have a front end in HTML/CSS and JavaScript. Users have to
be added to the chat to be able to see the messages in this chat.
![image](https://github.com/yourisev/chat/assets/69630866/b18aad0e-1dfa-4c42-b94b-7f0357a768be)
The image abe shows the portal to gain entry into the chat.
![image](https://github.com/yourisev/chat/assets/69630866/34162807-ffb9-48f2-8f5e-114329db3df7)
The image above shows 3 users in the chat and only the first user can see his initial message
Now Arthur will leave the chat and we will see all the other users are notified.
![image](https://github.com/yourisev/chat/assets/69630866/33c2bbe2-a58c-48f8-8161-89e0f5e8c505)

The backend is done with Spring boot.
We have a ChatMessage model whose accessors and constructors are mave available as boiler plate code
thanks to Lombok. We equally have an Enum MessageType to distinguish between the types of chat messages,
In the ChatController class we have methods that listens to two different destinations and broadcast messages to
the same topic. This is done to log all messages(connection to chat, messages sent to chat, user leaving chat).

On the front end JavaScript tracks the events and send the messages to different destinations  and equally parses the payload
depending on the message type. This was a brief overview of this project.

The image below shows how WebSockets communication happens. It always starts with an upgrade so you should always try to Upgrade equally :)
![image](https://github.com/yourisev/chat/assets/69630866/e4395ce2-74a3-43af-a6ab-4977b7da0fe8)
