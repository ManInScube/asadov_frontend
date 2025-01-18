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
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "upgrade-insecure-requests",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async rewrites(){
  //   return[
  //     {
  //       source:'/api/:path*',
  //       destination: 'http://localhost:1337/api/:path*',
  //     }
  //   ]
  // }
};

module.exports = nextConfig
