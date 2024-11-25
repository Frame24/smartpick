const { merge } = require('webpack-merge');
const commonConfig = require('./common.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:3000/static/webpack_bundles/',
  },
  devServer: {
    port: 3000,
    proxy: [
      {
        context: ['/'],
        target: 'http://django:8000',
      },
    ],
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    hot: true, // Включаем горячую замену модулей (HMR)
    liveReload: true,
    allowedHosts: ['smart-pick.local'], // Разрешаем доступ для домена

    // Новая настройка для отслеживания файлов
    watchFiles: {
      paths: ['/app/static/**/*'], // Укажите путь к отслеживаемым файлам
      options: {
        usePolling: true,
        interval: 1000, // Интервал проверки изменений в миллисекундах
      },
    },
  },
});
console.log("Webpack Dev Server configuration:", module.exports);
