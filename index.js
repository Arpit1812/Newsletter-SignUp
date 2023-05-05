const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const firstname = req.body.fName
    const lastname = req.body.lName
    const email = req.body.email

    console.log(firstname, lastname, email)

    const data = {
        members: [ 
     {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstname,
            LNAME: lastname
        }
    
     }
    
    ]
    };
     
    const jsonData = JSON.stringify(data)

    const url = "https://us12.api.mailchimp.com/3.0/lists/5be2350229"

    const options = {
        method: "POST",
        auth: "Arpit:5fd9885afd42aed57cce82a871dd3ff8-us12"
    }
    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

     response.on("data", function(data){
        console.log(JSON.parse(data));
     })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000, () =>{
    console.log("server is listing on the port of 3000")
})

//API KEY --> 5fd9885afd42aed57cce82a871dd3ff8-us12

//List ID --> 5be2350229