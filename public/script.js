const socket = io("/");

// creating peer
// undefined because we don't have a server running on client side
var peer = new PeerServer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443"
});

const user = prompt("Enter your name: ");

$(function () {
    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            console.log(user);
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    });
    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    });
});

//peer.on() listens to the "open" event
// when the page is open it triggers socket.emit()
peer.on("open", (id) => {
    // generating a new id
    socket.emit("join-room", ROOM_ID, id, user);
});

socket.on("createMessage", (message) => {
    $(".messages").append(`
        <div class="message">
            <b>
                <i class="fa fa-user-circle"></i>
                <span>${userName == user ? "Me" : userName}</span>
            </b>
            <span>${message}</span>
        </div>
    `)
});