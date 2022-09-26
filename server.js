var express = require('express');
var app = express();

var port =  process.env.PORT || 3000;
var hdbs = require('express-handlebars');
var path = require("path");


const hbs = hdbs.create({
    defaultLayout: false,
});

app.use(express.urlencoded({
    extends: true,
}));
app.use(express.json());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', "./views");
app.use(express.static(path.join(__dirname, 'public')));
hbs.handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));
 
// Hải Đăng thêm
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
// Thêm

app.use('/', require('./controllers/home.C'));
app.use('/invoice', require('./controllers/invoice.C'));
app.use('/report', require('./controllers/report.C'));
app.use('/bookLookUp', require('./controllers/bookLookUp.C'));


app.listen(port, ()=> console.log(`server is listening on port: ${port}`));