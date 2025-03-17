module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/superstruct/,
      });
  
      return config;
    },
  };
  