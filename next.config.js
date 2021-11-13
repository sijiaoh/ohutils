let wrapper = v => v;

if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line node/no-unpublished-require
  wrapper = require('@next/bundle-analyzer')();
}

/** @type {import('next').NextConfig} */
module.exports = wrapper({
  reactStrictMode: true,
  webpack: config => {
    // eslint-disable-next-line node/no-unpublished-require
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    config.plugins = [
      ...config.plugins,
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        cwd: process.cwd(),
      }),
    ];
    return config;
  },
});
