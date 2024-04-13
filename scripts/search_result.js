

// Function to populate the HTML template based on the data
function populateSearchData(searchData) {
  const cardTemplate = document.getElementById("postCardTemplate");

  // Sort search in desc order by timestamp
  searchData.sort((x, y) => y.timestamp - x.timestamp);

  searchData.forEach((doc) => {
    console.log("Document ID:", doc.id);

    // Create a new post based on the template
    const newcard = cardTemplate.content.cloneNode(true);

    // Populate the new post with data
    newcard.querySelector('.card-title').innerHTML = doc.data.product;
    newcard.querySelector('.card-farm').innerHTML = doc.data.farm;
    newcard.querySelector('.card-text').innerHTML = doc.data.product + doc.data.description;
    newcard.querySelector('.card-image').src = doc.data.image; // Example: NV01.jpg
    newcard.querySelector('.card-footer').innerHTML = "$" + doc.data.price;
    newcard.querySelector('a').href = `eachpost.html?docID=${doc.id}`;

    document.getElementById("posts-go-here").appendChild(newcard);
  });
}

// Event listener for the "DOMContentLoaded" event
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Retrieve the filtered data from local storage
    const storedData = localStorage.getItem("searchData");
    const searchData = JSON.parse(storedData);
    populateSearchData(searchData); // Populate the HTML template
  } catch (error) {
    console.error("Error processing data:", error);
  }
});
