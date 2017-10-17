/**
 * GET /
 * Book page.
 */
exports.getBook = (req, res) => {
  res.render('book', {
    title: 'Book',
  });
};
