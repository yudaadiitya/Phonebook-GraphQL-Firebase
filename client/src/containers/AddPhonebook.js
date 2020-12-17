import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPhonebook } from '../actions'

class FormPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = { addButton: false, id: "", name: "", phone: "", value: '', search: false };
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleButtonSearch = this.handleButtonSearch.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)

    }

    handleAddButton(event) {
        event.preventDefault();
        this.setState({ addButton: true })
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPhonebook(this.state.name, this.state.phone);
        this.setState({ name: '', phone: '' })
    }

    handleButtonSearch() {
        this.setState({
            search: true
        })
    }

    handleButtonCancel() {
        this.setState({
            search: false
        })
        this.props.searchContactReset()
    }

    handleFilterChange(event) {
        let value = event.target.value
        this.setState({
            value: event.target.value
        })
        this.props.searchContact(value)
    }

    handleReset(event) {
        event.preventDefault();
        this.setState({
            value: ''
        })
        this.props.searchContactReset()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <button className="btn mr-2 btn-primary" type="button" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm">
                            <i className="fas fa-plus"></i> Add
                        </button>
                    </p>
                    <div className="collapse" id="addForm">
                        <div className="card">
                            <div className="card-header"
                                style={{ backgroundColor: 'rgb(50, 100, 101)', color: 'white' }}>ADD CONTACT</div>
                            <div className="card-body">
                                <div className="form-inline">
                                    <label className="my-1 mr-2 mx-sm-1"  >Name</label>
                                    <input className="form-control mx-sm-1" placeholder="Name Contact" type="text" value={this.state.name} onChange={this.handleChangeName} />
                                    <label className="my-1 mr-2 mx-sm-1"  >Phone</label>
                                    <input className="form-control mx-sm-1" placeholder="Number Phone" type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                                    <button className="btn btn-success" type="submit" onClick={this.handleSubmit}><i className="fas fa-save"></i> Simpan</button>
                                    <button type="button" className="btn btn-danger" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm"><i className="fas fa-times"></i> Cancel</button>
                                </div>
                            </div>
                        </div >
                    </div>
                </form>
            </div >
        );
    }

}

const mapDispatchToProps = dispatch => ({
    addPhonebook: (name, phone) => dispatch(addPhonebook(name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(FormPhonebook)