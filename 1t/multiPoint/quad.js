"use strict";

const VSGADER_SOURCE = `
  attribute vec4 a_Position;
  void main(){
    gl_Position=a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;
function main() {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSGADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const index = initBuffer(gl, a_Position);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, index);
}

const initBuffer = (gl, a_Position) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const vertices = new Float32Array([
    -0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return 4;
};
