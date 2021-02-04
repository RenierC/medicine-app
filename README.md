## Pharmacy quotation app

This app was created using an Ecommerce-like pattern with ⚛ React's hooks and context API in conjunctions with 🔥Firebases's Firestore to store the prices and data, you can check it live here.

👉🏼 https://medicinas-df535.web.app/

### Case Study

This particular network of pharmacies has a goverment subsidiation in which their users should pay with low denominations bank notes.

#### The problem

Users often don't know how much cash they need to have which causes long lines at checkout and conflicts with cashiers since they often can't give change with smaller bills. 

#### The solution

This app allows users use a familiar ecommerce model to check their products and prices, complete with sorting and table view to generate quotation in which they know exactly how much cash to bring at checkout

### ⚠ To run using your own db 

Add a file named firebase.js to the src with the following structure

```javascript
const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

const db = firebaseApp.firestore();

export default db;
```

And your own api keys from firebase.

*The database has the structure of medicine > uniqueId > {precio, presentacion, producto }*
 
### `npm install`

### `npm run`

