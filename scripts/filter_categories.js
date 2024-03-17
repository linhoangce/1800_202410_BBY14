const vegetablesClicked = document.querySelector("#veggies-category");
vegetablesClicked.addEventListener("click", async () => {
    try {
        
        // Execute the Firestore query to filter by categories
        const querySnapshot = await db.collection("posts").where("category", "==", "vegetables").get();

        // Create an array to store filtered data
        const filteredData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        // Store the filtered data using local storage
        localStorage.setItem("filteredVegetablesData", JSON.stringify(filteredData));

        // Redirect to vegetables.html
        window.location.href = "vegetables.html";

    } catch (error) {
        console.log("Error filtering documents: ", error);
    }
});

const fruitsClicked = document.querySelector("#fruits-category");
fruitsClicked.addEventListener("click", async () => {
    try {
        
        // Execute the Firestore query to filter by categories
        const querySnapshot = await db.collection("posts").where("category", "==", "fruits").get();

        // Create an array to store filtered data
        const filteredData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        // Store the filtered data using local storage
        localStorage.setItem("filteredFruitsData", JSON.stringify(filteredData));

        // Redirect to fruits.html
        window.location.href = "fruits.html";

    } catch (error) {
        console.log("Error filtering documents: ", error);
    }
});

const dairyClicked = document.querySelector("#dairy-category");
dairyClicked.addEventListener("click", async () => {
    try {
        
        // Execute the Firestore query to filter by categories
        const querySnapshot = await db.collection("posts").where("category", "==", "dairy").get();

        // Create an array to store filtered data
        const filteredData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        // Store the filtered data using local storage
        localStorage.setItem("filteredDairyData", JSON.stringify(filteredData));

        // Redirect to fruits.html
        window.location.href = "dairy.html";

    } catch (error) {
        console.log("Error filtering documents: ", error);
    }
});

const nutsClicked = document.querySelector("#nuts-category");
dairyClicked.addEventListener("click", async () => {
    try {
        
        // Execute the Firestore query to filter by categories
        const querySnapshot = await db.collection("posts").where("category", "==", "nuts").get();

        // Create an array to store filtered data
        const filteredData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        // Store the filtered data using local storage
        localStorage.setItem("filteredNutsData", JSON.stringify(filteredData));

        // Redirect to fruits.html
        window.location.href = "nuts.html";

    } catch (error) {
        console.log("Error filtering documents: ", error);
    }
});

const plantsClicked = document.querySelector("#plants-category");
plantsClicked.addEventListener("click", async () => {
    try {
        
        // Execute the Firestore query to filter by categories
        const querySnapshot = await db.collection("posts").where("category", "==", "plants").get();

        // Create an array to store filtered data
        const filteredData = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        // Store the filtered data using local storage
        localStorage.setItem("filteredPlantsData", JSON.stringify(filteredData));

        // Redirect to fruits.html
        window.location.href = "plants.html";

    } catch (error) {
        console.log("Error filtering documents: ", error);
    }
});