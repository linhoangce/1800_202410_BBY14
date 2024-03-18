function displayPostInfo() {
    let params = new URL( window.location.href); // get URL of search bar
    let ID = params.searchParams.get("docID"); // get value for key "id"
    console.log( ID );

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
            document.getElementById("product").innerHTML = postFarm;
            document.getElementById("quantity").innerHTML = postQuantity;
            document.getElementById("description").innerHTML = postDescription;
            document.getElementById("price").innerHTML = postPrice;
        }) ;
}

displayPostInfo();