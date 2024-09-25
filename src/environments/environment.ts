// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'https://my.api.mockaroo.com/meal_planner.json?key=6c4d45e0',
  apiBaseRecipes:
    'https://my.api.mockaroo.com/meal_planner_recipes.json?key=6c4d45e0',
  apiMongoDB:
    'mongodb+srv://tfosque:fosque14@familybookcluster.nraprzf.mongodb.net/family-book-db',
};

/* 
mongodb+srv://<db_username>:<db_password>@familybookcluster.nraprzf.mongodb.net/

*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
