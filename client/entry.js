import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createSubscriptions from './components/common/subscriptions';
import createGlobalHelpers from './components/common/helpers.js';
import createHome from './components/home/home';
import createHeader from './components/header/header';
import createSummoner from './components/summoner/summoner.js';
import createChampionSummonerOverview from './components/summoner/champion_summoner_overview.js';
import createLeaderBoard from './components/leaderboard/leaderboard.js';
import createRegionLeaderBoard from './components/leaderboard/regionLeaderboard.js';
import createCompare from './components/compare/compare';


createMainRoutes();
createSubscriptions();
createGlobalHelpers(Template);
createHome(Template);
createHeader(Template);
createSummoner(Template);
createChampionSummonerOverview(Template);
createLeaderBoard(Template);
createRegionLeaderBoard(Template);
createCompare(Template);