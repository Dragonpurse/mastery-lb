import setupBrowserPolicy from './config/security.js';
import loadChampions from './loaders/champions.js';
import loadRegions from './loaders/regions.js';
import {Summoners} from '../imports/api/summoner.js';
import {ChampionMastery} from '../imports/api/championMastery.js';

setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  console.log('LOADING CHAMPIONS');
  loadChampions();
  console.log('LOADING REGIONS');
  loadRegions();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
