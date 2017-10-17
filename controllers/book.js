const request = require('request');
const log4js = require('log4js');

const logger = log4js.getLogger('book');

/**
 * GET /
 * Book page.
 */
exports.getBook = (req, res) => {
  // request.post('http://www.google', { json: { key: 'value' } }, (error, response, body) => {
  //   if (!error) {
  //     console.log(body);
  //   } else {
  //     console.log(error);
  //   }
  // });

  request.get('http://google.com/').on('response', (response) => {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']); // 'image/png'
    logger.debug(response);
  });

  res.render('book', {
    title: 'Book',
  });
};
