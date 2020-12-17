import React from 'react'
import ListPhonebook from '../containers/ListPhonebook'
import AddPhonebook from '../containers/AddPhonebook'
import HeaderCard from './Header'



export default function BoxPhonebook(props) {
    return (
        <div className="container">
            <div>
            <HeaderCard />
            </div>
            <div>
            <br />
            <AddPhonebook  />
            </div>
            <div>
            <br />
            <ListPhonebook  />
            </div>
        </div>
    )
}



