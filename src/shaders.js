export default {"fragment_shader.frag":`precision mediump float;

void main()
{
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`,"vertex_shader2.vert":`precision mediump float;

attribute vec2 vertPosition;

void main()
{
	gl_Position = vec4(vertPosition, 0.0, 1.0);
}`,"vertex_shader.vert":`attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main(){
	gl_position = uProjectionMatrix * uModelViewMatrix* avertexPosition;
}`}
