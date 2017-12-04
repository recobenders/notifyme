const Knowledge = require('knowledge-node')({ serverKey: process.env.REACT_APP_KNOWLEDGE_API_KEY });

exports.search = function(req, res, next) {
    const input = req.body.input;
    const types = [
        Knowledge.types.movies,
        Knowledge.types.musicAlbum,
        Knowledge.types.tvEpisode,
        Knowledge.types.tvSeries,
        Knowledge.types.videoGame
    ];
    const limit = 10;
    let params;

    try {
        params = Knowledge.buildParams(input, types, limit);
    } catch(e) {
        console.error(e);
        return Promise.resolve({ options: [] });
    }
    return Knowledge.search(params)
        .then(body => {
            return res.status(200).json({ success: true, items: body.itemListElement })
        })
        .catch(error => {
            return res.status(500).send()
        });
};