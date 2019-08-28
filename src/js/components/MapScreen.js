import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import MapMarker from '@material-ui/icons/Room';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { dragMapMarker } from "../actions/actions";

const mapStateToProps = state => {
    return { locations: state.locations };
};

const mapDispatchToProps = dispatch => {
    return {
        dragMapMarker: location => dispatch(dragMapMarker(location)),
    };
};

const TOKEN = 'pk.eyJ1IjoianNvcm9raW4iLCJhIjoiY2p6cmdzejZqMTdtYzNucjJraXF6bjh2NCJ9.9kSI3FXVtdjHAYRS6ycVZQ';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

const mapStyle = {
    marker: {
        color: "#4350AF"
    }
};

const MapScreen = props => {

    const [viewport, setViewport] = React.useState({
        latitude: 25,
        longitude: 0,
        zoom: 1,
        bearing: 0,
        pitch: 0,
        width: '100%',
        height: '100vh'
    });

    const onMarkerDragEnd = (e, id) => {
        props.dragMapMarker({
            latitude: e.lngLat[1],
            longitude: e.lngLat[0],
            id: id
        })
    };

    return (
        <div>
            <ReactMapGL
                {...viewport}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapStyle="mapbox://styles/jsorokin/cjzrhsoji1kte1coj7ad3ersw"
                mapboxApiAccessToken={TOKEN}
            >
                <div className="nav" style={navStyle}>
                    <NavigationControl/>
                </div>
                {props.locations.map(item => {
                        return (
                            <Marker key={item.id}
                                    latitude={parseFloat(item.latitude)}
                                    longitude={parseFloat(item.longitude)}
                                    offsetLeft={-20}
                                    offsetTop={-40}
                                    draggable
                                    onDragEnd={(e) => onMarkerDragEnd(e, item.id)}
                            >
                                <Tooltip title={item.name}>
                                    <IconButton aria-label="marker">
                                        <MapMarker style={mapStyle.marker}/>
                                    </IconButton>
                                </Tooltip>
                            </Marker>
                        )
                    }
                )}
            </ReactMapGL>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);