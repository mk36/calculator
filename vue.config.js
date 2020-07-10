module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/calculator/' : '/',
    css: {
        loaderOptions: {
            sass: {
                prependData: `
          @import "@/styles/shared/_coloursAndFonts.scss";
          @import "@/styles/shared/_mixins.scss";
          @import "@/styles/shared/_variables.scss";
          @import "@/styles/shared/_breakpoints.scss";
        `
            }
        }
    }
};
