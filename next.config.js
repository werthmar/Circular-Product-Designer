/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

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
