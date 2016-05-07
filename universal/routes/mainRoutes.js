import { renderBasic, renderSlim } from './helpers.js';

export default function () {
  FlowRouter.route('/', {
    action: () => renderBasic('home')
  });

  FlowRouter.route('/summoner/:region/:summonerId', {
    action: () => renderBasic('summoner')
  });
  FlowRouter.route('/summoner/:region/:summonerId/compare/:region2/:summonerId2', {
    action: () => renderBasic('compare')
  });
  FlowRouter.route('/leaderboard/:championId', {
    action: () => renderBasic('leaderboard')
  });
  FlowRouter.notFound = {
    action: () => renderSlim('notFound')
  };
}
