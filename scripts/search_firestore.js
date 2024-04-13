

// Retrieves data where product name matches query
const searchItem = document.getElementById("search-icon");
searchItem.addEventListener("click", async () => {
    try {
        // Get the query from search bar
        var queryValue = document.getElementById("search-field").value;
        var queryUpperCase = queryValue.toUpperCase();
        console.log("Query value: ", queryValue);

        // Execute the Firestore query to search for the item
        const querySnapshot = await db.collection("posts").where("productUpperCase", "==", queryUpperCase).get();
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

