const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  devtool: 'source-map', // Source map generation must be turned on
  plugins: [
    new SentryWebpackPlugin({
      org: 'five-sixths',
      project: 'bot-tender',

      // Specify the directory containing build artifacts
      include: './',

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
    }),
  ],
};
