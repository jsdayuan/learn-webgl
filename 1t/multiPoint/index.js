/**
 * 一次绘制多个点 缓冲区对象
 *
 * 使用缓冲区对象向顶点着色器传入多个顶点的数据 五个步骤
 *
 * 1.创建缓冲区（createBuffer）
 * 2.绑定缓冲区对象（bindBuffer）
 * 3.将数据写入缓冲区对象（bufferData）
 * 4.将缓冲区对象分配给一个attribute变量（vertexAttribPointer）
 * 5.开启attribute变量（enableVertexAttribArray）
 */

// gl_PointSize=10.0;该语句只有在绘制单个点的时候才起作用
const VSHADER_SOURCE = `
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

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const n = initBuffer(a_Position, gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  /**
   * POINTS点
   * LINES单独线端段 (v0,v1) (v2,v3)
   * LINE_STRIP连接线段 (v0,v1) (v1,v2)
   * LINE_LOOP 与STRIP相比多了一条从最后一个点到第一个点连接的线段 (v0,v1)(v1,v2)....(vn,v0)
   * TRIANGLES 一系列单独的三角形 (v0,v1,v2) (v3,v4,v5)
   * TRIANGLE_STRIP 带状三角形 (v0,v1,v2) (v1,v2,v3) (v2,v3,v4)
   * TRIANGLE_FAN 三角扇 (v0,v1,v2) (v0,v2,v3) (v0,v3,v4)
   */
  gl.drawArrays(gl.LINE_LOOP, 0, n); //绘制三角形
  /**
   * drawArrays的第一个参数mode 十分强大 可以按照不同值来绘制不同的图形
   */
}

const initBuffer = (a_Position, gl) => {
  const n = 3;
  const vertexBuffer = gl.createBuffer(); //创建缓冲区
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //绑定缓冲区对象

  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  /**
   * 数据写入
   * 将第二个参数中的数据绑定到第一个参数的缓冲区对象上
   * （不能直接向缓冲区写入对象 只能向“目标”写入数据 所以要向缓冲区写入数据 必须先绑定）
   * 第三个参数表示程序将如何使用储存在缓冲区对象中的数据 帮助webgl优化操作（static stream dynamic）
   * 传入的数据为一个特殊的数组 (类型化数组)
   */

  /**
   * 下一步 将缓冲区对象分配给attribute变量
   * 将绑定到gl.ARRAY_BUFFER得缓冲区对象分配给attribute变量
   */
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  /**
   * 最后一步 开启attribute变量
   *
   */
  gl.enableVertexAttribArray(a_Position);
  return n;
};
