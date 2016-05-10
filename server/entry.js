import setupBrowserPolicy from './config/security.js';
import loadChampions from './loaders/champions.js';
import loadRegions from './loaders/regions.js';
import {Summoners} from '../imports/api/summoner.js';
import {ChampionMastery} from '../imports/api/championMastery.js';

setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  loadChampions();
  loadRegions();

});


/*
INDEXES
 championMastery
{
 "data.playerId": 1,
 region: 1
 }
{
 "data.championId": 1,
 region: 1,
 "data.championPoints":-1
 }

 Summoners
 {
 region: 1,
 'name': 'text'
 }
 */