var express = require('express')
var app = express()
var bodyParser = require('body-parser');

const Vonage = require('@vonage/server-sdk')

// respond with "hello world" when a GET request is made to the homepage
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let server = app.listen(4000,()=>console.log('robot is up'))

app.post('/call', function (req, res) {
    let data = req.body
    let text = data.lyrics
    let language = "en-US"
    let style = 9
    console.log(data.number)
    if(data.lyrics == null){
        text = data.text
        if (data.language.toLowerCase() == "arabic"){
            language = "ar"
            style= 4
        }
    }
    if (data.gender.toLowerCase() == "female"){
        style = 2
        if (data.language.toLowerCase() == "arabic") style = 7
    }

    const vonage = new Vonage({
        apiKey: 'adda1d4b',
        apiSecret: "OgEfBzgqUxxZ8HfY",
        applicationId: "4320131a-ec2a-4efb-aa6e-71ad99acc703",
        privateKey: "private.key"
    })
    vonage.calls.create({
        to: [{
            type: 'phone',
            number: data.number
        }],
        from: {
            type: 'phone',
            number: '12013814517'
        },
        ncco: [{
            "action": "talk",
            "text": text,
            "language": language,
            "style": style

        }]
    }, (error, response) => {
        if (error) console.error(error)
        if (response) console.log(response)
    })
    return res.send('200')
})