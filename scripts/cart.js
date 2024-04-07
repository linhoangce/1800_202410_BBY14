function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("cartContentTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 


    db.collection(collection).orderBy("timestamp").get()
           //the collection called "hikes"
        .then(allPosts => {
            var i = 1;  //Optional: if you want to have a unique ID for each hike
            allPosts.forEach(doc => { //iterate thru each doc
                var farm = doc.data().farm;  // get value of the "farm" key
                var image = doc.data().postImage;    //get unique ID to each hike to be used for fetching right image
                console.log("img", image);
                var avatar = doc.data().farmAvatar;
                console.log('ava ', avatar);
                var product = doc.data().product; //gets the product
                console.log("product ", product);
                var price = doc.data().totalPrice;
                console.log('price ', price);
                var quantity = doc.data().quantitySelected;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.farm-name').innerHTML = farm;
                newcard.querySelector('.farm-avatar').src = avatar;
                newcard.querySelector('.product-name').innerHTML = product;
                newcard.querySelector('.quantity').innerHTML = quantity; //Example: NV01.jpg
                newcard.querySelector('.price').innerHTML = price;
                newcard.querySelector('.product-img').src = image;

                //Optional: give unique ids to all elements for future use
                newcard.querySelector('.farm-name').setAttribute("id", "farm-name" + i);
                newcard.querySelector('.farm-avatar').setAttribute("id", "farm-avatar" + i);
                newcard.querySelector('.product-name').setAttribute("id", "product-name" + i);
                newcard.querySelector('.quantity').setAttribute("id", "quantity" + i);
                newcard.querySelector('.price').setAttribute("id", "price" + i);
                newcard.querySelector('.product-img').setAttribute('id', 'product-img' + i);
                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("cart");