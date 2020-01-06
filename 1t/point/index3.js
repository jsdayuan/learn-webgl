const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main(){
    gl_Position=a_Position;
    gl_PointSize=10.0;
  }
`;

const FSHADER_SOURCE = `
 void main(){
  gl_FragColor=vec4(1.0,0.0,0.0,1.0);
 }
`;

function main() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  canvas.onclick = e => {
    handleClick(e, a_Position,gl);
  };

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const base = 200;

let g_points = [];
function handleClick(e, a_Position,gl) {
  const x = ((e.x - base) / base).toFixed(2);
  const y = -((e.y - base) / base).toFixed(2);
  g_points.push({ x, y });
  gl.clear(gl.COLOR_BUFFER_BIT);
  pull(a_Position,gl);
}

function pull(a_Position,gl) {
  g_points.forEach(({ x, y }) => {
    gl.vertexAttrib2f(a_Position,x, y);
    gl.drawArrays(gl.POINTS, 0, 1);
  });
}
