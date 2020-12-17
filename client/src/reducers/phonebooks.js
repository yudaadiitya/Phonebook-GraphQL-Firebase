const phonebooks = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            return action.phonebooks.map((item) => {
                item.sent = true;
                return item
            })

        case 'ADD_PHONEBOOK':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ]

        case 'ADD_PHONEBOOK_FAILURE':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item
            })

        case 'EDIT_PHONEBOOK':
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    edit: false,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                })
            }))

        case 'EDIT_PHONEBOOK_SUCCESS':
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    edit: false,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                })
            }))
        case 'EDIT_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item;
            });


        case 'DELETE_PHONEBOOK':
            console.log(action.id)
            return state.filter((item) => item.id !== action.id)

        case 'RESEND_PHONEBOOK_SUCCESS':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = true;
                }
                return item
            })

        case 'RESEND_PHONEBOOK_FAILURE':
        case 'DELETE_PHONEBOOK_SUCCESS':
        case 'ADD_PHONEBOOK_SUCCESS':
        case 'LOAD_PHONEBOOK_FAILURE':
        case 'DELETE_PHONEBOOK_FAILURE':
        default:
            return state
    }
}

export default phonebooks