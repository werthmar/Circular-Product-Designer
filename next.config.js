/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  webpack: ( config, {dev} ) => {
    config.resolve.fallback = { fs: false };

    if (dev) {
        config.devtool = 'source-map';
    }

    // Add file-loader to handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          outputPath: 'static/fonts/',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },

}

module.exports = nextConfig
