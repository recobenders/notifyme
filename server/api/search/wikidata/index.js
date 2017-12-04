const axios = require('axios');
const wdk = require('wikidata-sdk');

function getItemType(item) {
    return item['@type'].find(function (el) { return el !== 'Thing' });
}

function retrieveSparqlInstance(item) {
    let itemType = getItemType(item);
    if(itemType === 'Movie'){
        return 'Q11424'
    } else if(itemType === 'TVSeries' || itemType === 'TVEpisode'){
        return 'Q15416'
    } else if(itemType === 'MusicAlbum'){
        return 'Q482994'
    } else if(itemType === 'VideoGame'){
        return 'Q7889'
    }
    return null;
}

function retrieveSparqlQuery(item){
    let instance = retrieveSparqlInstance(item);
    return (
        `
            SELECT DISTINCT ?date ?imdbId ?placeOfPublicationLabel WHERE {
              ?item ?label "${item.name}"@en .
              ?item wdt:P577 ?date .
              ?item wdt:P31 wd:${instance}.
              OPTIONAL { ?item wdt:P345 ?imdbId. }
              ?statement ps:P577 ?date.
              OPTIONAL { ?statement pq:P291 ?placeOfPublication. }
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
              } ORDER BY ASC(?date)`)
}

exports.search = function(req, res, next) {
    const input = req.body.input;
    const sparqlQuery = retrieveSparqlQuery(input);
    const url = wdk.sparqlQuery(sparqlQuery);

    let response = res;
    axios.get(url)
        .then(res => {
            const items = res.data.results.bindings;
            let releaseDates = {};
            for (let item of items) {
                const date = new Date(item.date.value);
                const location = item.placeOfPublicationLabel ? item.placeOfPublicationLabel.value : null;
                if(date in releaseDates) {
                    if(location !== null) {
                        releaseDates[date].locations.push(location);
                    }
                } else {
                    releaseDates[date] = {
                        date: date,
                        locations: location === null ? [] : [location]
                    };
                }
            }

            return response.status(200).json({ success: true, releaseDates: releaseDates })
        });
};