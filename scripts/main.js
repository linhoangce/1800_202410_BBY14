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

function writePostLoop(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var postsRef = db.collection("posts");
    for (i = 1; i <= max; i++) {
        postsRef.add({ //add to database, autogen ID
            title: "",
            farm: "",
            product: "",
            price: "",
            quantity: "",
            description: "",
            img: "",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("postCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 


    db.collection(collection).get()   //the collection called "hikes"
        .then(allPosts => {
            var i = 1;  //Optional: if you want to have a unique ID for each hike
            allPosts.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;       // get value of the "title" key
                var farm = doc.data().farm;  // get value of the "farm" key
                var imgCode = doc.data().img;    //get unique ID to each hike to be used for fetching right image
                var product = doc.data().product; //gets the product
                var price = doc.data().price;
                var details = doc.data().description;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                // parse file path to get only file format name
                const pathParsed = imgCode.split("\\");
                const fileName = pathParsed[pathParsed.length - 1];
                console.log("File name: ", fileName);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-farm').innerHTML = farm;
                newcard.querySelector('.card-text').innerHTML = product + "<br>" + details;
                newcard.querySelector('.card-image').src = "./images/" + fileName; //Example: NV01.jpg
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
            })
        })
}

displayCardsDynamically("posts");  //input param is the name of the collection

// Redirect to Profile Page
const profileButton = document.getElementById("account-btn");

profileButton.addEventListener("click", () => {
    window.location.href = "profile.html";
})

const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
})


// Style the top navbar when scrolling
const topNavbar = document.querySelector('.fixed-top');
const searchBarScroll = document.querySelector('#search-bar-scroll');

// const originalStyles = {
//     navPos: topNavbar.style.position,
//     width: searchBar.style.width,
//     position: searchBar.style.position,
//     searchMargin: searchBar.style.margin,
//     searchMarginLeft: searchBar.style.marginLeft,
//     backgroundColor: topNavbar.style.backgroundColor,
//     height: topNavbar.style.height,
//     searchIconColor: document.getElementById('search-icon').style.color,
//     cartPos: document.querySelector('.cart').style.position,
//     cartRight: document.querySelector('.cart').style.right,
//     cartBottom: document.querySelector('.cart').style.bottom,

// };
// const originalTopPosition = '900px';

window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {

        searchBarScroll.style.display = 'block';
        topNavbar.style.backgroundColor = 'white';
        topNavbar.style.height = '120px';

        searchBarScroll.style.position = 'relative';
        document.getElementById("search-field-scroll").style.position = 'absolute';
        document.getElementById("search-field-scroll").classList.remove('form-control');
        document.getElementById("search-field-scroll").classList.remove('me-1');
        document.getElementById("search-field-scroll").style.left = '-140px';
        document.getElementById("search-field-scroll").style.border = 'white';
        document.getElementById("search-field-scroll").style.top = '-10px';
        document.getElementById('search-icon-scroll').style.left = '-130px';
        document.getElementById('search-icon-scroll').style.top = '0';
        document.getElementById("cart-icon-home").setAttribute('name', 'cart-outline');
        document.getElementById("cart-icon-home").classList.add('green-outline-cart');
        document.getElementById("cart-icon-home").style.bottom = '8px';
        document.querySelector('.navbar-toggler-icon').style.color = 'green';
        document.getElementById('cart-icon-home').addEventListener('mouseenter', handleMouseEnterCart);
        document.getElementById('cart-icon-home').addEventListener('mouseleave', handleMouseLeaveCart);

    } else {
        searchBarScroll.style.display = 'none';
        topNavbar.style.backgroundColor = '';
        topNavbar.style.height = '';

        searchBarScroll.style.position = 'relative';
        document.getElementById("search-field-scroll").style.position = 'absolute';
        document.getElementById("search-field-scroll").classList.remove('form-control');
        document.getElementById("search-field-scroll").classList.remove('me-1');
        document.getElementById("search-field-scroll").style.left = '-140px';
        document.getElementById("search-field-scroll").style.border = 'white';
        document.getElementById("search-field-scroll").style.top = '-10px';
        document.getElementById('search-icon-scroll').style.left = '-130px';
        document.getElementById('search-icon-scroll').style.top = '0';
        document.getElementById("cart-icon-home").setAttribute('name', 'cart');
        document.getElementById("cart-icon-home").classList.remove('green-outline-cart');
        document.getElementById("cart-icon-home").style.color = 'black';
        document.getElementById("cart-icon-home").style.bottom = '8px';
        document.getElementById('search-icon').style.color = '';
        document.getElementById('cart-icon-home').removeEventListener('mouseenter', handleMouseEnterCart);
        document.getElementById('cart-icon-home').removeEventListener('mouseleave', handleMouseLeaveCart);
    }
})


function handleMouseEnterCart(evt) {

    evt.target.style.color = 'green';

}

function handleMouseLeaveCart(evt) {

    evt.target.style.color = '';

}