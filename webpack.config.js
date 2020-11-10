// Webpack v4
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const getLogger = require('webpack-log');
const log = getLogger({ name: 'file' });
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('./config/main');





// Проверка настроек
module.exports = ( env, option ) => {
    const production = option.mode === 'development'? false: true;
    let pluginsOptions = [];
    let minimizer = [];





    // Очистка папки вывода
    if ( config.base.clean === true ) {
        pluginsOptions.push(
            new CleanWebpackPlugin()
        );
    }


    // Поиск страниц PUG
    {
        const pages = glob.sync( __dirname + '/' + config.folders.input.pages + '\\**\\*.pug' );
        pages.forEach( function ( file) {
            let base = path.relative( __dirname + '/' + config.folders.input.pages, file );
            base = base.replace( /\.pug$/, '' );

            pluginsOptions.push(
                new HtmlWebpackPlugin({
                    filename: config.folders.output.pages + '/' + base + '.html',
                    template: config.folders.input.pages + '/' + base + '.pug',
                    inject: true,
                    minify: config.pages.minify
                })
            );
        });
    }


    // Минификация
    {

        // Java Script
        if ( production === true & config.scripts.minify === true ) {
            minimizer.push( new UglifyJsPlugin ({
                test: /\.js(\?.*)?$/i,
                extractComments: true
            }));
        }

        // CSS
        {
            if ( production === true ) {
                minimizer.push( new OptimizeCssAssetsPlugin ({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: [
                            'default', {
                                discardComments: { removeAll: true }
                            }
                        ]
                    },
                    canPrint: true
                }));
            }
        }
    }





    // Базовые настройки WebPack
    let webpack_config = {
        entry: { main: path.resolve( __dirname, config.folders.input.base + '/' + config.scripts.entry_name + '.js' ) },
        output: {
            path: path.resolve( __dirname, './' + config.folders.output.base ),
            filename: config.folders.output.scripts + '/' + config.scripts.export_name + '.js',
            publicPath: production? '/': 'file:///' + path.resolve( __dirname, './' + config.folders.output.base + '/' ).replace(/([\\]+)/g,'/'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [ '@babel/preset-env' ]
                        }
                    }
                }, {
                    test: /\.(css|scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                }, {
                    test: /\.pug$/,
                    loaders: [
                        'html-loader?minimize=false',
                        'pug-html-loader?pretty=true'
                    ]
                }, {
                    test: /\.(gif|png|jpg|jpeg|svg)?$/,
                    include: path.join( __dirname, config.folders.input.images ),
                    loader: 'file-loader',
                    options: {
                        name: '[folder]/[name].[ext]',
                        outputPath: ( production? '': '/' ) + config.folders.output.images,
                        esModule: false
                    }
                }, {
                    test: /\.(otf|ttf|eot|woff)?$/,
                    include: path.join( __dirname, config.folders.input.fonts ),
                    loader: 'file-loader',
                    options: {
                        name: '[folder]/[name].[ext]',
                        outputPath: ( production? '': '/' ) + config.folders.output.fonts,
                        esModule: false
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin ({
                filename: config.folders.output.styles + '/' + config.styles.export_name + '.css'
            }),
            ...pluginsOptions
        ],
        optimization: {
            minimizer: [
                ...minimizer
            ],
        },
        devServer: {
            index: 'index.html',
            openPage: config.server.openPage,
            publicPath: '/',
            contentBase: path.resolve( __dirname, config.folders.output.base ),
            writeToDisk: true,
            liveReload: true,
            compress: true,
            inline: true,
            open: true,
            port: config.server.port,
            watchOptions: {
                poll: true,
                ignored: [
                    '/node_modules/',
                    '/.git/',
                    '/.vscode/',
                    '/config/',
                    path.resolve( __dirname, config.folders.output.base )
                ]
            }
        }
    }





    return webpack_config;
};