# League Mastery

## Live website

The live version of league mastery can be found at http://league-mastery.com/

## Features

###### Frontpage

On the frontpage you can choose a champion to see the specific leaderboard.
Thanks to the power of meteor every happens in real time!
Which means if a summoner updates his stats or adds himself to the list for the first time, another user will see the leaderboard update in real time, no more need to refresh!

###### Looking up summoners

First time users will be looked up and added to the website, from there the user can see his mastery stats.
You can filter champions through the search bar and/or check the box to see which champions you have already unlocked the mastery chest for this season.

A returning user will be loaded from cache as to not overload the api with useless calls.
If the user wishes to update his stats, he can click on the refresh button near the summoners name.
Currently the time in between updates is 60minutes.
**Feature in progress**: Half the api key's request will be used for a cron job that will crawl through the existing users in the database and update them accordingly.
This way user will not have outdated data if they do not update their stats frequently.

A user can also click a specific champion in the list to see his own place in the rankings compared to other summoners.
A yellow background color is used to point out the summoner.

###### Comparing summoners

A summoner can compare mastery statistics with another summoner by looking up a summoner and then filling in the other summoners name in the compare form on the right side of the summoners info.
This will bring the user to a page containing the champions both users play and give a handly little summary of which champions the summoner excels in compared to the other summoner.


## Installing league-mastery

###### Running league-mastery locally

First you'll need to install https://www.meteor.com/. (v1.3 was used during the development of this web-app)

Once installed you'll need to create a settings.json file containing the ddragon url and your Riot API key.

Example **settings.json** file

```
{
     "public":{
         "ddragon": "http://ddragon.leagueoflegends.com"
     },
     "riot":{
         "apiserver":"api.pvp.net",
         "key": "your-api-key-goes-here"
     }
 }
```

**settings.json** should be located in the root of your directory.

Once both meteor is installed and settings.json is created you can run the server by running the following command in the root of your project:
```
meteor --settings settings.json
```

The default address where you can find the web-app is **http://localhost:3000/**