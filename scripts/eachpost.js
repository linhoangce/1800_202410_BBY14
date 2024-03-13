function displayPostInfo() {
    let params = new URL( window.location.href); // get URL of search bar
    let ID = params.searchParams.get("docID"); // get value for key "id"
    console.log( ID );

    db.collection( "post" )
        .doc( ID )
        .get()
        .then( doc => {
            thisPost = doc.data();
            postCode = thisPost.code;
            postTitle = doc.data().title;

            document.getElementById("postTitle").innerHTML = postTitle;
            let imgEvent = document.querySelector("post-img");
            imgEvent.src = "../images/" + postCode + ".png";
        }) ;
}

displayPostInfo();