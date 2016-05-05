import { renderBasic, renderSlim } from './helpers.js';

export default function () {
  FlowRouter.route('/', {
    action: () => renderBasic('home')
  });
  
  FlowRouter.route('/summoner', {
    action: () => renderBasic('stats')
  });

  FlowRouter.notFound = {
    action: () => renderSlim('notFound')
  };
}
