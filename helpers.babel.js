let get = (url) => {
  let promise = new Promise((resolve, reject) => {
    let client = new XMLHttpRequest();

    client.open('GET', url);
    client.send();

    client.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    client.onerror = function() {
      reject(this.statusText);
    };
  });

  return promise;
};

let getMultiple = (ids, type) => {
  let promises = ids.map(id => {
    return get(StaticURL + type + '/' + id);
  });
  
  return Promise.all(promises);
}

let idFromUrl = (url, type) => {
  return url.split('/' + type + '/')[1][0];
}
