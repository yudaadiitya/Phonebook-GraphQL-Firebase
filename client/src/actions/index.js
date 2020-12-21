import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
const API_URL = 'http://localhost:3001/graphql/'

const client = new ApolloClient({
    uri: API_URL
});

//========== LOAD PHONEBOOK DATA
export const loadPhonebookSuccess = (phonebooks) => ({
    type: 'LOAD_PHONEBOOK_SUCCESS',
    phonebooks
})

export const loadPhonebookFailure = () => ({
    type: 'LOAD_PHONEBOOK_FAILURE'
})

export const loadPhonebook = () => {
    const phonebookQuery = gql`
    query {
        phonebooks{
            id
            name
            phone
        }
    }`;
    return dispatch => {
        return client.query({
            query: phonebookQuery,
        })
            .then(function (response) {
                dispatch(loadPhonebookSuccess(response.data.phonebooks))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadPhonebookFailure())
            });
    }
}

//==============================================

//========== ADD PHONEBOOK

export const addPhonebookSuccess = (phonebooks) => ({
    type: 'ADD_PHONEBOOK_SUCCESS',
    phonebooks
})

export const addPhonebookFailure = (id) => ({
    type: 'ADD_PHONEBOOK_FAILURE',
    id
})

const addPhonebookRedux = (id, name, phone) => ({
    type: 'ADD_PHONEBOOK',
    id,
    name,
    phone
})


export const addPhonebook = (name, phone) => {
    const id = Date.now();
    const addQuery = gql`
    mutation addContact($id: ID!, $name: String!, $phone: String!) {
            addContact(id: $id, name: $name, phone: $phone) {
                id
                name
                phone
            }
        }`;
    return dispatch => {
        dispatch(addPhonebookRedux(id, name, phone))
        return client.mutate({
            mutation: addQuery,
            variables: {
                id,
                name,
                phone
            }
        })
            .then(function (response) {
                console.log(response)
                dispatch(addPhonebookSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addPhonebookFailure())
            });
    }
}

//==============================================


//========== DELETE PHONEBOOK

const deletePhonebookRedux = (id) => ({
    type: 'DELETE_PHONEBOOK', id
})

export const deletePhonebookSuccess = () => ({
    type: 'DELETE_PHONEBOOK_SUCCESS'

})

export const deletePhonebookFailure = () => ({
    type: 'DELETE_PHONEBOOK_FAILURE'
})


export const deletePhonebook = (id) => {
    const deleteQuery = gql`
    mutation removeContact($id: ID!) {
        removeContact(id: $id){
            id
        }
    }`;
    return dispatch => {
        dispatch(deletePhonebookRedux(id))
        return client.mutate({
            mutation: deleteQuery,
            variables: {
                id
            }
        })
            .then(function (response) {
                dispatch(deletePhonebookSuccess())
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deletePhonebookFailure())
            });
    }
}

//==============================================


//========== RESEND PHONEBOOK DATA
export const resendPhonebookSuccess = (id) => ({
    type: 'RESEND_PHONEBOOK_SUCCESS',
    id

})

export const resendPhonebookFailure = () => ({
    type: 'RESEND_PHONEBOOK_FAILURE'
})



export const resendPhonebook = (id, name, phone) => {
    const addQuery = gql`
    mutation updateContact($id: ID!, $name: String!, $phone: String!) {
        addContact(id: $id, name: $name, phone: $phone) {
            id
            name
            phone
        }
}`;
    return dispatch => {
        return client.mutate({
            mutation: addQuery,
            variables: {
                id,
                name,
                phone
            }
        })
            .then(function (response) {
                dispatch(resendPhonebookSuccess(id))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(resendPhonebookFailure())
            });
    }
}

//==============================================


//========== EDIT PHONEBOOK DATA

export const editPhonebookSuccess = phonebooks => ({
    type: 'EDIT_PHONEBOOK_SUCCESS',
    phonebooks
});

export const editPhonebookFailure = id => ({
    type: 'EDIT_PHONEBOOK_FAILURE',
    id
});

const editPhonebookRedux = (id, name, phone) => ({
    type: 'EDIT_PHONEBOOK',
    id,
    name,
    phone
});

export const editPhonebook = (id, name, phone) => {
    console.log(id,name,phone);
    const updateQuery = gql`
    mutation updateContact($id: ID!, $name: String!, $phone: String!) {
            updateContact(id: $id, name: $name, phone: $phone) {
                id
                name
                phone
            }
        }`;
    return dispatch => {
        dispatch(editPhonebookRedux(id, name, phone));
        return client.mutate({
            mutation: updateQuery,
            variables: {
                id,
                name,
                phone
            }
        })
            .then(response => {
                dispatch(editPhonebookSuccess(response.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(editPhonebookFailure());
            });
    };
};