const { merge } = require('webpack-merge');
const commonConfig = require('./common.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // Более быстрые sourcemaps

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
    hot: 'only', // Включить HMR только для ошибок
    liveReload: false, // Отключить полную перезагрузку для ускорения
    allowedHosts: ['smart-pick.local'],

    watchFiles: {
      paths: ['/app/static/js/**/*', '/app/static/sass/**/*'], // Сужаем пути для отслеживания
      options: {
        usePolling: true, // Поллинг для стабильности на Windows
        interval: 1000, // Уменьшаем интервал проверки изменений
      },
    },
  },

  watchOptions: {
    poll: 1000, // Более быстрый поллинг
    ignored: /node_modules|dist/, // Исключаем node_modules и dist из отслеживания
  },

  cache: {
    type: 'memory', // Быстрый кэш для разработки
  },

  optimization: {
    splitChunks: {
      chunks: 'async', // Разделяем только асинхронные модули
      cacheGroups: {
        default: false, // Отключаем автоматическое создание общих чанков
      },
    },
    runtimeChunk: false, // Отключаем создание runtime чанков для ускорения
  },

  infrastructureLogging: {
    level: 'info', // Уровень логирования инфраструктуры
  },

  stats: {
    errors: true,
    warnings: false, // Отключаем ненужные предупреждения
    modules: false, // Не показываем информацию о модулях
    timings: true, // Отображаем только время сборки
  },
});
