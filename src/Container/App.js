
import { Component } from 'react'
import Cardlist from '../Components/Cardlist'
import Searchbox from '../Components/Searchbox'
import Scroll from '../Components/Scroll'
import './App.css'
import ErrorBoundry from '../Components/ErrorBoundry'




class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            Searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({Searchfield: event.target.value})
        
    }

    render(){
        const {robots, Searchfield} = this.state
        const filterRobot = robots.filter(robots => {
            return robots.name.toLowerCase().includes(Searchfield.toLowerCase())
        })
        
        return (!robots.length)?
            <h1>Loading</h1> : 
            (
                <div className='tc'>
                    <h1 className='f2'>RoboSibling</h1>
                    <Searchbox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filterRobot}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
       
    }
    


export default App;