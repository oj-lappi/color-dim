import React, {Component} from 'react'
import './App.css'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
import {select} from 'd3-selection'

class Globe extends Component {
	constructor(props){
		super(props)
		this.createViz = this.createViz.bind(this)
	}

	componentDidMount(){
		this.createViz()
	}

	componentDidUpdate(){
		this.createViz()
	}

	createViz(){

   	}

	render() {
      		return 	<canvas
			
			> 
      			</canvas>
   	}
}
export default Globe
