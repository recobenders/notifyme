export default class SparqlHelperClass {
    getItemType(item) {
        return item['@type'].find(function (el) { return el !== 'Thing' });
    }

    retreiveSparqlInstance(item) {
        let itemType = this.getItemType(item);
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

    retreiveSparqlQuery(item){
        let instance = this.retreiveSparqlInstance(item);
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
}
