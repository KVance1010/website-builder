// import React, {useState} from 'react';
import React from 'react';
import '../styles/build_workbench.css'

const flair = {
    addNavBarSizing: {
        width: '25%',
        minHeight: '100%',      
    },
    addNavBarColor: {
        backgroundColor: 'aquamarine'
    }
}

const WRK = () => {
    // const [visisibility, setVisibility] = useState('');

    return (
        <div>
            <h1>Build Workbench Page</h1>
            <div className='outer-container'>
                <div style={flair.addNavBarSizing} className='inner-container'>
                    <button className='startBtn'>start</button>
                    <button>add navBar</button>
                    <div style={flair.addNavBarColor} className='inner-container'>
                        <tag>background color for nav bar</tag>
                        <input type="text"></input>
                        <tag>nav bar links followed by , to seperate them</tag>
                        <input type="text"></input>
                        <tag>Title of home page</tag>
                        <input type="text"></input>
                    </div>
                </div>
                <div className='wrk-concept-container'>
                    <div id='inlineLink'>
                        <h1>Concept</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WRK;