import { pigreco } from './controllers/pigreco.js';
import dotenv from 'dotenv';
import express  from 'express';
import { publishMessage } from './controllers/pubsubController.js'

dotenv.config();
var app = express();

/*Endpoints*/
app.get('/:n', function (req, res) {
    let n = parseInt(req.params.n);

    if( isNaN(n) ) 
    {
        publishMessage(JSON.stringify({
            date:new Date(),
            service:'Pigreco',
            n:n,
            status:'ERROR'
        }));
        res.status(400).json({ error:'Bad Request' });
    }
    else
    {
        publishMessage(JSON.stringify({
            date:new Date(),
            service:'Pigreco',
            n:n,
            status:'OK'
        }));
        res.json({risultato: pigreco(n)})
    }
})

/*404*/
app.use(function(req, res, next) {
    res.status(404).json({ error:'Not Found' });
});
 
/*Avvio Server*/
var server = app.listen(process.env.PORT, function () {
    var host = server.address().address
    var port = server.address().port
})
