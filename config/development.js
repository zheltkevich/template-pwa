// Modules/Plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// Configs
const devtoolConfig = 'source-map';
const devServerConfig = {
    static: {
        directory: path.resolve(__dirname, '../public'),
    },
    compress: true,
    client: {
        logging: 'none',
        overlay: false,
    },
    historyApiFallback: true,
};
const pluginsConfig = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'Development',
        alwaysWriteToDisk: true,
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
        patterns: [
            {
                from: './public/favicon.ico',
                to: '.',
            },
            {
                from: './public/manifest.json',
                to: '.',
            },
            {
                from: './public/assets/icons/app/',
                to: './assets/icons/app/',
            },
        ],
    }),
    new StylelintPlugin({
        files: [path.resolve(__dirname, '../src/**/*.{vue,scss}')],
        fix: true,
    }),
    new ESLintPlugin({
        files: [path.resolve(__dirname, '../src/**/*.{vue,js}')],
        fix: true,
    }),
];
const moduleConfig = {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        additionalData: '// Additional data is working!!!',
                    },
                },
            ],
            generator: {
                filename: 'styles/[name][ext]',
            },
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/images/[name][ext]',
            },
        },
        {
            test: /\.(ttf|otf|eot|woff|woff2)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/fonts/[name][ext]',
            },
        },
    ],
};
const outputConfig = {
    publicPath: '/', // TODO '/' for all (need .env)
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    clean: true,
};

module.exports = ({
    devtoolConfig,
    devServerConfig,
    pluginsConfig,
    moduleConfig,
    outputConfig,
});