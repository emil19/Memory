var axios = require('axios');


module.exports = class FlickrRequest {
  constructor() {

  }

  send(options) {
    var method = options.search === "" ?
      'flickr.interestingness.getList' : 'flickr.photos.search';

    return new Promise((resolve, reject) => {

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

        var res = response;
        console.log(response);

        var urlArray = response.data.photos.photo.map((p) => {
          return(
            `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
          );
        });

        resolve(urlArray);

      })
      .catch(function(error){
        console.log(error);
        reject(error);
      });
    });
  }
};
