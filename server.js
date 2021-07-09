const express = require('express');
const mongoose = require('mongoose');
const urlModel = require('./models/urlModel');
const TinyUrl = require('tinyurl');

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.use('/public/css', express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await urlModel.find();
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrl', async (req, res) => {

    let shortenUrl;
    await TinyUrl.shorten(`${req.body.inputUrl}`).then((res) => {
        shortenUrl = res;
    }, (err) => {
        console.log(err)
    })

    console.log(shortenUrl);

    await urlModel.create({
        original: req.body.inputUrl,
        short: shortenUrl
    }).then((res) => {
        console.log("success>>>>>", res);
    }, (err) => {
        console.log("errorrr>>>>>>>>", err);
    })

    res.redirect('/');

})

app.listen(process.env.PORT || port, () => {
    console.log(`sever is running on port: ${port}`)
})