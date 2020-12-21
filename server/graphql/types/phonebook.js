const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} = require('graphql')


// Contact Type
const ContactType = new GraphQLObjectType({
    name: 'Phonebook',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        phone: { type: GraphQLString }
    }
});

module.exports = ContactType;