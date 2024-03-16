// Import the necessary modules
import { Client, IndexService, PutDocRequest, DeleteDocRequest } from './firesearch.gen';
const firesearch = {}
firesearch.Client = function (host) {
    this.host = host || ''
    this.getHeaders = function () {
        return {}
    }
    this.fetch = null
}

// Create a Firesearch client
const client = new firesearch.Client()
client.host = 'https://firesearch-hk4xe7xdoa-uc.a.run.app';
client.apiKey = '';

firesearch.IndexService = function (client) {
    this.client = client
}
// Initialize the IndexService
const indexService = new firesearch.IndexService(client)

// Get doc ID from firestore
const firestoreDocRef = db.collection("posts");

firestoreDocRef.get()
    .then(doc => {
        if (doc.exists) {
            const docData = doc.data();
            const docId = doc.id; // Get the document ID

            // Automatically construct the searchFields array
            const searchFields = Object.keys(docData).map(key => ({
                key: key,
                value: docData[key]
            }));

            // Create the Firesearch document
            const indexPath = "posts";
            const firesearchDoc = {
                id: docId,
                searchFields: searchFields
            };

            // Index the document in Firesearch

        } else {
            console.log("Document does not exist");
        }
    })
    .catch(error => {
        console.log(`Error fetching document:` + error);
    });


// const putReq = new PutDocRequest({ indexPath, doc });

// indexService.putDoc(putReq)
//     .then(response => {
//         console.log(`Document indexed successfully: ${docId}`);
//     })
//     .catch(error => {
//         console.error(`Error indexing document: ${error.message}`);
//     });

// // Example: Delete a document
// const deleteReq = new DeleteDocRequest({ indexPath, id: docId });
// indexService.deleteDoc(deleteReq)
//     .then(response => {
//         console.log(`Document deleted successfully: ${docId}`);
//     })
//     .catch(error => {
//         console.error(`Error deleting document: ${error.message}`);
//     });




//     const searchString = 'Sample'; // Example search query
// const query = client.firestore().collection('posts')
//   .orderBy('title')
//   .startAt(searchString)
//   .endAt(searchString + '\uf8ff');

// query.get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(`Found post: ${doc.id}`);
//     });
//   })
//   .catch(error => {
//     console.error(`Error searching posts: ${error.message}`);
//   });
