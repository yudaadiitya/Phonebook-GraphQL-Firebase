const { GraphQLSchema, GraphQLObjectType } = require('graphql');
var queryType = require('./queries/phonebooks').queryType;
var mutation = require('./mutations/index');

exports.ContactSchema = new GraphQLSchema({
    query: queryType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
})