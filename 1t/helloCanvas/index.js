const main = () => {
  const webgl = document.getElementById("webgl");
  const gl = webgl.getContext("webgl");
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT)
  console.log(gl, "gl");
};

/**
 * 顶点着色器 片元着色器
 * webgl程序包括运行在浏览器重的javascript和webGL系统中的着色器程序这两个部分
 * 顶点着色器指定点的位置及尺寸 片元着色器指定点的颜色
 * 笛卡尔坐标系 （右手坐标系） x y z
 */