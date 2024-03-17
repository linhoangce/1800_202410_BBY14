const storedData = localStorage.getItem("filteredDairyData");
const filteredData = JSON.parse(storedData); // Convert data back to an object
// Populate HTML Template


const cardTemplate = document.getElementById("postCardTemplate");

filteredData.forEach((doc) => {

    console.log("Document ID:", doc.id);

    // Create a new post based on the template
    const newcard = cardTemplate.content.cloneNode(true);

    // Populate the new post with data
    newcard.querySelector('.card-title').innerHTML = doc.title;
    newcard.querySelector('.card-farm').innerHTML = doc.farm;
    newcard.querySelector('.card-text').innerHTML = doc.product + doc.description;
    newcard.querySelector('.card-image').src = `./images/${doc.img}`; //Example: NV01.jpg
    newcard.querySelector('.card-footer').innerHTML = "$" + doc.price;
    newcard.querySelector('a').href = `eachpost.html?docID=${doc.id}`;

    document.getElementById("posts-go-here").appendChild(newcard);
});

