document.getElementById("send-btn").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
    if (message !== "") {
      // Add message to Firestore
      firestore.collection("messages").add({

        // Sends the message to FireStore
        text: message,

        // Sends the timestamp of the sender to FireStore. 
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("Message sent to Firestore");
        messageInput.value = ""; // Clear input field after sending
      })
      .catch((error) => {
        // Sends error if message was not logged into FireStore
        console.error("Error sending message:", error);
      });
    }
  });

  $(document).ready(function() {
    $("#send-btn").click(function() {
      var message = $("#message-input").val();
      if (message.trim() !== "") {
        var chatMessage = '<div class="chat-message user-1"><strong>You:</strong> ' + message + '</div>';
        $("#chat-container").append(chatMessage);
        $("#message-input").val(""); // Clear input field after sending message
        // Scroll to bottom of chat container
        $("#chat-container").scrollTop($("#chat-container")[0].scrollHeight);
      }
    });
  });

  const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
})

document.getElementById('message-container').addEventListener('click', () => {
    window.location.href = 'messages.html';
})