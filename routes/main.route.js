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
/*
router.post('/recordMain', function (req, res) {
    pool.query('WITH time1 AS ('
    + 'INSERT INTO main1P(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3,$4,$5,$6,$7,$8,$9)'
    + 'RETURNING time'
    + ')'
    + '  , time2 AS('
    + '    INSERT INTO main2P(time,activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$10,$11,$12,$13,$14,$15,$16,$17,$18)'
    + ')'
    + 'INSERT INTO main3P(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$19,$20,$21,$22,$23,$24,$25,$26,$27);',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),Math.max(req.body.Current[1],0),Math.max(req.body.Voltage[1],0),Math.max(req.body.CosPhi[1],0),Math.max(req.body.Frequency[1],0),Math.max(req.body.PowerFactor[1],0),Math.max(req.body.ActiveEnergy[1],0),
    Math.max(req.body.ActiveWatts[2],0), Math.max(req.body.ReactivePower[2],0), Math.max(req.body.ApparentPower[2],0),Math.max(req.body.Current[2],0),Math.max(req.body.Voltage[2],0),Math.max(req.body.CosPhi[2],0),Math.max(req.body.Frequency[2],0),Math.max(req.body.PowerFactor[2],0),Math.max(req.body.ActiveEnergy[2],0),
    Math.max(req.body.ActiveWatts[3],0), Math.max(req.body.ReactivePower[3],0), Math.max(req.body.ApparentPower[3],0),Math.max(req.body.Current[3],0),Math.max(req.body.Voltage[3],0),Math.max(req.body.CosPhi[3],0),Math.max(req.body.Frequency[3],0),Math.max(req.body.PowerFactor[3],0),Math.max(req.body.ActiveEnergy[3],0),])
    .then(pgRes => {
        return res.status(200).json({
            status: 'success',
        });
    })
    .catch(e => setImmediate(() => {
        throw e
        return res.status(500).json({
        status: 'error',
    });}))
});
*/
router.post('/recordMain', function (req, res) {
    res.status(200).json({
        status: 'success',
    });
    pool.query('WITH time1 AS ('
    + 'INSERT INTO main1P(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES(NOW(),$1,$2,$3,$4,$5,$6,$7,$8,$9)'
    + 'RETURNING time'
    + ')'
    + '  , time2 AS('
    + '    INSERT INTO main2P(time,activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$10,$11,$12,$13,$14,$15,$16,$17,$18)'
    + ')'
    + 'INSERT INTO main3P(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES((select time from time1),$19,$20,$21,$22,$23,$24,$25,$26,$27);',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),Math.max(req.body.Current[1],0),Math.max(req.body.Voltage[1],0),Math.max(req.body.CosPhi[1],0),Math.max(req.body.Frequency[1],0),Math.max(req.body.PowerFactor[1],0),Math.max(req.body.ActiveEnergy[1],0),
    Math.max(req.body.ActiveWatts[2],0), Math.max(req.body.ReactivePower[2],0), Math.max(req.body.ApparentPower[2],0),Math.max(req.body.Current[2],0),Math.max(req.body.Voltage[2],0),Math.max(req.body.CosPhi[2],0),Math.max(req.body.Frequency[2],0),Math.max(req.body.PowerFactor[2],0),Math.max(req.body.ActiveEnergy[2],0),
    Math.max(req.body.ActiveWatts[3],0), Math.max(req.body.ReactivePower[3],0), Math.max(req.body.ApparentPower[3],0),Math.max(req.body.Current[3],0),Math.max(req.body.Voltage[3],0),Math.max(req.body.CosPhi[3],0),Math.max(req.body.Frequency[3],0),Math.max(req.body.PowerFactor[3],0),Math.max(req.body.ActiveEnergy[3],0),])
    .then(pgRes => {

    })
    .catch(e => setImmediate(() => {
        
    }))
});

router.post('/recordAC', function (req, res) {
    /*res.status(200).json({
        status: 'success',
    });
    pool.query('INSERT INTO AC(time, activewatt, reactivepower, apparentpower, current, voltage, cosphi, frequency, powerfactor, activeenergy)'
    + 'VALUES(date_trunc(\'second\', NOW()),$1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [Math.max(req.body.ActiveWatts[1],0), Math.max(req.body.ReactivePower[1],0), Math.max(req.body.ApparentPower[1],0),Math.max(req.body.Current[1],0),Math.max(req.body.Voltage[1],0),Math.max(req.body.CosPhi[1],0),Math.max(req.body.Frequency[1],0),Math.max(req.body.PowerFactor[1],0),Math.max(req.body.ActiveEnergy[1],0)])
    .then(pgRes => {

    })
    .catch(e => setImmediate(() => {     
       }))*/
    console.log(req.body)
    res.status(200).json({
        status: 'success',
    });
});



module.exports = router;