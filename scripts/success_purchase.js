const viewOrderButton = document.getElementById('tracking');
const messageButton = document.getElementById('message-farm');

// viewOrderButton.addEventListener('click', (evt) => {
//     evt.target.style.backgroundColor = 'green';
//     evt.target.style.border = 'solid white 1px';
//     evt.target.style.color = 'white';
//     evt.target.style.cursor = 'pointer';
//     pickupButton.style.backgroundColor = 'white';
//     pickupButton.style.color = 'green';
//     pickupButton.removeEventListener('mouseleave', handleMouseLeaveDelivery);
//     deliveryButton.removeEventListener('mouseenter', handleMouseEnterDelivery);
//     deliveryButton.removeEventListener('mouseleave', handleMouseLeaveDelivery);

// });

// pickupButton.addEventListener('click', (evt) => {
//     console.log("BOJJK");
//     evt.target.style.backgroundColor = 'green';
//     evt.target.style.color = 'white';
//     deliveryButton.style.backgroundColor = 'white';
//     deliveryButton.style.color = 'green';
// });


// pickupButton.addEventListener('mouseenter', handleMouseEnterDelivery);
// messageButton.addEventListener('mouseleave', handleMouseLeave);
viewOrderButton.addEventListener('mouseenter', handleMouseEnter);
viewOrderButton.addEventListener('mouseleave', handleMouseLeave);

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