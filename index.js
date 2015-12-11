// Description:
//   A way to interact with the Flickr Images API.
//
// Configuration:
//   BROBBOT_FLICKR_IMAGE_KEY - the API key to pass to the flickr API
//   BROBBOT_FLICKR_IMAGE_SIZE - the size of images to return (see https://www.flickr.com/services/api/misc.urls.html)

var KEY = process.env.BROBBOT_FLICKR_IMAGE_KEY;
var SIZE = process.env.BROBBOT_FLICKR_IMAGE_SIZE || 'medium';

var sizes = {
  small: 'm',
  xsmall: 's',
  thumb: 't',
  medium: 'z',
  large: 'b',
  xlarge: 'k',
  original: 'o'
};

var sizeToken = sizes[SIZE] || sizes.medium;

function photoUrl (photo) {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + sizeToken + '.jpg'
}

module.exports = function(robot) {
  robot.helpCommand("brobbot image [me] `query`", "searches flickr for `query` and returns 1st result's URL.");

  robot.respond(/^(image|img)( me)? (.*)/i, function(msg) {
    var query = {
      api_key: KEY,
      per_page: 20,
      format: 'json',
      media: 'photo',
      method: 'flickr.photos.search',
      nojsoncallback: 1,
      text: msg.match[3]
    };
    msg.http('https://api.flickr.com/services/rest')
      .query(query)
      .get()(function(err, res, body) {
        if (!err) {
          try {
            msg.send(photoUrl(msg.random(JSON.parse(body).photos.photo)));
          }
          catch (error) {
            err = error;
          }
        }
        if (err) {
          robot.logger.error(err);
        }
      });
  });
};
