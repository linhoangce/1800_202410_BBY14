// var postDocID = localStorage.getItem("postDocID");    //visible to all functions on this page
// console.log("postID: ", postDocID);

// // Handle authentication state change to make sure user info is returned
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log("User is signed in: ", user.uid);
//     } else {
//         console.log("No user is signed in.");
//     }

// });

// function savePostToDatabase() {

//     var user = firebase.auth().currentUser;
//     if (user) {
//         var currentUser = db.collection("users").doc(user.uid);
//         var userID = user.uid;

//         db.collection("users")
//             .doc(userID)
//             .get()
//             .then((doc) => {

//                 // Create a new collection of reviews for each post, each review is a doc
//                 db.collection("savedPosts").add({
//                     postDocID: postDocID,
//                     userID: userID,
//                     title: postDocID.data().title,
//                     farm: postDocID.data().farm,
//                     img: postDocID.data().img,
//                     description: postDocID.data().description,
//                     product: postDocID.data().product,
//                     price: postDocID.data().price,
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                 }).then(() => {
//                     window.location.href = "thanks.html"; // Redirect to the thanks page
//                 });
//             });
//     } else {
//         console.log("No user is signed in");
//         window.location.href = 'review.html';
//     }
// }

// const saveButton = document.getElementById("save-btn");

// postButton.addEventListener("click", async () => {
//     savePostToDatabase();
// });



