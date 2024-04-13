const viewOrderButton = document.getElementById('tracking');
const messageButton = document.getElementById('message-farm');

// Styles the button when hovering
viewOrderButton.addEventListener('mouseenter', handleMouseEnter);
viewOrderButton.addEventListener('mouseleave', handleMouseLeave);

// Handles hovering effects
function handleMouseEnter(evt) {
    evt.target.style.backgroundColor = 'green';
    evt.target.style.color = 'white';
    evt.target.style.cursor = 'pointer';
    messageButton.style.backgroundColor = 'white';
    messageButton.style.color = 'green';
    messageButton.style.border = 'solid green 1px';
}

function handleMouseLeave(evt) {
    evt.target.style.backgroundColor = 'white';
    evt.target.style.color = 'green';
    evt.target.style.border = 'solid green 1px';
    messageButton.style.backgroundColor = 'green';
    messageButton.style.color = 'white';
}

const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
})

document.getElementById('message-container').addEventListener('click', () => {
    window.location.href = 'messages.html';
})

document.getElementById('cart-icon-home').addEventListener('click', () => {
    window.location.href = 'cart.html';
})