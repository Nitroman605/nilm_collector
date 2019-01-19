const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const main = require('./routes/main.route');

const PORT = 80;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials",true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
});
app.use('/main', main);
app.get('/', function (req, res) {
    res.send('NILM Data Collector is Running !')
})
app.listen(PORT, function(){
    console.log('Server is running on Port',PORT);
 });
