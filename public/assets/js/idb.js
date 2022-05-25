// create a variable to hold db connection
let db;
// open a connection to the IndexedDB database called 'pizza_hunt'
// and set it to the version 1
const request = indexedDB.open("pizza_hunt", 1);

// this event will emit if the database version changes
// non existant to version 1, v1 to v2, etc...
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called 'new pizza',
  // set it to have an auto incrementing primary key of sorts
  db.createObjectStore("new_pizza", { autoIncrement: true });
};

// upon a successful
request.onsuccess = function (event) {
  // when db is successfully created with its object store
  // from onupgradedneeded event above or simply established
  // a connection, save reference to db in global variable
  db = event.target.result;
  // check if app is online, if yes run uploadPizza()
  // function to send all local db data to api
  if (navigator.onLine) {
    // uploadPizza();
  }
};

request.onerror = function (event) {
  // log error
  console.log(event.target.errorCode);
};

// this function will execute if attempt to submit a new pizza
// and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the db with read and write permission
  const transaction = db.transaction(["new_pizza"], "readwrite");
  // access the object store for "new_pizza"
  const pizzaObjectStore = transaction.objectStore("new_pizza");
  // add record to your store with add method
  pizzaObjectStore.add(record);
}
