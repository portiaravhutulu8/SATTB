module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 
    'module:metro-react-native-babel-preset',
  ],
  sourceMaps: true,
    plugins: ['react-native-reanimated/plugin',
    '@babel/transform-flow-strip-types',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime'
  ],
};
};
