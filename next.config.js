let env = undefined;

if (process.env.DEPLOY === 'true') {
  const fs = require('fs');
  const envJson = fs.readFileSync('.env/production.json');
  env = JSON.parse(envJson);
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env,
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
};
