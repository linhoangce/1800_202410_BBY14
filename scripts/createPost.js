const postRef = db.collection("posts");

const titleInput = document.querySelector("#title");
const farmInput = document.querySelector("#farm");
const categoryInput = document.querySelector("#create-categories");
const productInput = document.querySelector("#product-type");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const descriptionInput = document.querySelector("#description");
const postButton = document.querySelector("#post");


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

postButton.addEventListener("click", async () => {
    firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
            var title = titleInput.value;
            var titleUpperCase = title.toUpperCase();
            var farm = farmInput.value;
            var farmUpperCase = farm.toUpperCase();
            var category = categoryInput.value;
            var categoryUpperCase = category.toUpperCase();
            var product = productInput.value;
            var productUpperCase = product.toUpperCase();
            var price = priceInput.value;
            var quantity = quantityInput.value;
            var description = descriptionInput.value;
            var descriptionUpperCase = description.toUpperCase();
            var timestamp = firebase.firestore.FieldValue.serverTimestamp();

            db.collection('posts').add({
                userID: user.uid,
                title: title,
                titleUpperCase: titleUpperCase,
                farm: farm,
                farmUpperCase: farmUpperCase,
                category: category,
                categoryUpperCase,
                product: product,
                productUpperCase: productUpperCase,
                price: price,
                quantity: quantity,
                description: description,
                descriptionUpperCase: descriptionUpperCase,
                timestamp: timestamp
            }).then(doc => {
                console.log("Added post successfully");
                console.log("DOCID; ", doc.id);
                uploadPic(doc.id);
            })
        } else {
            console.log("No user is logged in.");
        }
    });
});
            


//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
// 
// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
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
                    db.collection("posts").doc(postDocID).update({
                            "image": url // Save the URL into users collection
                        })
                         // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this postID into an array for the OWNER
                            // so we can show "my posts" in the future
                            savePostIDforUser(postDocID);
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
    firebase.auth().onAuthStateChanged(user => {
          console.log("user id is: " + user.uid);
          console.log("postdoc id is: " + postDocID);
          db.collection("users").doc(user.uid).update({
                myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
          })
          .then(() =>{
                console.log("5. Saved to user's document!");
                                alert ("Posted successfully!");
                                window.location.href = "eachpost.html?docID=" + postDocID;
                            })
           .catch((error) => {
                console.error("Error writing document: ", error);
           });
    })
}

const cancelPostingButton = document.getElementById("close-btn");
// Click back button to go back to the previous page
cancelPostingButton.addEventListener('click', () => {
    window.location.href = 'main.html';
})

const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
})

document.getElementById('message-container').addEventListener('click', () => {
    window.location.href = 'messages.html';
})