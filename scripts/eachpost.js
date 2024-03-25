
const params = new URL( window.location.href); // get URL of search bar
const ID = params.searchParams.get("docID"); // get value for key "id"

function displayPostInfo() {
    
    console.log( "docID: ", ID );
    

    db.collection( "posts" )
        .doc( ID )
        .get()
        .then( doc => {
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
            const fileName = pathParsed[pathParsed.length -1];
            console.log("File name: ", fileName);

            document.getElementById("post-title").innerHTML = postTitle;
            let imgEvent = document.querySelector(".post-img");
            imgEvent.src = "../images/" + fileName;
            document.getElementById("farm").innerHTML = postFarm;
            document.getElementById("product").innerHTML = postProduct;
            document.getElementById("quantity").innerHTML = postQuantity;
            document.getElementById("description").innerHTML = postDescription;
            document.getElementById("price").innerHTML = postPrice;
        }) ;

        
}

displayPostInfo();

function savePostDocumentIDAndRedirect(){
    window.location.href = "review.html";
}



async function savePostToDatabase() {

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        const postDoc = await db.collection("posts").doc(ID).get();
        const postData = postDoc.data();

        db.collection("users")
            .doc(userID)
            .get()
            .then((doc) => {

                // Create a new collection of reviews for each post, each review is a doc
                db.collection("savedPosts").add({
                    postDocID: ID,
                    userID: userID,
                    title: postData.title,
                    farm: postData.farm,
                    img: postData.img,
                    description: postData.description,
                    product: postData.product,
                    price: postData.price,
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

const saveButton = document.getElementById("save-btn");

saveButton.addEventListener("click", async () => {
    savePostToDatabase();
});



