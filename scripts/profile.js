var currentUser;               //points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {

        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;
                    let userAvatar = userDoc.data().avatar;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userAvatar != null) {
                        document.getElementById('mypic-goes-here').setAttribute('src', userAvatar);
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {

        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        // Async call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                // Async call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) {
                        console.log("Got the download URL.");
                        // get the values from the form
                        userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
                        userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
                        userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
                        // userAvatar = document.getElementById('mypic-inp').value;

                        // Asyn call to save the form fields into Firestore
                        currentUser.update({
                            name: userName,
                            school: userSchool,
                            city: userCity,
                            avatar: url
                        })
                            .then(() => {
                                console.log("Document successfully updated!");
                            });
                    });
            });

        //c) disable edit 
        document.getElementById('personalInfoFields').disabled = true;
    });
}

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();

const editProfile = document.getElementById("account-container");
editProfile.addEventListener("click", () => {
    window.location.href = "profile.html";
})

document.getElementById('message-container').addEventListener('click', () => {
    window.location.href = 'messages.html';
})