const { GraphQLNonNull, GraphQLID } = require('graphql');
var ContactType = require('../types/phonebook');
var services = require('../../services');

exports.remove = {
    type: ContactType.contactType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        return services.deleteContact(params);
    }
}