const paymentModel= require('../models/payment.M')

const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    console.log('payment-get');
    paymentModel.readAllCustomer(function(err, data){
        res.render('payment', {
            nav: () => 'navbar',
            active: { payment: true },
            payments: data
        });
    });
});

router.post('/', (req, res) => {
    console.log('payment-post');
    console.log(req.body);
    paymentModel.create(req.body, function(err, state, data){
        res.redirect('back');
    });
});


module.exports = router;