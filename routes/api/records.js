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

const create_new_record = (distance, record) => {

};


//{ 'title': { $regex:  request.query.val, $options: 'i'} }
router.post('/', (req, res) => {

    // NOTE(jamie): @WARNING - User input, sanitize.
    let postcode_and_distance = Postcoder.get_postcodes(req.body.postcode, req.body.radius);
    console.log(postcode_and_distance);
    
    // We need to create regexs from every postcode we got back from our radius search.
    let r = []
    if (postcode_and_distance.length !== 0) {
        postcode_and_distance.forEach((postcode_record) => {
            var regex = new RegExp('^' + postcode_record.postcode);
            r.push(regex);
        });
         
        /* .find is an async function - The { $in: r} is perl regex syntax inside a mongo query, which will run a OR clause query against, in this case
            postcode, using all members of array 'r'. 
        */
        Record.find({ postcode: { $in: r } })
            .then((record) => {
                var results = []
                record.forEach((member) => {
                    postcode_and_distance.forEach((pad) => {
                        var prefix = member.postcode.split(" ")[0];
                        if(pad.postcode === prefix) {
                            results.push([member, pad.distance]);
                        }
                    })
                }) 
                //const final = record.filter(it => it.postcode.substring(0,3) in ['HU8']);
                var last = [];
                results.sort((a, b) => {
                   return a[1] > b[1];
                })
                console.log(results);
                res.json(results);
                })
            .catch(err => console.log(err));
    } else {
        res.sendStatus(400);
        //res.json({});
    }
});

module.exports = router;