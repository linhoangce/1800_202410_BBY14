
const postRef = db.collection("posts");

const titleInput = document.querySelector("#title");
const farmInput = document.querySelector("#farm");
const productInput = document.querySelector("#product-type");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const descriptionInput = document.querySelector("#description");
const imageInput = document.querySelector("#files");
const postButton = document.querySelector("#post");

async function createPost(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).doc().set(data);
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}


postButton.addEventListener("click", () => {
    const title = titleInput.value;
    const farm = farmInput.value;
    const product = productInput.value;
    const price = priceInput.value;
    const quantity = quantityInput.value;
    const description = descriptionInput.value;
    const img = imageInput.value;

    // Update Firestore document
    createPost("posts", {title, farm, product, price, quantity, description, img})
        .then(() => {
            console.log("Document succesfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document:", error);
        });
});

