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
		const canvas = document.querySelector("#glGlobeCanvas");
		const gl = canvas.getContext("webgl");
		if(!gl){
			return;	
		}
		
		gl.clearColor(0.0,0.0,0.0,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		const buffers = this.initBuffers(gl);
		const shaders = this.initShaders(gl);

		
		//Bind vertex position buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers["vposb"]);
		
		this.drawTriangle(gl);
   	}

	initShaders(gl){
		const vsSource = `
			attribute vec4 aVertexPosition;
			
			uniform mat4 uModelViewMatrix;
			uniform mat4 uProjectionMatrix;

			void main(){
				gl_position = uProjectionMatrix * uModelViewMatrix* avertexPosition;
			}
		`;

		return {
			"vertex":vsSource
		};
	}


	initBuffers(gl){
		const vertexPositionBuffer = gl.createBuffer();
		

		return {
			"vposb":vertexPositionBuffer

		};
	}
	drawTriangle(gl){
		const vertices =
		[
			-0.90	,-0.90,  0.0,
			 0.85	,-0.90,  0.0,
			-0.90	, 0.85,  0.0,
		
			 0.90	,-0.85,  0.0,
			 0.90	, 0.90,  0.0,
			-0.85	, 0.90,  0.0
		];
		
		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
		//this.drawScene();
	}	
	drawScene(gl){
		gl.viewport(0,0,gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	}
	render() {
      		return 	<canvas
			id ="glGlobeCanvas"	
			width="500" height="500"
			> 

      			</canvas>
   	}
}
export default Globe
