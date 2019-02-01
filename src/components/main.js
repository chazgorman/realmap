import Link from 'next/link'
import Card from './card'

class Main extends React.Component {
    render(){
        return (
            <div className="columns is-gapless" style={{ width: '100%', height: '100%' }}>
                <div className="column">
                <Card />
                </div>
                <div className="column">
                <div id="map" style={{ width: '100%', height: '100%' }} />          
                </div>
            </div>
        );
    }
}

export default Main;