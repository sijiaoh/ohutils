let wrapper = v => v;

if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line node/no-unpublished-require
  wrapper = require('@next/bundle-analyzer')();
}

/** @type {import('next').NextConfig} */
module.exports = wrapper({
  reactStrictMode: true,

  webpack: (config, {dev, isServer}) => {
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

    // TODO: 下記のIssueの動向次第で削除する。
    // https://github.com/serverless-nextjs/serverless-next.js/issues/843#issuecomment-837291066
    // From: https://github.com/millsp/prisma-serverless-nextjs/blob/main/next.config.js#L38
    if (!dev && isServer) config.externals.push('_http_common');

    return config;
  },
});
