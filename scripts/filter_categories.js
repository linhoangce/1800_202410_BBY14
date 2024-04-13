// Retrieve the doc where category name matches with the category queried/buttons
async function fetchDataFromFirestore(category) {
  try {
    // Execute the Firestore query to filter by categories
    const querySnapshot = await db.collection("posts").where("category", "==", category).get();
    const filteredData = querySnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    return filteredData;
  } catch (error) {
    console.error(`Error filtering documents for category '${category}':`, error);
    return []; // Return an empty array in case of an error
  }
}

// Event listener for the "Fetch Vegetables Data" button
const vegetablesFiltered = document.querySelector("#veggies-category");
vegetablesFiltered.addEventListener("click", async () => {
  try {
    const filteredData = await fetchDataFromFirestore("vegetables");

    // check if the category exists, if not redirects to empty.html that displays a message
    if (filteredData.length > 0) {
      localStorage.setItem("filteredVegetablesData", JSON.stringify(filteredData));
      // Redirect to the desired page (e.g., "vegetables.html")
      window.location.href = "vegetables.html";
    } else {
      window.location.href = "empty.html";
    }
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

// Event listener for the "Fetch Fruits Data" button
const fruitsFiltered = document.querySelector("#fruits-category");
fruitsFiltered.addEventListener("click", async () => {
  try {
    const filteredData = await fetchDataFromFirestore("fruits");

    // check if the category exists, if not redirects to empty.html that displays a message
    if (filteredData.length > 0) {
      localStorage.setItem("filteredFruitsData", JSON.stringify(filteredData));
      // Redirect to the desired page (e.g., "vegetables.html")
      window.location.href = "fruits.html";
    } else {
      window.location.href = "empty.html";
    }
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

// Event listener for the "Fetch Dairy Data" button
const dairyFiltered = document.querySelector("#dairy-category");
dairyFiltered.addEventListener("click", async () => {
  try {
    const filteredData = await fetchDataFromFirestore("dairy");

    // check if the category exists, if not redirects to empty.html that displays a message
    if (filteredData.length > 0) {
      localStorage.setItem("filteredDairyData", JSON.stringify(filteredData));
      // Redirect to the desired page (e.g., "vegetables.html")
      window.location.href = "dairy.html";
    } else {
      window.location.href = "empty.html";
    }

  } catch (error) {
    console.error("Error processing data:", error);
  }
});

// Event listener for the "Fetch Nuts Data" button
const nutsFiltered = document.querySelector("#nuts-category");
nutsFiltered.addEventListener("click", async () => {
  try {
    const filteredData = await fetchDataFromFirestore("nuts");

    // check if the category exists, if not redirects to empty.html that displays a message
    if (filteredData.length > 0) {
      localStorage.setItem("filteredNutsData", JSON.stringify(filteredData));
      // Redirect to the desired page (e.g., "vegetables.html")
      window.location.href = "nuts.html";
    } else {
      window.location.href = "empty.html";
    }

  } catch (error) {
    console.error("Error processing data:", error);
  }
});

// Event listener for the "Fetch Plants Data" button
const plantsFiltered = document.querySelector("#plants-category");
plantsFiltered.addEventListener("click", async () => {
  try {
    const filteredData = await fetchDataFromFirestore("plants");

    // check if the category exists, if not redirects to empty.html that displays a message
    if (filteredData.length > 0) {
      localStorage.setItem("filteredPlantsData", JSON.stringify(filteredData));
      // Redirect to the desired page (e.g., "vegetables.html")
      window.location.href = "plants.html";
    } else {
      window.location.href = "empty.html";
    }

  } catch (error) {
    console.error("Error processing data:", error);
  }
});