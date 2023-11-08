const nextBuildId = require('next-build-id');
const nextTranslate = require('next-translate-plugin');

const nextConfig = nextTranslate({
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  generateBuildId: () => nextBuildId({ dir: __dirname }),

  output: 'standalone',
});

module.exports = nextConfig;
