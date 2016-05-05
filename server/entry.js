import setupBrowserPolicy from './config/security.js';
import loadChampions from './loaders/champions.js';
import loadRegions from './loaders/regions.js';
setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  loadChampions();
  loadRegions();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
