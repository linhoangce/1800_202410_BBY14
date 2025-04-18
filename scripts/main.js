function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                console.log(userName);
            })

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("postCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    // Iterates through collection, retrieve each doc's content to display in descending order by timestamp
    db.collection(collection).orderBy("timestamp", 'desc').get()
        .then(allPosts => {
            var i = 1;  //unique ID for each post
            allPosts.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;       // get value of the "title" key
                var farm = doc.data().farm;  // get value of the "farm" key
                var image = doc.data().image;    //get image URL
                var product = doc.data().product; //gets the product
                var price = doc.data().price;
                var details = doc.data().description;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-farm').innerHTML = farm;
                newcard.querySelector('.card-text').innerHTML = product + "<br>" + details;
                newcard.querySelector('.card-image').src = image; //Example: NV01.jpg
                newcard.querySelector('.card-footer').innerHTML = "$" + price;
                newcard.querySelector('a').href = "eachpost.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-farm').setAttribute("id", "cfarm" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                newcard.querySelector('.card-footer').setAttribute("id", "cfooter" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                i++;   //Optional: iterate variable to serve as unique ID
            });
        });
}

displayCardsDynamically("posts");  //input param is the name of the collection

// Redirect to Profile Page

const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
});

document.getElementById('message-container').addEventListener('click', () => {
    window.location.href = 'messages.html';
});

document.getElementById('cart-icon-home').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

