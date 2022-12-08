import React, {useState} from 'react';


const WRK = () => {
const [visisibility, setVisibility] =

    return (
        <div>
            <h1>Build Workbench Page</h1>
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '40vw'}}>
                <button>start</button>
                <button>add navBar</button>
                <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'aquamarine'}}>
                    <tag>background color for nav bar</tag>
                    <input type="text"></input>
                    <tag>nav bar links followed by , to seperate them</tag>
                    <input type="text"></input>
                    <tag>Title of home page</tag>
                    <input type="text"></input>
                </div>
            </div>
            <div className='display' style={{maxWidth: '60vw',backgroundColor: 'grey'}}>
                <div id='inlineLink'>
                    
                </div>
            </div>
        </div>
    )
}

export default WRK;