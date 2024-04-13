// This is for Firesearch implementation, which is not yet implemented on the app

const admin = require('firebase-admin');
admin.initializeApp();

const Firesearch = require('firesearch');

const config = {
    collectionName: 'posts', 
    indexProperties: ['title', 'farm', 'product', 'quantity', 'price', 'description'], // Fields to include in the index
    resultantProperties: ['title', 'farm', 'product', 'quantity', 'price', 'description'], // Fields to return in search results
};

const firesearch = new Firesearch(admin.firestore(), config);

firesearch.createIndex()
    .then((response) => {
        console.log('Index created successfully:', response);
    })
    .catch((error) => {
        console.error('Error creating index:', error);
    });