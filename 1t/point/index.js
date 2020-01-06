const VSHADER_SOURCE =
  "void main(){\n" +
  "gl_Position=vec4(0.5,0.5,0.0,1.0);\n" +
  "gl_PointSize=10.0;\n" +
  "}\n";

const FSHADER_SOURCE =
  "void main(){\n" + "gl_FragColor=vec4(1.0, 1.0,0.0,1.0);\n" + "}\n";

function main() {
  const webgl = document.getElementById("webgl");

  const gl = webgl.getContext("webgl");

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

/**
 * attribute变量与uniform变量 与着色器进行交互 GLSL ES
 */
