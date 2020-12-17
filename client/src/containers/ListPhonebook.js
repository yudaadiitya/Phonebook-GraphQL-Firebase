import React, { Component } from 'react'
import ItemPhonebook from './Phonebook'
import { connect } from 'react-redux'
import { loadPhonebook } from '../actions'
import SearchPhonebook from './SearchPhonebook'
import { handleChangeNameSearch } from './SearchPhonebook'
import { handleChangePhoneSearch } from './SearchPhonebook'

class ListPhonebook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameSearch: '',
            phoneSearch: ''
        }
        this.handleChangeNameSearch = this.handleChangeNameSearch.bind(this);
        this.handleChangePhoneSearch = this.handleChangePhoneSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this.props.loadPhone();
    }

    handleChangeNameSearch(e) {
        this.setState({ nameSearch: e.target.value })
    }

    handleChangePhoneSearch(e) {
        this.setState({ phoneSearch: e.target.value })
    }
    handleReset(event) {
        event.preventDefault();
        this.setState({
            nameSearch: '', phoneSearch: ''
        })
    }
    search() {
        const { nameSearch, phoneSearch } = this.props;
        return (
            <div className='card'>
                <div className='card-header' style={{ backgroundColor: 'rgb(50, 100, 101)', color: 'white' }}>
                    Search Form
                    </div>
                <div className='card-body'>
                    <form>

                        <div className="form-inline">
                            <label className="my-1 mr-2 mx-sm-1">Name</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="nameSearch"
                                placeholder="Name Contact"
                                value={nameSearch}
                                onChange={this.handleChangeNameSearch}
                            />
                            <label className="my-1 mr-2 mx-sm-1">Phone</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="phoneSearch"
                                value={phoneSearch}
                                placeholder="Number Phone"
                                onChange={this.handleChangePhoneSearch}
                            />
                            <div className="form-group mr-2">
                                <button type="submit" onClick={this.handleReset} className="btn btn-warning"><i className="fas fa-undo"></i> Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        let { nameSearch, phoneSearch } = this.state
        let { phonebook } = this.props

        if (nameSearch && phoneSearch) {
            const searchItems = (name, phone) => {
                return phonebook.filter(item => {
                    return (
                        item.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
                        item.phone.indexOf(phone) > -1
                    );
                });
            };
            phonebook = searchItems(nameSearch, phoneSearch);
        }
        if (nameSearch) {
            const searchItems = name => {
                return phonebook.filter(item => {
                    return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            };
            phonebook = searchItems(nameSearch);
        }
        if (phoneSearch) {
            const searchItems = phone => {
                return phonebook.filter(item => {
                    return item.phone.indexOf(phone) > -1;
                });
            };
            phonebook = searchItems(phoneSearch);
        }

        let listPhone = phonebook.map((item, no) => {
            return (
                <ItemPhonebook
                    no={no}
                    key={no}
                    id={item.id}
                    name={item.name}
                    phone={item.phone}
                    sent={item.sent} />
            )
        })
        return (
            <div>
                {this.search()}
                <table className="table table-striped my-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPhone}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    phonebook: state.phonebooks
})

const mapDispatchToProps = (dispatch) => ({
    loadPhone: () => dispatch(loadPhonebook())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPhonebook)