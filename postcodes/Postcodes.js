const fs = require('fs');
const {pow, sin, cos, atan2, sqrt, round} = require('mathjs');

const PI  = 3.14159265359;

class PostcodeDB {
    
    constructor() {
        var rawdata  = fs.readFileSync('./postcodes/data/data.json');
        this.db = JSON.parse(rawdata);
        console.log('Opening JSON data from file');
    }
    
    _degrees_to_radians(deg) {
        var radian = deg * PI/180;
        return radian;

    }

    _calculate_distance(src_lat, src_lon, dest_lat, dest_lon) {
        `
        Haversine formula for reference
        a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
        c = 2 ⋅ atan2( √a, √(1−a) )
        d = R ⋅ c

        `
        /* 
         * NOTE(jamie): This attempts to compensate for the fact our
         * distances between lat/longs are calc'd roughly as the crow flies.
        */

        const Rm  = 3953.0;
        const Rk  = 6363.0;

        const fudge_factor = 38.0;

        var lat_1 = this._degrees_to_radians(src_lat);
        var lon_1 = this._degrees_to_radians(src_lon);
        var lat_2 = this._degrees_to_radians(dest_lat);
        var lon_2 = this._degrees_to_radians(dest_lon);

        const lat_delta = lat_2 - lat_1;
        const lon_delta = lon_2 - lon_1;
        
        var a = pow((sin(lat_delta/2)), 2) + cos(lat_1) * cos(lat_2) * pow((sin(lon_delta/2)),2);
        var c = 2 * atan2(sqrt(a), sqrt(1-a));
/*
  var x1 = lat2 - lat1;
  var x2 = lon2 - lon1;

  var dLat = toRad(x1);
  var dLon = toRad(x2)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  */
        //var a = sin(lat_delta/2) * sin(lat_delta/2) + cos(lat_1) * cos(lat_2) * sin(lon_delta/2) * sin(lon_delta/2)
        //var c = 2 * atan2(sqrt(a), sqrt(1-a));
        var float_dm = c * Rm;
        var float_dk = c * Rk;

        float_dm += (float_dm / 100 * fudge_factor);
        float_dk += (float_dk / 100 * fudge_factor);

        var dm = round(float_dm);
        console.log("miles away", dm);
        var dk = round(float_dk);

        return(float_dm);
    }

    get_postcodes(postcodes_to_test, radius) {

        // This code needs to be lifted out to client
        var radius = parseInt(radius);
        var prefix = postcodes_to_test.split(" ");
        console.log("prefix", prefix);
        prefix = prefix[0].toUpperCase();

        const sp = this.db.filter((it) => {
            return it.pc === prefix;
        });

        if(sp.length === 0) {
            return [];
        }

        const starting_lat = parseFloat(sp[0].lat);
        const starting_lon = parseFloat(sp[0].lon);
        console.log(prefix, starting_lat, starting_lon);

        let result = [];

        this.db.forEach((it) => {
            let distance_object = {};

            //console.log(it);
            var temp_lat = parseFloat(it.lat);
            var temp_lon = parseFloat(it.lon);
            if (it.pc === 'SE24') {
                console.log(it.lat, it.lon);
            }

            var distance = round(this._calculate_distance(starting_lat, starting_lon, temp_lat, temp_lon));
            if (distance <= radius) {
                distance_object['postcode'] = it.pc;
                distance_object['distance'] = distance;
                result.push(distance_object);
            }
             
        });
       //dd console.log(distance_results);
        console.log(result );
        return result;
    }
}

module.exports = PostcodeDatabase = new PostcodeDB();
/*
    get_postcodes(postcode) {

        const starting_point = this.db.filter((it) => it.pc === postcode);
        console.log(starting_point);

    }
    */