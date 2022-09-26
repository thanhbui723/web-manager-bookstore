const employeeModel= require('../models/employee.M')

const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    console.log('employee-get');
    employeeModel.readAll(function(err, data){
        res.render('employee', {
            nav: () => 'navbar',
            active: { employee: true },
            employees: data
        });
    });
});


router.post('/', (req, res) => {
    console.log('employee-post');
    console.log(req.body);
    employeeModel.create(req.body, function(err, data){
        res.redirect('back');
    });
});

router.put('/', (req, res) => {
    console.log('employee-put');
    console.log(req.body);
    employeeModel.update(req.body, function(err, data){
        res.redirect('back');
    });
});

router.delete('/',(req,res) =>{
    console.log('employee-delete');
    console.log(req.body);
    employeeModel.delete(req.body.MaNV, function(err, data){
        res.redirect('back');
    });
});

module.exports = router;