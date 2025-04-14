// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(3000);

const express = require('express')
const app = express();

app.use(express.json());

const users = [{
    name: "John",
    kidneys: [{
        healthy: true
    }]
}];

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i < numberOfKidneys; i ++) {
        if(johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }

     const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
     res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
     })
})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message: "Kidney added"
    })
})

app.put("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    for(let i = 0; i < numberOfKidneys; i ++) {
            johnKidneys[i].healthy = true;
    }

    res.json({});
})

app.delete("/", function(req, res){
    if(isThereAnUnhealthyKidney()) {
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i ++) {
            if(users[0].kidneys[i].healthy) {
                newKidneys.push(users[0].kidneys[i])
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            message: "Unhealthy kidneys deleted"
        })
    }
    else {
        res.status(411).json({
            message: "No unhealthy kidneys to delete"
        });
    }
    
})

function isThereAnUnhealthyKidney() {
    let  atLeastOneUnhealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length; i ++) {
        if(!users[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(3000)