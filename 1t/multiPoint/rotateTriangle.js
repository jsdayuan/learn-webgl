"use strict";

 //旋转 计算正弦余弦  
 /**
  * 旋转等式
  *  x1=x*cos b - y*sin b
  *  y1=x*sin b + y*cos b
  */

const VSGADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB,u_SinB;
  void main(){
    gl_Position.x=a_Position.x*u_CosB-a_Position.y*u_SinB;
    gl_Position.y=a_Position.x*u_SinB+a_Position.y*u_CosB;
    gl_Position.z=a_Position.z;
    gl_Position.w=1.0;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;

const ANGLE=90.0;

function main() {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSGADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const index = initBuffer(gl, a_Position);

  const radian=Math.PI*ANGLE/180; //将角度制转为弧度制
  const cosB=Math.cos(radian)
  const sinB=Math.sin(radian)

  const u_CosB=gl.getUniformLocation(gl.program,'u_CosB');
  const u_SinB=gl.getUniformLocation(gl.program,'u_SinB');

  gl.uniform1f(u_CosB,cosB);
  gl.uniform1f(u_SinB,sinB);


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
