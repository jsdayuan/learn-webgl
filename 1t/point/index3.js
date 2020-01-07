const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main(){
    gl_Position=a_Position;
    gl_PointSize=10.0;
  }
`;

//精度限定词
const FSHADER_SOURCE = `
 precision mediump float;    
 uniform vec4 u_FragColor;
 void main(){
  gl_FragColor=u_FragColor;
 }
`;

function main() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  canvas.onclick = e => {
    handleClick(e, a_Position, u_FragColor, gl);
  };

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const base = 200;

let g_points = [];
//webgl中的绘制操作是在颜色缓冲区进行绘制的 绘制结束后系统将缓冲区的内容显示到屏幕上
//然后颜色缓冲区就会被重制 （默认操作）
function handleClick(e, a_Position, u_FragColor, gl) {
  const x = ((e.x - base) / base).toFixed(2);
  const y = -((e.y - base) / base).toFixed(2);
  let color;
  if (x >= 0 && y >= 0) color = [1.0, 0.0, 0.0, 1.0];
  else if (x < 0 && y < 0) color = [0.0, 1.0, 0.0, 1.0];
  else color = [0.0, 0.0, 1.0, 1.0];

  g_points.push({ x, y, color });
  gl.clear(gl.COLOR_BUFFER_BIT);
  pull(a_Position, u_FragColor, gl);
}

function pull(a_Position, u_FragColor, gl) {
  g_points.forEach(({ x, y, color }) => {
    gl.vertexAttrib2f(a_Position, x, y);

    gl.uniform4f(u_FragColor, ...color);

    gl.drawArrays(gl.POINTS, 0, 1);
  });
}
