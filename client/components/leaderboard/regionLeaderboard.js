export default function (Template) {
    Template.regionLeaderboard.helpers({
        isRegionSelected(){
            let selectedRegions = Session.get('selectedRegions');
            let index = selectedRegions.indexOf(this.slug);
            return index != -1;
        }
    });

    Template.regionLeaderboard.events({
        'click .region-checkbox'(event){
            event.preventDefault();
            let selectedRegions = Session.get('selectedRegions');
            let index = selectedRegions.indexOf(this.slug)
            if(index == -1){
                selectedRegions.push(this.slug);
                Session.set('selectedRegions', selectedRegions);
            }else{
                selectedRegions.splice(index, 1);
                Session.set('selectedRegions', selectedRegions);
            }
        }
    });
}