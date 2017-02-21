// axios är ett bibliotek som förenklar http requests
var axios = require('axios');

// skulle kunna vara en funktion istället, men jag hade planer att
// utöka denna som aldrig blev av
module.exports = class FlickrRequest {
  send(options) {

    // sätter sök eller topplista beroende på om man har en sökterm
    var method = !options.search || options.search === "" ?
      'flickr.interestingness.getList' : 'flickr.photos.search';

    // en promise gör så man kan göra .then och .catch på en
    // funktion för att göra async lättare och finare.
    return new Promise((resolve, reject) => {
      // skickar iväg en http get request till flickr
      axios.get('https://api.flickr.com/services/rest/',{
        params: {
          method: method,
          format: 'json',
          nojsoncallback: '1',
          api_key: '182c38c67c13de0148a5f1b7d6240ed9',
          content_type: 1,
          sort: 'relevance',
          text: options.search,
          per_page: options.count,
        }
      })
      .then((response) => {
        if (response.data.photos.total < options.count)
          // skickar error om det inte finns tillräckligt med kort
          // i svaret
          reject({
            message: 'Not enough images found'
          });
        else
          // om allt gick bra skickar den tillbaka en array av
          // länkar till bilder
          resolve(response.data.photos.photo.map((p) =>
            `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
          ));
      })
      .catch(function(error) {
        // skapar ett passande error om något går fel med apin
        // eller nätverket
        let errorMessage;
        if (error.response)
          errorMessage = error.response.status;
        else
          errorMessage = error.message;
        reject({
          message: errorMessage + "" // datatypen ska vara string
        });
      });
    });
  }
};
