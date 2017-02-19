var axios = require('axios');


module.exports = class FlickrRequest {

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
        if (response.data.photos.total < options.count)
          reject({
            message: 'Not enough images found'
          });
        else
          resolve(response.data.photos.photo.map((p) =>
            `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
          ));
      })
      .catch(function(error) {
        let errorMessage;
        if (error.response)
          errorMessage = error.response.status;
        else
          errorMessage = error.message;
        reject({
          message: errorMessage + ""
        });
      });
    });
  }
};
