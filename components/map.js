import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.5868,
            longitude: -93.625,
            zoom: 13
        }
    };

    render() {
        return (
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoiemVraW1hIiwiYSI6ImNsc3AwN3BwZTBqMGgyaXFxZHExNTd4OGYifQ.K9WGnEYdmn-UqFsE87uG7Q"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        );
    }
}

export default Map;