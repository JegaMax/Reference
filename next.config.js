module.exports = {
    env: {
      // declare here all your variables
PUBLIC_URL: "",
FAST_REFRESH: false,
REACT_APP_DPA_CLIENT_ID: "c2LOq3WfL5rIknTXFQ6YZ6tVuYsDMAwv",
REACT_APP_DEFAULT_STORIES_HOST: "https://stories.zazuapp.co",
REACT_APP_MEDIA_ENDPOINT: "https://media.zazuapp.co",
REACT_APP_API_HOST: "https://beta.zazuapp.co/api/v3",
REACT_APP_WIDGET_HOST: "https://widget.zazuapp.co/widget.js"
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    }
  }