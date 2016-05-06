import setupBrowserPolicy from './config/security.js';
import loadChampions from './loaders/champions.js';
import loadRegions from './loaders/regions.js';
import {Summoners} from '../imports/api/summoner.js';
import {ChampionMastery} from '../imports/api/championMastery.js';
setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  loadChampions();
  loadRegions();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
