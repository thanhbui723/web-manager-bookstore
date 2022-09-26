const BookManagementModel = require('../models/bookManagement.M')

const express = require('express'),
    router = express.Router();


router.get('/', (req, res) => {
    console.log('bookmanagement-get');
    BookManagementModel.readAll(function(err, data) {
        res.render('bookManagement', {
            nav: () => 'navbar',
            active: { bookManagement: true },
            bookManagement: data
        });
    });
});


router.post('/', (req, res) => {
    console.log('bookmanagement-post-add');
    console.log(req.body);
    BookManagementModel.Add(req.body, function(err, data) {
        res.redirect('back');
    });
});

router.put('/', (req, res) => {
    console.log('BookManagementModel-put-update');
    console.log(req.body);
    BookManagementModel.update(req.body, function(err, data) {
        res.redirect('back');
    });
});

router.delete('/', (req, res) => {
    console.log('BookManagementModel-delete');
    console.log(req.body);
    BookManagementModel.delete(req.body.MaSach, function(err, data) {
        res.redirect('back');
    });
});
module.exports = router;