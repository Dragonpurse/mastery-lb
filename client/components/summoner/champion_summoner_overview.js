
export default function (Template) {

   Template.champion_summoner_overview.helpers({
    calculateProgress(championLevel, championPointsSinceLastLevel, championPointsUntilNextLevel) {
      //championPointsSinceLastLevel = parseInt(championPointsSinceLastLevel);
      var percentage = championLevel * 20;
      if (championPointsUntilNextLevel === 0) {
        return percentage;
      }
      var totalPointsNextLevel = championPointsSinceLastLevel + championPointsUntilNextLevel;
      return Math.round(percentage + (championPointsSinceLastLevel / totalPointsNextLevel) * 100 / 5);
    },
  })
}