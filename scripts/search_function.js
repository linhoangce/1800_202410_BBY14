

// document.addEventListener("DOMContentLoaded", () => {


//     const searchButton = document.getElementById("search-btn");

//     // Attach a click event listener
//     searchButton.addEventListener('click', async () => {
//         try {
//             // First, add a new document using addDoc()
//             await addDoc();

//             // Then, perform the search using performSearch()
//             performSearch();
//             console.log("button clicked");
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     });
// });

// const client = new firesearch.Client();
// client.host = 'https://firesearch-hk4xe7xdoa-uc.a.run.app';
// client.fetch = window.fetch.bind(window);
// client.apiKey = "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo";

// /*
//   Use the firesearch.IndexService to add documents 
//   and perform searches on indexes.
// */
// const indexService = new firesearch.IndexService(client);


// async function addDoc() {
//     try {
//         const postsRef = db.collection("posts");
//         console.log(postsRef);
//         await postsRef.get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 const docId = doc.id;
//                 console.log(docId);
                
//                 const input = {
//                     indexPath: "firesearch/indexes/posts",
//                     doc: {
//                         id: docId,
//                         searchFields: [
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "title",
//                                 value: doc.data().title,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "farm",
//                                 value: doc.data().farm,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "category",
//                                 value: doc.data().category,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "product",
//                                 value: doc.data().product,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "price",
//                                 value: doc.data().price,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "quantity",
//                                 value: doc.data().quantity,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "description",
//                                 value: doc.data().description,
//                                 store: true,
//                             },
//                             {
//                                 accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//                                 key: "image",
//                                 value: doc.data().img,
//                                 store: true,
//                             }
//                         ],
//                     },
//                 };
//                 indexService.putDoc(input)
//                     .then((response) => {
//                         console.log("Write successfully to Firesearch server.");
//                     })
//                     .catch((e) => {
//                         console.log('ERROR writing to Firesearch server: ' + e);
//                     });
//             });
//         });
//     } catch (error) {
//         console.error("Error adding document:", error);
//     }
// }

// let input
// function performSearch() {

//     const q = document.getElementById('q').value;
//     console.log(q);
//     if (q === '') {
//         document.getElementById('q').focus();
//         return;
//     }
//     const indexPath = "firesearch/indexes/posts";
//     input = {
//         query: {
//             indexPath: indexPath,
//             accessKey: "AIzaSyCYZHuxwD2nETWwgc6eH11uXmlKlx2GyHo",
//             limit: 5,
//             text: q,
//         }
//     };

//     window.location.href = `search_results.html?results=${encodeURIComponent(JSON.stringify(input))}`;
// };





