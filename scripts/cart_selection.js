
// Gets the current url
const paramsNew = new URL(window.location.href);
const docID = paramsNew.searchParams.get('docID');

var quantity = 0;
var decrementButton = document.getElementById('decrement');
var incrementButton = document.getElementById('increment');
var quantityDisplay = document.getElementById('quantity-selected');
var totalPriceDisplay = document.getElementById('total-price');
var itemPrice;

// Retrieve price from database instead of html element because the latter does not work!!!!
(async () => {
    try {
        // Gets the doc ID and saves it
        const doc = await db.collection("posts").doc(docID).get();
        if (doc.exists) {
            itemPrice = doc.data().price;

            // Decrements the quantity and activates/deactivates the buttons
            decrementButton.addEventListener('click', () => {
                console.log("- click");
                if (quantity > 0) {
                    quantity--;
                    updateQuantityAndPrice();
                    updateButtonsStyles();
                }
            });
            // Increment the quantity and activates the buttons
            incrementButton.addEventListener('click', () => {
                console.log("+ click");
                quantity++;
                updateQuantityAndPrice();
                updateButtonsStyles();

            });
        } else {
            console.log("Document not found!");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }

    // Update quantity and total price
    function updateQuantityAndPrice() {
        quantityDisplay.textContent = quantity;
        const totalPrice = itemPrice * quantity;
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Initial update
    updateQuantityAndPrice();
})();

// Display add to cart option panel
const addCartButton = document.getElementById("add-cart-container");
addCartButton.addEventListener('click', () => {
    document.querySelector('#cart-menu-option').style.display = "flex";
});

const buyButtonDirect = document.getElementById('buy-container');
buyButtonDirect.addEventListener('click', () => {
    document.querySelector('#cart-menu-option').style.display = "flex";
})

const buyButton = document.getElementById('buy-container-cart');
buyButton.addEventListener('click', () => {
    console.log('buy btn clicked');
    window.location.href = 'success_purchase.html';
});

//Activates or deactivates buttons
function updateButtonsStyles() {
    // Activates and changes element styles
    if (quantity >= 1) {
        addCartButtonAble.style.pointerEvents = 'auto';
        addCartButtonAble.style.backgroundColor = 'white';
        addCartButtonAble.style.border = 'solid green 5px';
        addCartButtonAble.style.color = 'green';

        buyButton.style.pointerEvents = 'auto';
        buyButton.style.backgroundColor = 'white';
        buyButton.style.border = 'solid green 5px';
        buyButton.style.color = 'green';

        addCartButtonAble.addEventListener('mouseenter', handleMouseEnter);
        addCartButtonAble.addEventListener('mouseleave', handleMouseLeave);
        buyButton.addEventListener('mouseenter', handleMouseEnter);
        buyButton.addEventListener('mouseleave', handleMouseLeave);

    } else {
        // Disables and reverses styles
        addCartButtonAble.style.pointerEvents = 'none';
        buyButton.style.pointerEvents = 'none';
        addCartButtonAble.removeEventListener('mouseenter', handleMouseEnter);
        addCartButtonAble.removeEventListener('mouseleave', handleMouseLeave);
        buyButton.removeEventListener('mouseleave', handleMouseLeave);
        buyButton.removeEventListener('mouseleave', handleMouseLeave);

        addCartButtonAble.style.backgroundColor = 'gray';
        addCartButtonAble.style.border = 'solid white 5px';
        addCartButtonAble.style.color = 'white';

        buyButton.style.backgroundColor = 'gray';
        buyButton.style.border = 'solid white 5px';
        buyButton.style.color = 'white';

    }
}

// Handles hovering effects
function handleMouseEnter(evt) {
    evt.target.style.backgroundColor = 'green';
    evt.target.style.border = 'solid white 5px';
    evt.target.style.color = 'white';
    evt.target.style.cursor = 'pointer';
}

function handleMouseLeave(evt) {
    evt.target.style.backgroundColor = 'white';
    evt.target.style.color = 'green';
}

// hide the cart selection panel
const closeButtonCart = document.getElementById('close-btn-cart');
closeButtonCart.addEventListener('click', () => {
    document.getElementById('cart-menu-option').style.display = 'none';
})

//Style delivery options
const pickupButton = document.getElementById('pickup');
const deliveryButton = document.getElementById('delivery');

deliveryButton.addEventListener('click', (evt) => {
    evt.target.style.backgroundColor = 'green';
    evt.target.style.border = 'solid white 1px';
    evt.target.style.color = 'white';
    evt.target.style.cursor = 'pointer';
    pickupButton.style.backgroundColor = 'white';
    pickupButton.style.color = 'green';
    pickupButton.removeEventListener('mouseleave', handleMouseLeaveDelivery);
    deliveryButton.removeEventListener('mouseenter', handleMouseEnterDelivery);
    deliveryButton.removeEventListener('mouseleave', handleMouseLeaveDelivery);

});

pickupButton.addEventListener('click', (evt) => {
    console.log("BOJJK");
    evt.target.style.backgroundColor = 'green';
    evt.target.style.color = 'white';
    deliveryButton.style.backgroundColor = 'white';
    deliveryButton.style.color = 'green';
});

pickupButton.addEventListener('mouseleave', handleMouseLeaveDelivery);
deliveryButton.addEventListener('mouseenter', handleMouseEnterDelivery);
deliveryButton.addEventListener('mouseleave', handleMouseLeaveDelivery);

function handleMouseEnterDelivery(evt) {
    evt.target.style.backgroundColor = 'green';
    evt.target.style.border = 'solid white 1px';
    evt.target.style.color = 'white';
    evt.target.style.cursor = 'pointer';
    pickupButton.style.backgroundColor = 'white';
    pickupButton.style.color = 'green';
}

function handleMouseLeaveDelivery(evt) {
    evt.target.style.backgroundColor = 'white';
    evt.target.style.color = 'green';
    pickupButton.style.backgroundColor = 'green';
    pickupButton.style.color = 'white';
}

// Create a cart collection to store users' selections in cart.
const addCartButtonAble = document.getElementById("add-cart-container-cart");

addCartButtonAble.addEventListener('click', async () => {
    console.log('add cart clicked');
    try {
        const user = await firebase.auth().currentUser;

        if (user) {
            const title = document.querySelector('h1').textContent;
            const farm = document.getElementById('post-title').textContent;
            const product = document.getElementById('product').textContent;
            const farmAvatar = document.getElementById('user-avatar').src;
            const postImage = document.getElementById('post-images').src
            const quantitySelected = document.getElementById('quantity-selected').textContent;
            const totalPrice = document.getElementById('total-price').textContent;
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const userID = user.uid;
            const doc = docID;

            // Update Firestore document

            const docId = await createCart("cart", { title, farm, product, quantitySelected, timestamp, userID, farmAvatar, doc, totalPrice, postImage });

            console.log("Document succesfully updated!", docId);
            window.location.href = 'cart.html';
        } else {
            console.log("No user is logged in.");
        }
    } catch (error) {
        console.error("Error updating document:", error);
    }
});

async function createCart(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add(data);
        console.log("docRef: ", docRef.id);
        console.log("Document written with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}


