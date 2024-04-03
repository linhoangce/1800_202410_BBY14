const postRef = db.collection("posts");

const titleInput = document.querySelector("#title");
const farmInput = document.querySelector("#farm");
const categoryInput = document.querySelector("#create-categories");
const productInput = document.querySelector("#product-type");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const descriptionInput = document.querySelector("#description");
const imageInput = document.querySelector("#files");
const postButton = document.querySelector("#post");

async function createPost(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add(data);
        console.log("docRef: ", docRef.id);
        console.log("Document written with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}


postButton.addEventListener("click", async () => {
    const title = titleInput.value;
    const titleUpperCase = title.toUpperCase();
    const farm = farmInput.value;
    const farmUpperCase = farm.toUpperCase();
    const category = categoryInput.value;
    const categoryUpperCase = category.toUpperCase();
    const product = productInput.value;
    const productUpperCase = product.toUpperCase();
    const price = priceInput.value;
    const quantity = quantityInput.value;
    const description = descriptionInput.value;
    const descriptionUpperCase = description.toUpperCase();
    const img = imageInput.value;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Update Firestore document
    try {
    const docId = await createPost("posts", {title, titleUpperCase, farm, farmUpperCase, category, categoryUpperCase, product, productUpperCasse, price, quantity, description, descriptionUpperCase, img, timestamp})
        
            console.log("Document succesfully updated!", docId);
            window.location.href = `eachpost.html?docID=${docId}`;
    }
        catch(error) {
            console.error("Error updating document:", error);
        }
});

