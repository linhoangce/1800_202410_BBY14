

// Function to populate the HTML template based on the data
function populateVegetablesData(filteredData) {
  const cardTemplate = document.getElementById("postCardTemplate");

  // Sort posts in desc order by timestamp
  filteredData.sort((x, y) => y.timestamp - x.timestamp);

  filteredData.forEach((doc) => {
    console.log("Document ID:", doc.id);

    // Create a new post based on the template
    const newcard = cardTemplate.content.cloneNode(true);

    // Populate the new post with data
    newcard.querySelector('.card-title').innerHTML = doc.data.product;
    newcard.querySelector('.card-farm').innerHTML = doc.data.farm;
    newcard.querySelector('.card-text').innerHTML = doc.data.product + doc.data.description;
    newcard.querySelector('.card-image').src = doc.data.image; 
    newcard.querySelector('.card-footer').innerHTML = "$" + doc.data.price;
    newcard.querySelector('a').href = `eachpost.html?docID=${doc.id}`;

    document.getElementById("posts-go-here").appendChild(newcard);
  });
}

// To ensure DOM content is loaded before data is retrieved
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Retrieve the filtered data from local storage
    const storedData = localStorage.getItem("filteredVegetablesData");
    const filteredData = JSON.parse(storedData);
    populateVegetablesData(filteredData); // Populate the HTML template
  } catch (error) {
    console.error("Error processing data:", error);
  }
});
