const regulationModel= require('../models/regulation.M')

const express = require('express'),
      router = express.Router();


router.get('/', (req, res) => {
    console.log('regulation-get');
    regulationModel.readAll(function(err, data){
        res.render('regulation', {
            nav: () => 'navbar',
            active: { regulation: true },
            regulations: data
        });
    });
});

router.post('/', (req, res) => {
    console.log('regulation-post');
    console.log(req.body);
    regulationModel.create(req.body, function(err, data){
        res.redirect('back');
    });
});

router.put('/', (req, res) => {
    console.log('regulation-put');
    console.log(req.body);
    regulationModel.update(req.body, function(err, data){
        res.redirect('back');
    });
});

router.delete('/',(req,res) =>{
    console.log('regulation-delete');
    console.log(req.body);
    regulationModel.delete(req.body.STT, function(err, data){
        res.redirect('back');
    });
});

module.exports = router;