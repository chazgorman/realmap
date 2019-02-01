import React, { Component } from 'react'

/* First we will make a new context */
const MapContext = React.createContext()

/* Then create a provider Component */
class CounterProvider extends Component {
  state = {
    count: 0
  }

  increase = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrease = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render () {
    return (
      <MapContext.Provider
        value={{
          count: this.state.count,
          increase: this.increase,
          decrease: this.decrease
        }}
      >
        {this.props.children}
      </MapContext.Provider>
    )
  }
}

/* then make a consumer which will surface it */
const MapConsumer = MapContext.Consumer

export default CounterProvider
export { MapConsumer as CounterConsumer }