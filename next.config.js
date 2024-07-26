const MillionLint = require('@million/lint');
const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "pbs.twimg.com",
      pathname: "**"
    }, {
      protocol: "https",
      hostname: "abs.twimg.com",
      pathname: "**"
    }, {
      protocol: "http",
      hostname: "pbs.twimg.com",
      pathname: "**"
    }]
  }
};
module.exports = nextConfig;