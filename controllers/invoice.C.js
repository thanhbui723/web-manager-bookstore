const booksM = require('../models/books.M');
const customersM = require('../models/customer.M');
const invoicesM = require('../models/invoices.M');
const invoiceDetailM = require('../models/invoiceDetail.M');
const paymentM = require('../models/payment.M');
const debtM = require('../models/debt.M');
const express = require('express'),
    router = express.Router();

router.post('/addBook', async (req, res) => {
    const booksInput = [];
    for (let i = 0; i < req.body.amount.length; i++) {
        if (parseInt(req.body.amount[i]) > 0) {
            booksInput.push({
                id: req.body.id[i],
                name: req.body.name[i],
                author: req.body.author[i],
                type: req.body.type[i],
                price: parseInt(req.body.price[i]),
                amount: parseInt(req.body.amount[i]),
                rest: req.body.rest[i]
            });
        }
    }
    sumPrice = 0;
    booksInput.forEach((b) => {
        sumPrice += b.price * b.amount;
    })
    var data = await booksM.all();
    res.render('invoice', {
        nav: () => 'navbar',
        active: { invoice: true },
        booksInput: booksInput,
        books: data,
        sumPrice: sumPrice.toLocaleString()
    });
});
router.post('/debt', async (req, res) => {
    const booksInput = [];
    console.log(req.body);
    if (req.body.amount) {
        if (Array.isArray(req.body.amount)) {
            for (let i = 0; i < req.body.amount.length; i++) {
                if (req.body.amount[i]) {
                    booksInput.push({
                        id: req.body.id[i],
                        name: req.body.name[i],
                        author: req.body.author[i],
                        type: req.body.type[i],
                        price: parseInt(req.body.price[i]),
                        amount: parseInt(req.body.amount[i]),
                        rest: parseInt(req.body.rest[i])
                    });
                }
            }
        }
        else {
            booksInput.push({
                id: req.body.id,
                name: req.body.name,
                author: req.body.author,
                type: req.body.type,
                price: parseInt(req.body.price),
                amount: parseInt(req.body.amount),
                rest: parseInt(req.body.rest)
            });
        }
        sumPrice = 0;
        console.log(booksInput);
        booksInput.forEach((b) => {
            if (b.amount)
                sumPrice += b.price * b.amount;
        })
        var customerId = await customersM.get(req.body.customerName, req.body.customerAddress, req.body.customerPhoneNumber, req.body.customerEmail)
        if (!customerId)
            customerId = await customersM.add(req.body.customerName, req.body.customerAddress, req.body.customerPhoneNumber, req.body.customerEmail, sumPrice);
        else
            await customersM.updateDebt(customerId, sumPrice);
        var invoiceId = await invoicesM.add(customerId, sumPrice, new Date().toLocaleDateString("en-US"));
        booksInput.forEach(async (b) => {
            await booksM.update(b.id, b.rest - b.amount);
            await invoiceDetailM.add(invoiceId, b.id, b.amount);
        })
        //await paymentM.add(invoiceId, sumPrice, new Date().toLocaleDateString("en-US"))
        await debtM.add(invoiceId, sumPrice, new Date().toLocaleDateString("en-US"))
        console.log(booksInput);
    }
    res.redirect('/invoice');
});
router.post('/pay', async (req, res) => {
    //name, address, phoneNumber, email, debt
    const booksInput = [];
    console.log(req.body);
    if (req.body.amount) {
        if (Array.isArray(req.body.amount)) {
            for (let i = 0; i < req.body.amount.length; i++) {
                if (req.body.amount[i]) {
                    booksInput.push({
                        id: req.body.id[i],
                        name: req.body.name[i],
                        author: req.body.author[i],
                        type: req.body.type[i],
                        price: parseInt(req.body.price[i]),
                        amount: parseInt(req.body.amount[i]),
                        rest: parseInt(req.body.rest[i])
                    });
                }
            }
        }
        else {
            booksInput.push({
                id: req.body.id,
                name: req.body.name,
                author: req.body.author,
                type: req.body.type,
                price: parseInt(req.body.price),
                amount: parseInt(req.body.amount),
                rest: parseInt(req.body.rest)
            });
        }
        sumPrice = 0;
        console.log(booksInput);
        booksInput.forEach((b) => {
            if (b.amount)
                sumPrice += b.price * b.amount;
        })
        var customerId = await customersM.get(req.body.customerName, req.body.customerAddress, req.body.customerPhoneNumber, req.body.customerEmail)
        if (!customerId)
            customerId = await customersM.add(req.body.customerName, req.body.customerAddress, req.body.customerPhoneNumber, req.body.customerEmail, 0);
        var invoiceId = await invoicesM.add(customerId, sumPrice, new Date().toLocaleDateString("en-US"));
        booksInput.forEach(async (b) => {
            await booksM.update(b.id, b.rest - b.amount);
            await invoiceDetailM.add(invoiceId, b.id, b.amount);
        })
        await paymentM.add(invoiceId, sumPrice, new Date().toLocaleDateString("en-US"))
        console.log(booksInput);
    }
    res.redirect('/invoice');
});
module.exports = router;