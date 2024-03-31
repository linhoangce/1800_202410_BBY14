

// Event listener for the "Fetch Vegetables Data" button
const searchItem = document.getElementById("search-icon");
searchItem.addEventListener("click", async () => {
    try {
        // Get the query from search bar
        var queryValue = document.getElementById("search-field").value;
        console.log("Query value: ", queryValue);

        // Execute the Firestore query to search for the item
        const querySnapshot = await db.collection("posts").where("product", "==", queryValue).get();
        const searchData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        console.log("Search data: ", searchData);

        // check if the category exists, if not redirects to empty.html that displays a message
        if (searchData.length > 0) {
            localStorage.setItem("searchData", JSON.stringify(searchData));
            // Redirect to search_results.html
            window.location.href = "search_results.html";
        } else {
            window.location.href = "empty.html";    
        }
    } catch (error) {
        console.error("Error processing data:", error);
    }
});
