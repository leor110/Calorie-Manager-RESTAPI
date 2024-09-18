var express = require('express');
var router = express.Router();

/* GET /about page that returns developer information in JSON */
router.get('/', function(req, res, next) {
    // Array of developer objects as per the project requirements
    const developers = [
        {
            firstname: "Shay",
            lastname: "Shuve",
            id: 206842585,
            email: "shayshov@gmail.com"
        },
        {
            firstname: "Leor",
            lastname: "Marshall",
            id: 315421990,
            email: "mleor110@gmail.com"
        },
        {
            firstname: "tal",
            lastname: "zechariya",
            id: 318686532,
            email: "tal.zechariya@gmail.com"
        }
    ];

    // Respond with JSON array of developers
    res.json(developers);
});

module.exports = router;
