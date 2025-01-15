module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.jsx', '.js'],
        alias: {
          '@components': './src/presentation/components',
          '@navigations': './src/applications/navigations',
          '@stores': './src/stores',
          '@screens': './src/presentation/screens',
          '@utils': './src/applications/utils',
          '@slices': './src/applications/slices',
          '@actions': './src/applications/actions',
          '@images': './assets/images',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
