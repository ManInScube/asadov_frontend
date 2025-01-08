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
  async rewrites(){
    return[
      {
        source:'/api/:path*',
        destination: 'http://84.201.170.233:1337//api/:path*',
      }
    ]
  }
};

module.exports = nextConfig
