module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@components': './Components',
            '@screens': './Screens',
            '@context': './Context',
            '@navigation': './Navigation',
            '@utils': './Utils',
          },
        },
      ],
    ],
  };
};