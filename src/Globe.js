import React, {Component} from 'react'
import './App.css'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
import {select} from 'd3-selection'
import shaders from './shaders'

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
	
	initShader(gl,type,file){
		const shader = gl.createShader(type);
		gl.shaderSource(shader,shaders[file])
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
			console.error("ERROR compiling shader:",file,"\n",gl.getShaderInfoLog(shader));
		}
		else
		{
			console.log("Shader",file,"compiled successfully");
		}
		return shader;
	}
	
	createViz(){
		const canvas = document.querySelector("#glGlobeCanvas");
		const gl = canvas.getContext("webgl");
		if(!gl){
			return;	
		}
		
		//black bg

		gl.clearColor(0.0,0.0,0.0,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		
		//set up the shaders
		const vertexShader = this.initShader(gl,gl.VERTEX_SHADER,"vertex_shader2.vert");
			
		const fragmentShader = this.initShader(gl,gl.FRAGMENT_SHADER,"fragment_shader.frag");
		
		const program = gl.createProgram();
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program)
		if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
			console.error("Error linking program",gl.getProgramInfoLog(program));
			return;
		}
		
		gl.validateProgram(program);	
		if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
			console.error("Error validating program",gl.getProgramInfoLog(program));
			return;
		}


			
		const vertexPositionBuffer = gl.createBuffer();
		//Bind vertex position buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		
		const vertices =
		[
			-0.90	,-0.90,
			 0.85	,-0.90,
			-0.90	, 0.85,
		
			 0.90	,-0.85,
			 0.90	, 0.90,
			-0.85	, 0.90,
		];
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices) ,gl.STATIC_DRAW);
		const positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
		gl.vertexAttribPointer(
			positionAttribLocation,	//attribute location
			2,			//num of elems
			gl.FLOAT,		//Type
			gl.FALSE,		//Normalisation
			2*Float32Array.BYTES_PER_ELEMENT,//Size
			0			//Offset
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		/*
		let loop = ()=>{
			this.update();
			this.render();
			if(active)
				requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
		*/
		gl.useProgram(program);
		gl.drawArrays(gl.TRIANGLES,0,6);
		//this.drawScene(gl);
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
