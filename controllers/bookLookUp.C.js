const express = require('express'),
      router = express.Router();
const booksM = require('../models/books.M');

router.get('/search', async (req, res) => {
    var books = await booksM.getByKeyword(req.query.keyword);
    console.log(req.query);
    res.render('bookLookUp', {
        nav: () => 'navbar',
        books: books,
        active: { bookLookUp: true }
    });
});
module.exports = router;