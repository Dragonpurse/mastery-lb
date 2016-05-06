import { renderBasic, renderSlim } from './helpers.js';

export default function () {
  FlowRouter.route('/', {
    action: () => renderBasic('home')
  });

  FlowRouter.route('/summoner/:region/:summonerId', {
    action: () => renderBasic('summoner')
  });
  FlowRouter.route('/leaderboard/:championId', {
    action: () => renderBasic('leaderboard')
  });

  FlowRouter.notFound = {
    action: () => renderSlim('notFound')
  };
}
