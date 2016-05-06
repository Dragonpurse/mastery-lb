

export default function (Template) {
    const ddragonUrl = Meteor.settings.public.ddragon;
    Template.registerHelper( 'ddragonUrl', () => {
        return ddragonUrl;
    });
}