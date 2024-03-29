
// const storedData = localStorage.getItem("filteredVegetablesData");
// filteredData = JSON.parse(storedData); // Convert data back to an object
// // Populate HTML Template


// // vegetables.js

// // Function to populate the HTML template based on the data
// function populateVegetablesData(filteredData) {
//     const cardTemplate = document.getElementById("postCardTemplate");
  
//     filteredData.forEach((doc) => {
//       console.log("Document ID:", doc.id);
  
//       // Create a new post based on the template
//       const newcard = cardTemplate.content.cloneNode(true);
  
//       // Populate the new post with data
//       newcard.querySelector('.card-title').innerHTML = doc.data.product;
//       newcard.querySelector('.card-farm').innerHTML = doc.data.farm;
//       newcard.querySelector('.card-text').innerHTML = doc.data.product + doc.data.description;
//       newcard.querySelector('.card-image').src = `./images/${doc.data.img}`; // Example: NV01.jpg
//       newcard.querySelector('.card-footer').innerHTML = "$" + doc.data.price;
//       newcard.querySelector('a').href = `eachpost.html?docID=${doc.id}`;
  
//       document.getElementById("posts-go-here").appendChild(newcard);
//     });
//   }
  
//   // Event listener for the "DOMContentLoaded" event
//   document.addEventListener("DOMContentLoaded", async () => {
//     try {
//       // Assume an asynchronous function that fetches data from Firestore
//       const filteredData = await fetchDataFromFirestore(); // Call your actual data retrieval function
//       populateVegetablesData(filteredData); // Populate the HTML template
//     } catch (error) {
//       console.error("Error processing data:", error);
//     }
//   });
  
// vegetables.js

// Function to populate the HTML template based on the data
function populateVegetablesData(filteredData) {
    const cardTemplate = document.getElementById("postCardTemplate");
  
    filteredData.forEach((doc) => {
      console.log("Document ID:", doc.id);
  
      // Create a new post based on the template
      const newcard = cardTemplate.content.cloneNode(true);
  
      // parse file path to get only file format name
      console.log(doc.data.img);
      const pathParsed = doc.data.img.split("\\");
      const fileName = pathParsed[pathParsed.length -1];
      console.log("File name: ", fileName);

      // Populate the new post with data
      newcard.querySelector('.card-title').innerHTML = doc.data.product;
      newcard.querySelector('.card-farm').innerHTML = doc.data.farm;
      newcard.querySelector('.card-text').innerHTML = doc.data.product + doc.data.description;
      newcard.querySelector('.card-image').src = "./images/" + fileName; // Example: NV01.jpg
      newcard.querySelector('.card-footer').innerHTML = "$" + doc.data.price;
      newcard.querySelector('a').href = `eachpost.html?docID=${doc.id}`;
  
      document.getElementById("posts-go-here").appendChild(newcard);
    });
  }
  
  // Event listener for the "DOMContentLoaded" event
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
  