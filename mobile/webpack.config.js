const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias["victory-native"] = "victory";
  config.resolve.fallback = {
    crypto: false,
  };
  return config;
};
