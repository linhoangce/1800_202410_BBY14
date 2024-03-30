
const params = new URL(window.location.href); // get URL of search bar
const ID = params.searchParams.get("docID"); // get value for key "id"

//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);

            // the following functions are always called when someone is logged in
            displayPostInfo();
            populateReviews();;
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

function displayPostInfo() {

    console.log("docID: ", ID);


    db.collection("posts")
        .doc(ID)
        .get()
        .then(doc => {
            thisPost = doc.data();
            postImage = doc.data().img;
            postTitle = doc.data().title;
            postFarm = doc.data().farm;
            postProduct = doc.data().product;
            postQuantity = doc.data().quantity;
            postDescription = doc.data().description;
            postPrice = doc.data().price;

            // parse file path to get only file format name
            const pathParsed = postImage.split("\\");
            const fileName = pathParsed[pathParsed.length - 1];
            console.log("File name: ", fileName);

            document.getElementById("post-title").innerHTML = postTitle;
            let imgEvent = document.querySelector(".post-img");
            imgEvent.src = "../images/" + fileName;
            document.getElementById("farm").innerHTML = postFarm;
            document.getElementById("product").innerHTML = postProduct;
            document.getElementById("quantity").innerHTML = postQuantity;
            document.getElementById("description").innerHTML = postDescription;
            document.getElementById("price").innerHTML = postPrice;

            document.querySelector('i').id = 'save-' + doc.id;   //guaranteed to be unique
            console.log("save id: ", document.getElementById('save-' + doc.id));
            document.querySelector('i').onclick = () => saveBookmark(doc.id);

            // keep bookmark if already saved
            currentUser.get().then(userDoc => {
                //get the user name
                var bookmarks = userDoc.data().bookmarks;
                if (bookmarks.includes(doc.id)) {
                    document.getElementById('save-' + doc.id).innerText = 'bookmark';

                    document.querySelector("i").onclick = () => {
                        // a popup to confirm
                        document.getElementById("exampleModalCenter").style.display = 'block';
                        yesUnsave = document.getElementById("yes-unsave");
                        cancelUnsave = document.getElementById('cancel-unsave');
                        
                        yesUnsave.addEventListener("click", () => {
                            currentUser.update({
                                // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
                                // This method ensures that the ID is added only if it's not already present, preventing duplicates.
                                bookmarks: firebase.firestore.FieldValue.arrayRemove(doc.id)
                            })
                                // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
                                .then(function () {
                                    console.log("bookmark has been unsaved for" + doc.id);
                                    let iconID = 'save-' + doc.id;
                                    console.log(iconID);
                                    //this is to change the icon of the hike that was saved to "filled"
                                    document.getElementById(iconID).innerText = 'bookmark_border';
                                });
                        });

                        document.getElementById("exampleModalCenter").style.display = 'none';
                        cancelUnsave.addEventListener("click", () => {
                            document.getElementById("exampleModalCenter").style.display = 'none';
                        });
                    }
                } 
            });
        });
}


// displayPostInfo();


function savePostDocumentIDAndRedirect() {
    window.location.href = "review.html";
}


async function saveBookmark(postDocID) {

    currentUser.update({
        // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
        // This method ensures that the ID is added only if it's not already present, preventing duplicates.
        bookmarks: firebase.firestore.FieldValue.arrayUnion(postDocID)
    })
        // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
        .then(function () {
            console.log("bookmark has been saved for" + postDocID);
            let iconID = 'save-' + postDocID;
            console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

//Save a post to database when clicking save button
// const saveButton = document.getElementById("save-btn");

// saveButton.addEventListener("click", async () => {
//     savePostToDatabase();
//     showSaved();
// });

// // Show confirmation for saving a post
// function showSaved() {
//     var div = document.getElementById('post-saved');
//     div.style.display = 'block';
//     setTimeout(function () {
//         div.style.display = 'none';
//     }, 4000);
//     console.log("Saved!");

//     // toggle save icon
//     const icon = document.getElementById("save-btn-clicked");
//     icon.style.display = "block";
// }

// Populate review
function populateReviews() {
    console.log("test");
    let hikeCardTemplate = document.getElementById("reviewCardTemplate");
    let hikeCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let postID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("reviews")
        .where("postDocID", "==", postID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                // var level = doc.data().level;
                // var season = doc.data().season;
                var comment = doc.data().comment;
                // var flooded = doc.data().flooded;
                // var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                // reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                // reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                // reviewCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
                // reviewCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
                reviewCard.querySelector(".description").innerHTML = `Comment: ${comment}`;

                // Populate the star rating based on the rating value

                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                hikeCardGroup.appendChild(reviewCard);
            });
        });
}

// populateReviews();


