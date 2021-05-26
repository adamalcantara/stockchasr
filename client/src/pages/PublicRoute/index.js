import React from 'react'
import Nav from "../../components/Nav"


/* This is a very simple component.. it probably doesn't need to be a smart component at this point but you never know what's goingto happen in the future */

function PublicRoute() {

    return (
        <div>
            <Nav className="App-header" />
            <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                    <h3>Example Public Route</h3>
                    <h6>Anyone can see this content</h6>
                </div>
                <div className="col-sm">

                </div>
            </div>
        </div>
    )
}


export default PublicRoute