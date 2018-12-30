const express = require('express');
const router = express.Router();

const { Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dataset',
    password: '12345678',
    port: 5432,
  })


router.post('/testData', function (req, res) {
   
    return res.status(200).json({
        status: 'success',
    });
});

router.post('/recordMain', function (req, res) {
    console.log(req.body)
    pool.query('WITH time1 AS ('
    + 'INSERT INTO mainP1(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3,$4,$5,$6,$7,$8)'
    + 'RETURNING time'
    + ')'
    + '  , time2 AS('
    + '    INSERT INTO mainP2(time,activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$9,$10,$11,$12,$13,$14,$15,$16)'
    + ')'
    + 'INSERT INTO mainP3(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$17,$18,$19,$20,$21,$22,$23,$24);',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),Math.max(req.body.Voltage[1],0),Math.max(req.body.CosPhi[1],0),Math.max(req.body.Frequency[1],0),Math.max(req.body.PowerFactor[1],0),Math.max(req.body.ActiveEnergy[1],0),
    Math.max(req.body.ActiveWatts[2],0), Math.max(req.body.ReactivePower[2],0), Math.max(req.body.ApparentPower[2],0),Math.max(req.body.Voltage[2],0),Math.max(req.body.CosPhi[2],0),Math.max(req.body.Frequency[2],0),Math.max(req.body.PowerFactor[2],0),Math.max(req.body.ActiveEnergy[2],0),
    Math.max(req.body.ActiveWatts[3],0), Math.max(req.body.ReactivePower[3],0), Math.max(req.body.ApparentPower[3],0),Math.max(req.body.Voltage[3],0),Math.max(req.body.CosPhi[3],0),Math.max(req.body.Frequency[3],0),Math.max(req.body.PowerFactor[3],0),Math.max(req.body.ActiveEnergy[3],0),])
    .then(res => {
        return res.status(200).json({
            status: 'success',
        });
    })
    .catch(e => setImmediate((e) => {
        console.log(e)     
        return res.status(500).json({
        status: 'error',
    });}))
});

router.post('/recordAC', function (req, res) {
    
    pool.query('INSERT INTO AC(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3,$4,$5,$6,$7,$8)',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),Math.max(req.body.Voltage[1],0),Math.max(req.body.CosPhi[1],0),Math.max(req.body.Frequency[1],0),Math.max(req.body.PowerFactor[1],0),Math.max(req.body.ActiveEnergy[1],0)])
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