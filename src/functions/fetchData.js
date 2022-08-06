// This function receives endPoint ,lastAndIsNeededand and urlParams
// urlParams is an object. Inside it each key is a parameter and its value is that parameter's value
// then makes an API query string and fetches data from the server
// at last it returns a promise
export const fetchData = (endPoint, urlParams) => {
  return new Promise((resolve, reject) => {
    let url = // stitch the params together to make a url
      `${endPoint}` +
      `${Object.keys(urlParams).reduce((accumulator, key) => {
        return accumulator + `${key}=${urlParams[key]}&`;
      }, "")}`;
    if (url[url.length - 1] === "&") {
      //if las char is "&"
      url = url.slice(0, url.length - 1); //delete the last "&"
    }

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          // if there is error
          response.json().then((jsonData) => {
            //parse the data from stream
            //jsonData is the data parsed from the stream
            reject(
              `Server responded with error.
            Status Code=${response.status}  ${response.statusText}.
            Error Message=${jsonData.message}
            `
            );
          });
        }
        if (response.status == 200) {
          // if ok
          response
            .json() // parse the stream to get the jasonData
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch(() => {
              reject(
                `respons status was 200 but error occured in parsing the Readable Stream`
              );
            });
        }
      })
      .catch(() => {
        //this catch is for the fetch
        reject("Network Error");
      });
  });
};
