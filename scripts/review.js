var postDocID = localStorage.getItem("postDocID");    //visible to all functions on this page
console.log("postID: ", postDocID);

function getPostName(id) {
    db.collection("posts")
        .doc(id)
        .get()
        .then((thisPost) => {
            var title = thisPost.data().title;
            var farm = thisPost.data().farm;
            document.getElementById("title").innerHTML = title;
            document.getElementById("farm_name").innerHTML =farm;
        });
}

getPostName(postDocID);

// Handle authentication state change to make sure user info is returned
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in: ", user.uid);
        displayDefaultInfo(user);
    } else {
        console.log("No user is signed in.");
    }

});

// displays the user info

function displayDefaultInfo(user) {
    let userInfo = document.getElementById("user_name");
    var currentUser = db.collection("users").doc(user.uid);
    currentUser.get().then((doc) => {
        if (doc.exists) {
            userName = doc.data().name;
            console.log(userName);
            userInfo.innerHTML = userName;
        }
    });
}


function writeReview() {
    console.log("inside write review");
    let comment = document.getElementById("comment").value; 
    let file = document.getElementById("file_name").value;

    // Get the star rating
    // Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
    // Initialize a variable 'hikeRating' to keep track of the rating count
    let postRating = 0;
    // Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            // If the condition is met, increment the 'hikeRating' by 1
            postRating++;
        }
    });

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        db.collection("posts")
            .doc(postDocID)
            .get()
            .then((doc) => {

                var farm = doc.data().farm;
                var title = doc.data().title;
                var imgPost = doc.data().img;
                var product = doc.data().product;
                var price = doc.data().price;
                var postDetails = doc.data().description;

                // Create a new collection of reviews for each post, each review is a doc
                db.collection("reviews").add({
                    postDocID: postDocID,
                    userID: userID,
                    title: title,
                    farm: farm,
                    imgReview: file,
                    imgPost: imgPost,
                    description: postDetails,
                    product: product,
                    price: price,
                    comment: comment,
                    rating: postRating, // Include the rating in the review
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    window.location.href = "thanks.html"; // Redirect to the thanks page
                });
            });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}

const postButton = document.getElementById("post");
const closeButton = document.getElementById("close-btn");

postButton.addEventListener("click", async () => {
    writeReview();
});

closeButton.addEventListener("click", () => {
    console.log("clicked");
    window.location.href = "eachpost.html?docID=" + postDocID;
});

