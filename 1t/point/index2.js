// const VSHADER_SOURCE =
//   "attribute vec4 a_Position;\n" + //attribute 储存限定符
//   "attribute float a_PointSize;\n" +
//   "void main(){\n" +
//   "gl_Position = a_Position;\n" +
//   "gl_PointSize = a_PointSize;\n" +
//   "}\n";

//attribute 储存限定符
const VSHADER_SOURCE = `
  attribute vec4 a_Position; 
  attribute float a_PointSize;
  void main(){
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
  }`;

const FSHADER_SOURCE =
  "void main(){\n" + "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" + "}";

function main() {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

  gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
  gl.vertexAttrib1f(a_PointSize, 20.0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
