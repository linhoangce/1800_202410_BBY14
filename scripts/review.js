var postDocID = localStorage.getItem("postDocID");    //visible to all functions on this page
console.log("postID: ", postDocID);

// Displays the post info on review page
function getPostName(id) {
    db.collection("posts")
        .doc(id)
        .get()
        .then((thisPost) => {
            var title = thisPost.data().title;
            var farm = thisPost.data().farm;
            document.getElementById("title").innerHTML = title;
            document.getElementById("farm_name").innerHTML = farm;
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

// Make stars clickable

// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});

// Save the image
var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("input-image"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();

// Save the review in a new doc with the post data into firestore

const postReviewButton = document.getElementById("post");

postReviewButton.addEventListener("click", async () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let comment = document.getElementById("comment").value;

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

            // Retrieves the post data to store in review
            db.collection("posts")
                .doc(postDocID)
                .get()
                .then((doc) => {

                    var farm = doc.data().farm;
                    var title = doc.data().title;
                    var imgPost = doc.data().image;
                    var product = doc.data().product;
                    var price = doc.data().price;
                    var postDetails = doc.data().description;

                    // Create a new collection of reviews for each post, each review is a doc
                    db.collection("reviews").add({
                        postDocID: postDocID,
                        userID: user.uid,
                        title: title,
                        farm: farm,
                        postImage: imgPost,
                        description: postDetails,
                        product: product,
                        price: price,
                        comment: comment,
                        rating: postRating, // Include the rating in the review
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then((reviewDocRef) => {
                        const reviewID = reviewDocRef.id;
                        uploadPic(reviewID);
                    });
                });
        } else {
            console.log("No user is logged in.");
        }
    });
});

// Upload the image for review to Cloud Storage
function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("reviews").doc(postDocID).update({
                        "reviewImage": url // Save the URL into users collection
                    })
                        // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this postID into an array for the OWNER
                            // so we can show "my posts" in the future
                            saveReviewDocIDforUser(postDocID);
                        });
                });
        })
        .catch((error) => {
            console.log("error uploading to cloud storage", error);
        });
}

//--------------------------------------------
//saves the review doc ID for the user, in an array
//--------------------------------------------
function saveReviewDocIDforUser(postDocID) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user id is: " + user.uid);
        console.log("postdoc id is: " + postDocID);
        db.collection("users").doc(user.uid).update({
            myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
        })
            .then(() => {
                console.log("5. Saved to user's review!");
                alert("Review is complete!");
                window.location.href = "thanks.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    });
}

const closeButton = document.getElementById("close-btn");

closeButton.addEventListener("click", () => {
    console.log("clicked");
    window.location.href = "eachpost.html?docID=" + postDocID;
});

