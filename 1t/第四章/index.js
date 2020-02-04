/**
 * 借助动画库来实现先平移后旋转操作
 *
 * 等式1 平移后的坐标 = 平移矩阵 * 矢量
 * 然后对平移后的坐标旋转
 *
 * 等式2
 * 平移后旋转后的坐标 = 旋转矩阵 * 平移后的坐标
 *
 * 将两个等式组合起来
 * 平移后旋转后的坐标 = 旋转矩阵 * (平移矩阵 * 矢量)  == (旋转矩阵 * 平移矩阵) * 矢量
 * 将所有的变换全部复合成一个等效的变换 就得到了 模型变换（建模变换）
 * 模型变换的矩阵称为模型矩阵
 *
 */

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main(){
    gl_Position=u_ModelMatrix*a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  }
`;

const initBuffer = (gl, a_Position) => {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return 3;
};

const main = () => {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const n = initBuffer(gl, a_Position);

  const u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");

  const ANGLE = 90.0;
  const Tx = 0.5;
  const modelMatrix = new Matrix4();

  modelMatrix.setRotate(ANGLE, 0, 0, 1);
  modelMatrix.translate(Tx, 0, 0);

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
};
