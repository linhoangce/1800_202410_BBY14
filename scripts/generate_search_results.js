// THIS IS FOR FIRESEARCH IMPLEMENTATION, WHICH IS STILL BEING TESTED AND DEVELOPED, NOT YET IMPLEMENTED

// Retrieve search results from query parameters
const searchResults = JSON.parse(decodeURIComponent(window.location.search.split('=')[1]));

// Function to render search results
function renderSearchResults() {
    const postsContainer = document.getElementById('posts-go-here');

    searchResults.forEach((hit) => {
        const cardTemplate = document.getElementById('postCardTemplate').content.cloneNode(true);
        const cardTitle = cardTemplate.querySelector('.card-title');
        const cardFarm = cardTemplate.querySelector('.card-farm');
        const cardText = cardTemplate.querySelector('.card-text');
        const cardImage = cardTemplate.querySelector('.card-image');
        const cardHref = cardTemplate.querySelector('.card-href');

        // Replace placeholders with actual data from the hit
        cardTitle.textContent = hit.fields.find((field) => field.key === 'title')?.value || 'Untitled';
        cardFarm.textContent = hit.fields.find((field) => field.key === 'farm')?.value || '';
        cardText.textContent = hit.fields.find((field) => field.key === 'description')?.value || '';
        cardImage.src = hit.fields.find((field) => field.key === 'image')?.value || '';
        cardHref.href = `eachpost.html?docID=${hit.id}`;

        postsContainer.appendChild(cardTemplate);
    });
}

function hitFields(hit) {
    const allFields = hit.fields.map(field => field.value)

    return allFields;
}