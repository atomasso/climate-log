import axios from 'axios';

const url ="http://climatedataapi.worldbank.org/climateweb/rest/v1/country";

class APIService {
  // get data from the public API
  static fetchData(country, start, end, periodType, dataType) {
    const fullURL = `${url}/${periodType}/${dataType}/${start}/${end}/${country}`;
    // axios.get(fullURL)
    // .then(response => {
    //   return response.data;
    // }).catch(err => {
    //   return err;
    // });
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(fullURL);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default APIService;