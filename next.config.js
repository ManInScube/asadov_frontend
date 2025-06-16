const path = require('path');

const nextConfig = {
  // Основные настройки
  output: 'standalone',
  productionBrowserSourceMaps: true,
  
  // Настройки для статики на Яндекс.Облаке
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  trailingSlash: true,
  
  // Оптимизация изображений
  images: {
    unoptimized: true, // Отключаем встроенную оптимизацию для облака
  },

  // Ваши текущие настройки
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Экспериментальные настройки для облака
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    optimizeCss: true,
  }
};

module.exports = nextConfig;