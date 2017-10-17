const request = require('request').defaults({ jar: true });
const log4js = require('log4js');
const cheerio = require('cheerio');

const logger = log4js.getLogger('book');

const rootUrl = 'https://www.myrta.com';
const loginPageUrl =
  'https://www.myrta.com/wps/portal/extvp/myrta/licence/tbs/tbs-login/!ut/p/b1/hc_LkpswEAXQb_EHTAkJAWbJGwkRBMbYsKFgKuYxvAwE7Pn6eFJZZJOkd7fr1O1qkIEUKlhFEEFRBFeQDcXWVMXajEPRfeVMzgXX4skZKfAoSqZAbEPRYcChYEBweZH0i_xlNOH_DdkvQrnFfeYeYeCfdEHDHEX-yRODI_oN_nEifQHljwaivtaYGRExfeRQBJJhnPvXPzG42u-Vao5aZWpl6KhWau95JfejcZH57WzTN607S9s2OxG2DYn-cO_yJdvrh3isv6ms6O-uQ8ugcD_mRMQB4ikbWkIeW2H0PIr7PhP2tZa0TwIoyMpx_NDi78vKxqoZQNK-74q5kN3UzPAuxlTxn4lFPCmEF71jXvcICZOevDSuujIvmrITX5PVYGkXrDBhGNbWXY23VHnWe0fHpLSuU7g1ONaD2y3JIBfhhKTcbrdILgXPogaa67ZlxTTFFAe5FC4pwcmnV-DGHKNpHwScOxEqmvBwAH1W3068Z1J1OPwEP4fxdQ!!/';

/**
 * GET /
 * Book page.
 */
exports.getBook = (req, res) => {
  // 1. Load login page
  request(
    {
      method: 'GET',
      uri: loginPageUrl,
      proxy: 'http://127.0.0.1:8888',
    },
    (error, response, body) => {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      // logger.debug(body);
      const $loginPage = cheerio.load(body, {
        xmlMode: true,
        decodeEntities: false,
      });

      const loginFormAction = $loginPage('form#customerValidationBean').attr('action');
      const loginFormInputFieldName = $loginPage('input#inputField1').attr('name');
      const loginFormInputFieldValue = $loginPage('input#inputField1').attr('value');
      console.log(loginFormAction);

      // 2. Submit userInfo to login
      request.post(
        rootUrl + loginFormAction,
        {
          json: {
            loginGroup: 'nologin',
            surname: 'YANG',
            cardNo: '22410368',
            customerNo: '',
            cardStockNo: '55152882',
            actionInvoked: false,
            [loginFormInputFieldName]: loginFormInputFieldValue,
          },
        },
        (error, response, body) => {
          // 3. Load Step1: Choose a test
          console.log(response.headers.location);
          request(response.headers.location, (error, response, body) => {
            logger.debug(response);
            if (error) {
              console.log('error', error);
              return true;
            }
            // res.send(response.body);
            res.send('HELLO');

            // console.log(response.headers.location);
            // request(response.headers.location, (error, response, body) => {
            //   const $step1Page = cheerio.load(body, {
            //     xmlMode: true,
            //     decodeEntities: false,
            //   });
            //   const step1FormAction = $step1Page('form#rms_testGroupWrapper').attr('action');
            //   console.log(step1FormAction);
            // });
          });
          if (!error) {
            console.log('body', body);
          } else {
            console.log('error', error);
          }
        }
      );
    }
  );

  // res.render('book', {
  //   title: 'Book',
  // });
};
