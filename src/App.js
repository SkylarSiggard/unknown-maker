import React, {Component} from 'react'
import axios from 'axios'
import './App.css'

class Unknown extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      unknowns: [],
      name: []
    }
  }
  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon/unown/').then(res => {
      this.setState({
        unknowns: res.data.forms
      })
    })
  }
  handleChange = (e, key) => {
    this.setState({
        [key]: e.target.value
    })
}
  handleEnter = (str) => {
        for (let i = 0; i < str.length; i++) {
          for(let j = 0; j < this.state.unknowns.length; j++) {
            if (`unown-${str[i]}` === this.state.unknowns[j].name){
              axios.get(`${this.state.unknowns[j].url}`).then(res => {
                this.state.name.push({unown: res.data.sprites.front_default, order: i})
              })
              // if (this.state.name.length > 0) {
              //   this.state.name.map((el, i) => {
              //     console.log('map', el)
              //   })
              // }
            }
          }
        }
  }
  render() {
    return (
      <div className="App">
        <div className="inputs">
        <input onChange={(e) => this.handleChange(e, 'input')} type="text" placeholder='Name'/>
        <button onClick={() => this.handleEnter(this.state.input) }>Enter</button>
        </div>
        <div className="name-time">
          {this.state.name.length ? (
            this.state.name.map((el, i) => {
              return (
                <div className='items'>
                  <img src={el.unown} alt="a pokemon"/>
                </div>
              )
            })
          ) : (
            <h1>Input a name</h1>
          )
            }
        </div>
    </div>
  );
}
}

export default Unknown;
