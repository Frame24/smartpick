const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    path: path.resolve(__dirname, '../static/webpack_bundles/'),  // Общий выходной каталог для бандлов
    publicPath: '/static/webpack_bundles/',  // Путь для Django к статическим файлам
    filename: 'js/[name]-[fullhash].js',
    chunkFilename: 'js/[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, '../')),
      filename: 'webpack-stats.json',
    }),
    new MiniCssExtractPlugin({
      // Создаем отдельные папки для CSS каждого приложения
      filename: ({ chunk }) => {
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
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'autoprefixer', 'pixrem'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
