
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
            // return currentUser;

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

            // Style bookmark
            // document.getElementById("save-" + doc.id).style.top = "50%";
            // document.getElementById("save-" + doc.id).style.transform = "translateX(-50%)";
            // document.getElementById("save-" + doc.id).style.right = "50px";

            // keep bookmark if already saved
            currentUser.get().then(userDoc => {
                //get the user name
                var bookmarks = userDoc.data().bookmarks;
                if (bookmarks.includes(doc.id)) {
                    document.getElementById('save-' + doc.id).innerText = 'bookmark';

                    document.querySelector("i").onclick = (event) => {
                        console.log("Bookmark icon clicked");

                        // a popup to confirm
                        const modal = document.getElementById("exampleModalCenter");
                        document.querySelector('i').setAttribute('data-bs-toggle', 'modal');
                        document.querySelector('i').setAttribute('data-bs-target', '#exampleModal');

                        yesUnsave = document.getElementById("yes-unsave");

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
                                    //this is to change the icon of the review that was saved to "filled"
                                    document.getElementById(iconID).innerText = 'bookmark_border';
                                    yesUnsave.setAttribute('data-bs-dismiss', 'modal');
                                    document.querySelector('i').removeAttribute('data-bs-toggle');
                                    document.querySelector('i').removeAttribute('data-bs-target');
                                });

                        });

                        // modal.style.display = 'none';

                    }
                }
            });
        });
}


// displayPostInfo();


function savePostDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('postDocID', ID);
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
            //this is to change the icon of the review that was saved to "filled"
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
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");
    let reviewCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let postID = params.searchParams.get("docID");
    console.log("postID: ", postID);

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
                var filePath = doc.data().imgReview;

                // parse file path to get only file format name
                const pathParsed = filePath.split("\\");
                const fileName = pathParsed[pathParsed.length - 1];
                console.log("filename: ", fileName);

                console.log(time);

                let reviewCard = reviewCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                // reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                // reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                // reviewCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
                // reviewCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
                reviewCard.querySelector(".description").innerHTML = `${comment}`;
                reviewCard.querySelector(".file").src = `./images/${fileName}`;
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
                console.log("starRating: ", starRating);
                document.querySelector("#star-rating").innerHTML = starRating;
                // Calculate the number of filled stars
                // const filledStars = Math.floor(rating);
                // const hasHalfStar = rating % 1 !== 0;

                // Fill the stars

                reviewCardGroup.appendChild(reviewCard);
            });
        });
}


// Generate Google map
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("googleMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

window.initMap = initMap;

// Make the search bar appear when scrolling
const navbar = document.getElementById("top-navbar");
const searchBar = document.getElementById("search-field");
const searchIcon = document.getElementById("search-icon");

window.addEventListener("scroll", () => {

    if (window.scrollY > 0) {
        searchBar.style.display = "block";
        searchIcon.style.display = "block";

        if (window.scrollY > 170) {
            navbar.style.height = '120px';
            navbar.style.backgroundColor = "white";
            navbar.style.border = "thin black";
            document.getElementById("back-icon").style.color = "green";
            document.getElementById("cart-icon").setAttribute('name', 'cart-outline');
            document.getElementById("cart-icon").classList.add('green-outline-cart');
            document.getElementById('toggle-icon').style.color = 'green';
            document.getElementById('search-icon').style.color = 'green';
        } else {
            navbar.style.backgroundColor = "";
            document.getElementById('cart-icon').classList.remove('green-outline-cart');
            document.getElementById("cart-icon").setAttribute('name', 'cart');
            document.getElementById("back-icon").style.color = "black";
            document.getElementById('search-icon').style.color = 'black';
            document.getElementById('toggle-icon').style.color = 'black';

        }
    } else {
        navbar.style.backgroundColor = "";
        searchBar.style.display = "none";
        searchIcon.style.display = "none";
        document.getElementById("back-icon").style.color = "initial";
        document.getElementById("cart-icon").setAttribute('name', 'cart');
        document.getElementById('cart-icon').classList.remove('green-outline-cart');
        document.getElementById('toggle-icon').style.color = 'black';

    }
});

