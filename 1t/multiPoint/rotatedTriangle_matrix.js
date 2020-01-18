"use strict";

/**
 * 变换矩阵
 * 矩阵和矢量的乘法
 * 使用旋转矩阵重写旋转三角形demo
 * 新坐标 = 变换矩阵 * 旧坐标
 */

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main(){
    gl_Position= u_xformMatrix*a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;

const ANGLE = 90.0;

const initBuffer = (gl, a_Position) => {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);
};

const main = () => {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");

  initBuffer(gl, a_Position);

  //按列主序存储

  //旋转矩阵
  // const radian = (Math.PI * ANGLE) / 180;
  // const sinB=Math.sin(radian);
  // const cosB=Math.cos(radian);
  // const xformMatrix=new Float32Array([
  //   cosB, sinB,  0.0,0.0,
  //   -sinB,cosB,  0.0,0.0,
  //   0.0,  0.0,   1.0,0.0,
  //   0.0,  0.0,   0.0,1.0
  // ])

  //平移矩阵
  // const Tx=0.5,Ty=0.5,Tz=0.0;
  // const xformMatrix=new Float32Array([
  //   1.0,0.0,0.0,0.0,
  //   0.0,1.0,0.0,0.0,
  //   0.0,0.0,1.0,0.0,
  //   Tx ,Ty ,Tz ,1.0
  // ])

  //缩放矩阵
  const Sx=1.0,Sy=1.5,Sz=1.0;
  const xformMatrix=new Float32Array([
    Sx ,0.0,0.0,0.0,
    0.0,Sy ,0.0,0.0,
    0.0,0.0,Sz ,0.0,
    0.0,0.0,0.0,1.0
  ])

  const u_xformMatrix=gl.getUniformLocation(gl.program,'u_xformMatrix');
  gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix)

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
