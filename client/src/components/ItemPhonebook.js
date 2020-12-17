import React, { Component } from 'react';


export default class ItemContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            phone: '',
            onEdit: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContact = this.handleChangeContact.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleResend = this.handleResend.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeContact(event) {
        this.setState({ phone: event.target.value });
    }

    handleSave(event) {
        event.preventDefault();
        const { name, phone } = this.state;
        if (name && phone) {
            this.props.edit(name, phone);
            this.setState({ editButton: false });
        }
    }

    handleEditButton(event) {
        event.preventDefault();
        this.setState({ editButton: true, name: this.props.name, phone: this.props.phone });
    }

    handleCancel(event) {
        event.preventDefault();
        this.setState({ editButton: false });
    }

    handleDelete() {
        const { id } = this.state;
        this.props.hapus(id);
    }

    handleResend(event) {
        event.preventDefault();
        const { id, name, phone } = this.state;
        this.props.ulang(id, name, phone);
    }

    item() {
        const { no, name, phone, sent } = this.props;

        return (
            <tr>
                <td>{no + 1}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>
                    {sent ? (
                        <div>
                            <button type="submit" className="btn mr-2" onClick={this.handleEditButton}>
                                <i className="fas fa-pencil-alt"></i> Edit</button>
                            <button type="button" className="btn" onClick={this.handleDelete}><i className="fas fa-trash"></i> Delete</button>
                        </div>
                    ) :
                        <button type="button" onClick={this.handleResend} className="btn">
                            <i className="fas fa-sync-alt"></i> Resend</button>
                    }
                </td>
            </tr>
        )
    }

    edit() {
        let { index } = this.props;

        return (
            <tr>
                <td>{index}</td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                </td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.phone}
                        onChange={this.handleChangeContact}
                    />
                </td>
                <td>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.handleSave}
                    >
                        <i className="far fa-sticky-note mr-2" />
                        Save
                </button>
                    <button
                        type="submit"
                        className="btn btn-danger ml-3"
                        onClick={this.handleCancel}
                    >
                        <i className="fas fa-window-close mr-2" />
                        Cancel
                </button>
                </td>
            </tr>
        )
    }

    render() {
        if (this.state.editButton) {
            return this.edit();
        } else {
            return this.item();
        }
    }
}


