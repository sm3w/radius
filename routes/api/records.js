const express = require('express');
const router = express.Router();

// Record model
const Record = require('../../models/Records');

// Postcode Database
const Postcoder = require('../../postcodes/Postcodes');
// Root directory = /api/records

// @route GET api/records
// @ desc GET matching records
// @access Public (for now)
/*
router.get('/', (req, res) => {
    res.json('Records');
});
*/

//{ 'title': { $regex:  request.query.val, $options: 'i'} }
router.post('/', (req, res) => {

    // NOTE(jamie): @WARNING - User input, sanitize.
    let pc_result = Postcoder.get_postcodes(req.body.postcode, req.body.radius);
    
    // We need to create regexs from every postcode we got back from our radius search.
    let r = []
    if (pc_result.length !== 0) {
        pc_result.forEach((postcode) => {
            var regex = new RegExp('^' + postcode);
            r.push(regex)
        });
         
        /* .find is an async function - The { $in: r} is perl regex syntax inside a mongo query, which will run a OR clause query against, in this case
            postcode, using all members of array 'r'. 
        */
        Record.find({ postcode: { $in: r } })
            .then(record => res.json(record))
            .catch(err => console.log(err));
    } else {
        res.sendStatus(400);
        //res.json({});
    }
});

module.exports = router;