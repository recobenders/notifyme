const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
const env = process.env.NODE_ENV || 'production';

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ----------------------------------------------------
// Routes for our API

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

const knowledge_graph = require('./api/search/knowledge_graph');
const wikidata = require('./api/search/wikidata');

router.post('/search/knowledge_graph', knowledge_graph.search);
router.post('/search/wikidata', wikidata.search);

// ----------------------------------------------------

app.use('/api', router);

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});