"use strict";

/**
 *  移动 旋转 和缩放
 *
 * 平移
 */

 //声明平移量变量
 //旋转 计算正弦余弦  
 /**
  * 旋转等式
  *  x1=x*cos b - y*sin b
  *  y1=x*sin b + y*cos b
  */

const VSGADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main(){
    gl_Position=a_Position+u_Translation;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;

const Tx = 0.5,
  Ty = 0.5,
  Tz = 0.0;

function main() {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSGADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const index = initBuffer(gl, a_Position);

  const u_Translation=gl.getUniformLocation(gl.program,'u_Translation')
  gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0); //齐次坐标 第四个坐标为1.0则代表一个三维坐标

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
