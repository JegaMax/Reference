// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/** Environment variables */
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;
const REACT_APP_WIDGET_HOST = process.env.REACT_APP_WIDGET_HOST;
const REACT_APP_MEDIA_ENDPOINT = process.env.REACT_APP_MEDIA_ENDPOINT;
const REACT_APP_DEFAULT_STORIES_HOST = process.env.REACT_APP_DEFAULT_STORIES_HOST;
export const environment = {
  production: false,
  envName: 'default',
  widgetHost: REACT_APP_WIDGET_HOST,
  host: REACT_APP_API_HOST,
  defaultStoriesHost: REACT_APP_DEFAULT_STORIES_HOST,
  mediaEndpoint: REACT_APP_MEDIA_ENDPOINT,
  expirationTime: 30, // days
  instagramCalendarLimit: 60, // days
  iosAppStoreId: '1189253216',
  androidPackageName: 'net.cutnut',
  googleFontsUrl: 'https://fonts.googleapis.com',
};
