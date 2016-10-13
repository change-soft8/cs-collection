const path = require("path");
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: "./index.jsx",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js",
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel']
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
    externals: [{
        'react': 'React',
        'react-dom': 'ReactDOM',
        'immutable': 'Immutable',
        'pubsub-js': 'PubSub'
    }]
};
