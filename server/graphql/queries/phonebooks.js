const { GraphQLObjectType, GraphQLList } = require('graphql')
// var services = require('../../services');
// var contactType = require('../types/phonebook').contactType;
const PhonebookQueryTypes = require('./pagination');

// Query
exports.queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...PhonebookQueryTypes,
    },
});