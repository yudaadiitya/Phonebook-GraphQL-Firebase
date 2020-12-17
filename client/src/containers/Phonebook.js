import { connect } from 'react-redux'
import { deletePhonebook, resendPhonebook, editPhonebook } from '../actions'
import ItemPhonebook from '../components/ItemPhonebook'

const mapDispatchToProps = (dispatch, ownProps) => ({
    hapus : () => dispatch(deletePhonebook(ownProps.id)),
    ulang : () => dispatch(resendPhonebook(ownProps.id, ownProps.name, ownProps.phone)),
    edit : (name,phone) => dispatch(editPhonebook(ownProps.id, name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(ItemPhonebook)