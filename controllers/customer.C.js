const customerModel= require('../models/customer.M')

const express = require('express'),
      router = express.Router();


router.get('/', (req, res) => {
    console.log('customer-get');
    customerModel.readAll(function(err, data){
        res.render('customer', {
            nav: () => 'navbar',
            active: { customer: true },
            customers: data
        });
    });
});


router.post('/', (req, res) => {
    console.log('customer-post');
    console.log(req.body);
    customerModel.create(req.body, function(err, data){
        res.redirect('back');
    });
});

router.put('/', (req, res) => {
    console.log('customer-put');
    console.log(req.body);
    customerModel.update(req.body, function(err, data){
        res.redirect('back');
    });
});

router.delete('/',(req,res) =>{
    console.log('customer-delete');
    console.log(req.body);
    customerModel.delete(req.body.MaKH, function(err, data){
        res.redirect('back');
    });
});

router.post('/invoice',(req,res) => {
    console.log('customer-post-invoice');
    console.log(req.body);
    customerModel.invoice(req.body, function(err, state, data){
        res.redirect('back');
    });
});

module.exports = router;