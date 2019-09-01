import React from 'react';

const homeStyle = {
    title: {
        textAlign: 'center',
        textDecoration: 'underline',
        paddingTop: 20,
        paddingBottom: 10
    },
    body: {
        paddingLeft: 15
    },
    bottomText: {
        paddingLeft: 20
    },
    extraPadding: {
        paddingBottom: 7
    }
};

export default function HomeScreen() {
    return (
        <div>
            <h1 style={homeStyle.title}>
                Welcome to myLocations!
            </h1>
            <div style={homeStyle.body}>
            <ul>
                <li>After cloning run 'npm install' to install the modules then run 'npm start' to launch.</li>
                <br />
                <li>I wrote this application using only functional components with React hooks.</li>
                <br />
                <li>The global state is managed using Redux.</li>
                <br />
                <li>Try dragging the markers on the maps to choose new coordinates!</li>
                <br />
                <li>Using the checkboxes you can choose which locations are shown on the location page map.</li>
                <br />
                <li>I used the React Material UI library for many of the features.</li>
                <br />
                <li>For the maps I used 'react-map-gl' and Mapbox.</li>
                <br />
                <li>The UI/UX still needs work. There are many design features I would like to work on in the future.</li>
                <br />
                <li>I didn't get around to implementing some of the filters.</li>
                <br />
                <li>I didn't implement responsiveness to various screen sizes and devices so this is best viewed on desktop.</li>
            </ul>
            <div style={homeStyle.bottomText}>
            <h4>Let me know if you have any questions.</h4>
            <h4>
                <div style={homeStyle.extraPadding}>Thank you,</div>
                <div>Josh</div>
            </h4>
            </div>
            </div>
        </div>
    )
}