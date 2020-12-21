
const { GraphQLInputObjectType, GraphQLInt } = require('graphql');
const ContactType = require('../types/phonebook');
const PaginationArgType = require('../types/paginationParams');
const PaginatedListType = require('../types/paginationOutput');
const services = require('../../services/')

const PhonebookQueryTypes = {
    phonebook: {
        type: PaginatedListType(ContactType),
        args: {
            pagination: {
                type: PaginationArgType,
                defaultValue: { offset: 0, limit: 3 }
            },
        },
        resolve: (_, args) => {
            const { offset, limit } = args.pagination
            return {
                items: services.getContact.find().skip(offset).limit(limit).exec(),
                count: services.getContact.count()
            }
        },
    }
}

module.exports = PhonebookQueryTypes