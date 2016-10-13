const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        library: 'CsCollection',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    externals: {
        'immutable': 'Immutable',
        'pubsub-js': 'PubSub'
    }
}
