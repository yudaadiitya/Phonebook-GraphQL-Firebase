const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
var ContactType = require('../types/phonebook');
var services = require('../../services');

exports.add = {
    type: ContactType.contactType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        return services.createContact(params);
    }
}