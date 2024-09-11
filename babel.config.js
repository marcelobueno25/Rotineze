module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ".", // Você pode ajustar este caminho conforme sua estrutura
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@routes": "./src/routes",
            "@redux": "./src/redux",
            "@services": "./src/services",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@constant": "./src/constant",
            // Adicione outros aliases conforme necessário
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
