const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

console.log("Configuring Webpack...");

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),

  entry: {
    'smartpick-project': path.resolve(__dirname, '../static/js/smartpick/project'),
    'smartpick-vendors': path.resolve(__dirname, '../static/js/smartpick/vendors'),
    'asursoft-project': path.resolve(__dirname, '../static/js/asursoft/project'),
    'asursoft-vendors': path.resolve(__dirname, '../static/js/asursoft/vendors'),
  },

  output: {
    path: path.resolve(__dirname, '../static/webpack_bundles/'),
    publicPath: '/static/webpack_bundles/',
    filename: 'js/[name]-[fullhash].js',
    chunkFilename: 'js/[name]-[hash].js',
  },


  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, '../')),
      filename: 'webpack-stats.json',
    }),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        console.log("Generating CSS bundle for:", chunk.name);
        if (chunk.name.includes('smartpick')) {
          return 'css/smartpick/[name].[contenthash].css';
        }
        if (chunk.name.includes('asursoft')) {
          return 'css/asursoft/[name].[contenthash].css';
        }
        return 'css/[name].[contenthash].css';
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                  'postcss-preset-env',
                  'pixrem',
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(), // Минификация CSS
    ],
  },

  performance: {
    hints: false,
  },

  stats: {
    warnings: false,
  },
};

console.log("Webpack common configuration:", module.exports);
