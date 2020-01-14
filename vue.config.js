module.exports = {
    publicPath: '/draw-each-day/',
    configureWebpack: {
        module: {
            rules: [
                {test: /\.txt$/, loader: 'raw-loader'}
            ]
        }
    }
}