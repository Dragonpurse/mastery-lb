import setupBrowserPolicy from './config/security.js';
import loadChampions from './loaders/champions.js';

setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  loadChampions();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
