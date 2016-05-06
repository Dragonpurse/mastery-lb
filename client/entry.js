import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createGlobalHelpers from './components/common/helpers.js';
import createHome from './components/home/home';
import createHeader from './components/header/header';
import createSummoner from './components/summoner/summoner.js';

createMainRoutes();
createGlobalHelpers(Template);
createHome(Template);
createHeader(Template);
createSummoner(Template);