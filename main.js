// Get a reference to the database service
var database = firebase.firestore();

var chat = document.getElementById("chat");
var chatInput = document.getElementById("chatInput");
var username = document.getElementById("username");
var message = document.getElementById("message");

function writeUserData(userId, userMessage) {
    database.collection('chat').add({
        username: userId,
        message: userMessage,
        timeStamp: Date.now()
    });
};

function addMessage(username, message) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `${username}: ${message}`;
    chat.appendChild(newDiv);
};

chatInput.addEventListener("submit", function (event) {
    event.preventDefault();
    writeUserData(username.value, message.value);
});

database.collection("chat")
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
                addMessage(change.doc.data().username, change.doc.data().message);
            }
        });
    });