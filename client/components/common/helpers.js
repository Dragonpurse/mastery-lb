import './vendor/sweetalert.min';
import { HTTP } from 'meteor/http';

export default function (Template) {
    const ddragonUrl = Meteor.settings.public.ddragon;
    let ddragonVersion = '';
    HTTP.get('https://ddragon.leagueoflegends.com/api/versions.json', function(error,data){
        if(error){
            console.log(error);
        }
        var versions = JSON.parse(data.content);
        ddragonVersion = versions[0];
    });
    Template.registerHelper( 'ddragonUrl', () => {
        return ddragonUrl;
    });
    Template.registerHelper( 'ddragonVersion', () => {
        return ddragonVersion;
    });
}