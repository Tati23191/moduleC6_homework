const wsUri = "wss://echo-ws-service.herokuapp.com/";

const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn")
const sendGeoLocation = document.getElementById("send-location")
const messageOutput = document.querySelector(".messages-field")

function writeMessage(message_html) {
    chat_message = document.createElement("div");
    chat_message.className = "message-row";
    chat_message.innerHTML = message_html
    messageOutput.appendChild(chat_message)
}

let webSocket = new WebSocket(wsUri)

webSocket.onmessage = function (evt) {
    if (evt.data.includes("Гео-локация")) {
        pass
    } else {
        writeMessage(`
        <div class="message message-receive">${evt.data}</div>
        <div class="empty-div-messagefil"></div>`)
    }

}

sendBtn.addEventListener("click", () => {
    message = messageInput.value;
    if (message === "") {
        console.log("Пустое сообщение")
    } else {
        writeMessage(`
        <div class="empty-div-messagefil"></div>
        <div class="message message-send">${message}</div>`)
        webSocket.send(message);
        messageInput.value = null;
    }
})

const success = function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    streets_url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    message = `<a id="geo-locate" target="_blank"  href="${streets_url}">Гео-локация</a>`
    writeMessage(`
        <div class="empty-div-messagefil"></div>
        <div class="message message-send">${message}</div>`)
    webSocket.send(message);
}

const error = function () {
    writeMessage(`
    <div class="empty-div-messagefil"></div>
    <div class="message message-send">Гео-локация недоступна</div>`)
}

sendGeoLocation.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        writeMessage(`
        <div class="empty-div-messagefil"></div>
        <div class="message message-send">Гео-локация недоступна</div>`)
    }
})