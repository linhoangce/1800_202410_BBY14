
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
        const doc = await db.collection("posts").doc(docID).get();
        if (doc.exists) {
            itemPrice = doc.data().price;
            console.log("Item Price is:", itemPrice);

            // const decrementButton = document.getElementById('decrement');
            // const incrementButton = document.getElementById('increment');
            // const quantityDisplay = document.getElementById('quantity-selected');
            // const totalPriceDisplay = document.getElementById('total-price');

            // Event listeners
            decrementButton.addEventListener('click', () => {
                console.log("- click");
                if (quantity > 0) {
                    quantity--;
                    updateQuantityAndPrice();
                    updateButtonsStyles();
                }
            });

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

const addCartButtonAble = document.getElementById("add-cart-container-cart");
addCartButtonAble.addEventListener('click', () => {
    console.log('add cart clicked');
    window.location.href = 'cart.html';
});

const buyButton = document.getElementById('buy-container-cart');
buyButton.addEventListener('click', () => {
    console.log('buy btn clicked');
    window.location.href = 'cart.html';
});

function updateButtonsStyles() {
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