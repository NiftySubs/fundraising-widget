module.exports = {
    webpack: function(config, env) {
        config.output.filename = "[name].js";
        config.optimization.splitChunks = {
            cacheGroups: {
               default: false
            }
        };
        config.optimization.runtimeChunk = false;
        return config;
    }
}