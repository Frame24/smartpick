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
    hot: true, // Горячая замена модулей (HMR)
    liveReload: true, // Перезагрузка при изменении файлов
    allowedHosts: ['smart-pick.local'], // Разрешение домена

    watchFiles: {
      paths: ['/app/static/**/*'], // Путь к отслеживаемым файлам
      options: {
        usePolling: true, // Поллинг для стабильности на Windows
        interval: 2000, // Интервал проверки изменений
      },
    },
  },
  watchOptions: {
    poll: 2000, // Поллинг Webpack (дублируем для совместимости с ядром)
    ignored: /node_modules/, // Исключаем папку node_modules из отслеживания
  },
  infrastructureLogging: {
    level: 'info', // Логирование инфраструктуры
  },
  stats: {

    all: false,

    assets: true,

    errors: true,

    warnings: true,
  },
});
