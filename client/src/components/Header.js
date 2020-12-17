import React from 'react';
import Clock from 'react-live-clock';

function HeaderCard() {

    return (
        <div className="card-header text-center">
            <h1> <i className="fa fa-address-book"></i> Phone Book App</h1>
            <Clock format={'DD MMMM YYYY, HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} style={{ fontSize: '20px' }} />
        </div>

    )

}

export default HeaderCard;