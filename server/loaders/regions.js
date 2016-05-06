import { Regions } from '../../imports/api/region.js';
import { HTTP } from 'meteor/http';

export default function () {
    //Champions.insert(champion);
    HTTP.get('http://status.leagueoflegends.com/shards', function(error,data){
        if(error){
            console.log(error);
        }
        var regions = data.data;

        regions.forEach(function(region){
            var existingRegion = Regions.findOne({slug:region.slug});
            if(!existingRegion){
                region.regionId = region.hostname.split('.')[1];
                Regions.insert(region);
            }
        })
    })
}
