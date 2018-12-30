const express = require('express');
const router = express.Router();

//const { Pool, Client } = require('pg')
/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sensors',
    password: '2500125002',
    port: 5432,
  })
*/

router.post('/testData', function (req, res) {
    console.log(req.body)

    return res.status(200).json({
        status: 'success',
    });
});

router.post('/recordMain', function (req, res) {
    console.log(req.body)
    pool.query('WITH time1 AS ('
    + 'INSERT INTO mainP1(time, activewatt, reactivepower, apparentpower)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3)'
    + 'RETURNING time'
    + ')'
    + '  , time2 AS('
    + '    INSERT INTO mainP2(time,activewatt, reactivepower, apparentpower)'
    + 'VALUES((select time from time1), $5, $6, $7)'
    + ')'
    + 'INSERT INTO mainP3(time, activewatt, reactivepower, apparentpower)'
    + 'VALUES((select time from time1),$8, $9, $10);',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),
    Math.max(req.body.ActiveWatts[2],0), Math.max(req.body.ReactivePower[2],0), Math.max(req.body.ApparentPower[2],0),
    Math.max(req.body.ActiveWatts[3],0), Math.max(req.body.ReactivePower[3],0), Math.max(req.body.ApparentPower[3],0)])
    .then(res => {
        return res.status(200).json({
            status: 'success',
        });
    })
    .catch(e => setImmediate(() => {     
        return res.status(500).json({
        status: 'error',
    });}))
});

router.post('/recordAC', function (req, res) {
    console.log(req.body)
    pool.query('INSERT INTO AC(time, activewatt, reactivepower, apparentpower)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3)',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0)])
    .then(res => {
        return res.status(200).json({
            status: 'success',
        });
    })
    .catch(e => setImmediate(() => {     
        return res.status(500).json({
        status: 'error',
    });}))
});



module.exports = router;