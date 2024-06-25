
const params = new URL(window.location.href); // get URL of search bar
const ID = params.searchParams.get("docID"); // get value for key "id"

//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            currentUser.get().then(doc => {
                userAvatarUrl = doc.data().avatar;
                document.getElementById('user-avatar').src = userAvatarUrl;
            });            // return currentUser;

            // the following functions are always called when someone is logged in
            displayPostInfo();
            populateReviews();
            populateAverageReviews();
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();


// Displays post content after retrieving from firestore database
function displayPostInfo() {

    console.log("docID: ", ID);

    db.collection("posts")
        .doc(ID)
        .get()
        .then(doc => {
            thisPost = doc.data();
            postImage = doc.data().image;
            postTitle = doc.data().title;
            postFarm = doc.data().farm;
            postProduct = doc.data().product;
            postQuantity = doc.data().quantity;
            postDescription = doc.data().description;
            postPrice = doc.data().price;
            
            console.log("URL ", postImage);
            document.getElementById("post-title").innerHTML = postTitle;
            let imgEvent = document.querySelector(".post-img");
            imgEvent.src = postImage;
            document.getElementById("farm").innerHTML = postFarm;
            document.getElementById("product").innerHTML = postProduct;
            document.getElementById("quantity").innerHTML = postQuantity;
            document.getElementById("description").innerHTML = postDescription;
            document.getElementById("price").innerHTML = postPrice;

            document.querySelector('i').id = 'save-' + doc.id;   //guaranteed to be unique
            console.log("save id: ", document.getElementById('save-' + doc.id));
            document.querySelector('i').onclick = () => saveBookmark(doc.id); // onclick can lead to firing the modal events twice

        });
}


function savePostDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('postDocID', ID);
    window.location.href = "review.html";
}

const bookmarkClicked = document.getElementById('bookmark-container');
// bookmarkClicked.addEventListener('click', saveBookmark); // for debugging

async function saveBookmark(postDocID) {
    console.log('docID', postDocID);
    currentUser.get().then(userDoc => {
        //get the user name
        console.log('userDoc', userDoc);
        const userData = userDoc.data();
        console.log('userData', userData);

        // Initialize bookmarks if undefined
        const bookmarks = userData.bookmarks || [];
        console.log("bookmarks", bookmarks);

        if (bookmarks.includes(postDocID)) {
            // a popup to confirm
            document.querySelector('i').setAttribute('data-bs-toggle', 'modal');
            document.querySelector('i').setAttribute('data-bs-target', '#exampleModal');

            yesUnsaveButton = document.getElementById("yes-unsave");

            yesUnsaveButton.addEventListener("click", () => {
                currentUser.update({
                    // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
                    // This method ensures that the ID is added only if it's not already present, preventing duplicates.
                    bookmarks: firebase.firestore.FieldValue.arrayRemove(postDocID)
                })
                    // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
                    .then(function () {
                        console.log("bookmark has been unsaved for" + postDocID);
                        let iconID = 'save-' + postDocID;
                        console.log(iconID);
                        //this is to change the icon of the review that was saved to "filled"

                    });
                document.getElementById('save-' + postDocID).innerText = 'bookmark_border';
                yesUnsaveButton.setAttribute('data-bs-dismiss', 'modal');
                document.querySelector('i').removeAttribute('data-bs-toggle');
                document.querySelector('i').removeAttribute('data-bs-target');
            });

        } else {
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
            showSaved();
        }

    });
}

const saveButton = document.getElementById("bookmark-container");

// Show confirmation for saving a post
function showSaved() {
    var div = document.getElementById('post-saved');
    div.style.display = 'block';
    setTimeout(function () {
        div.style.display = 'none';
    }, 4000);
    console.log("Saved!");
}

// Populate review
function populateReviews() {
    console.log("test");
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");
    let reviewCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let postID = params.searchParams.get("docID");
    console.log("postID: ", postID);

    // Iterates through the reviews collection, retrieves doc content and displays it
    db.collection("reviews")
        .where("postDocID", "==", postID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);

            reviews.forEach((doc) => {
                var title = doc.data().title;
                var comment = doc.data().comment;
                var time = doc.data().timestamp.toDate();
                var reviewImg = doc.data().reviewImage;
                var rating = doc.data().rating; // Get the rating value

                let reviewCard = reviewCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".description").innerHTML = `${comment}`;
                reviewCard.querySelector(".file").src = reviewImg;
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
                // console.log("starRating: ", starRating);
                reviewCard.querySelector('#star-review').innerHTML = starRating;

                // Fill the stars

                reviewCardGroup.appendChild(reviewCard);
            });
        });
}

function populateAverageReviews() {

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

            let totalRating = 0;
            let totalReviews = 0;

            reviews.forEach((doc) => {
                var rating = doc.data().rating; // Get the rating value

                totalRating += rating;
                totalReviews++;

                const averageRating = totalRating / totalReviews;
                console.log("Ave Star: ", averageRating);

                // Populate the star rating for each post based on the average rating value from all reviews

                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < averageRating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = averageRating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                // console.log("starRating: ", starRating);
                document.querySelector("#star-rating").innerHTML = starRating;
            });
        });
}

const navbar = document.getElementById("top-navbar");
const searchBar = document.getElementById("search-field");
const searchIcon = document.getElementById("search-icon");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        // Make the search bar appear when scrolling
        searchBar.style.display = "block";
        searchIcon.style.display = "block";

        // Changes styles when scrolling past the photo
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
            // Reverses changes to styles within photo frame
            navbar.style.backgroundColor = "";
            document.getElementById('cart-icon').classList.remove('green-outline-cart');
            document.getElementById("cart-icon").setAttribute('name', 'cart');
            document.getElementById("back-icon").style.color = "black";
            document.getElementById('search-icon').style.color = 'black';
            document.getElementById('toggle-icon').style.color = 'black';

        }
    } else {
        // Reverses changes to default
        navbar.style.backgroundColor = "";
        searchBar.style.display = "none";
        searchIcon.style.display = "none";
        document.getElementById("back-icon").style.color = "initial";
        document.getElementById("cart-icon").setAttribute('name', 'cart');
        document.getElementById('cart-icon').classList.remove('green-outline-cart');
        document.getElementById('toggle-icon').style.color = 'black';

    }
});

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
    locationButton.style.backgroundColor = 'white';
    locationButton.style.borderRadius = '5px';
    locationButton.style.padding = '5px';
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

// Google Map API Code
(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'cart.html';
});