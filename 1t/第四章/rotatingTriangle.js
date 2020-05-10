//顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main(){
    gl_Position=u_ModelMatrix*a_Position;
  };
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
  };
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

//旋转速度（度/秒）
const ANGLE_STEP = 45.0;

const main = () => {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const n = initBuffer(gl, a_Position);

  const u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');

  //三角形当前旋转角度
  let currentAngle=0.0;
};
