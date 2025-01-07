const path = require('path');

const nextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig
