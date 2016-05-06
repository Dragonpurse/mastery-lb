import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createGlobalHelpers from './components/common/helpers.js';
import createHome from './components/home/home';
import createHeader from './components/header/header';
import createSummoner from './components/summoner/summoner.js';
import createChampionSummonerOverview from './components/summoner/champion_summoner_overview.js';

createMainRoutes();
createGlobalHelpers(Template);
createHome(Template);
createHeader(Template);
createSummoner(Template);
createChampionSummonerOverview(Template);