import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const Knowledge = require('knowledge-node')({ serverKey: process.env.REACT_APP_KNOWLEDGE_API_KEY });

class SearchBox extends Component {

    getOptions = (input) => {
        const types = [
            Knowledge.types.thing
        ];
        const limit = 10;
        let params;

        try {
            params = Knowledge.buildParams(input, types, limit);
        } catch(e) {
            return Promise.resolve({ options: [] });
        }

        return Knowledge.search(params)
            .then(body => {
                this.props.handleResultUpdate(body.itemListElement);
                return { options: body.itemListElement.map((item) => ({
                    label: item.result.name,
                    value: item.result.name
                })) };
            })
            .catch(error => {
                return { options: [] };
            });
    };

    render() {
        return (
            <div>
                <Select.Async
                    name="search_box"
                    loadOptions={this.getOptions}
                />
            </div>
        );
    }
}

export default SearchBox;