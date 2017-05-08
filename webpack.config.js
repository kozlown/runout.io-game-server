module.exports = {
    entry: './app.js',
    target: 'node',
    output: {
        path: `${__dirname}/bin`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                test: /\.jsx?$/,
                // Options to configure babel with
                query: {
                    presets: ['env', 'es2015', 'stage-0']
                }
            }
        ]
    },
    stats: {
        warnings: false
    }
}
