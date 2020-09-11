import React from 'react'
import CardList from '../components/CardList'
import Search from '../components/Search'
import Header from '../components/Header'
import Scroll from '../components/Scroll'
import Loading from '../components/Loading'

import 'tachyons'


class App extends React.Component {
    constructor() {
      super()
      this.state = {
        robots: [],
        searchfield: '',
        firstTime: true
      }
    }
  
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {this.setState({ robots: users})});
    }
  
    onSearchChange = (event) => {
      this.setState({ searchfield: event.target.value, firstTime : false});

    }
  
    render() {
      const { robots, searchfield } = this.state;
      const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
      })

      console.log(filteredRobots);
      if(filteredRobots.length === 0 && this.state.firstTime) return (<Loading type='ball' color='red'/>);
      else return (
          <div className='tc'>
            <Header />
            <Search searchChange={this.onSearchChange}/>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </div>
        );
    }
}

export default App;