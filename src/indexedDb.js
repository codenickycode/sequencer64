let openRequest = indexedDB.open('store', 1);

openRequest.onupgradeneeded = function () {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) {
    db.createObjectStore('localSequences', { keyPath: '_id' });
  }
};

openRequest.onerror = function () {
  console.error('Error', openRequest.error);
};

openRequest.onsuccess = function () {
  console.log('IndexedDB ready');

  let db = openRequest.result;

  const dbSave = (e) => {
    let transaction = db.transaction('localSequences', 'readwrite');

    let book = { id: 'js', price: 10 };

    let request = transaction.objectStore('localSequences').add(book);

    request.onerror = function (event) {
      if (request.error.name == 'ConstraintError') {
        console.log('Sequence already in db');
        event.stopPropagation(); // don't bubble error
      }
      // transaction will abort
    };

    transaction.onabort = function () {
      console.log('IndexedDB Error: ', transaction.error);
    };
  };
  document.addEventListener('dbSave', dbSave);
};
