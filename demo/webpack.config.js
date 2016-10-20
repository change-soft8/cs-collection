const path = require("path");
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: ['babel-polyfill', 'webpack-hot-middleware/client', './index.jsx'],
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js",
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'classnames-loader!style-loader!css-loader?modules!postcss-loader'
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: [{
        'react': 'React',
        'react-dom': 'ReactDOM',
        'immutable': 'Immutable',
        'pubsub-js': 'PubSub'
    }]
};
