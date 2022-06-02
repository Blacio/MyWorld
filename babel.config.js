module.exports = {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@': './src/components',
                    'constants': './src/constants',
                    '##': './src/examples',
                },
            },
        ]
    ]
};
