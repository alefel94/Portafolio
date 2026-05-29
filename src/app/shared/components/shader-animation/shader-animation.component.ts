import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shader-animation',
  standalone: true,
  template: `<canvas #canvas class="shader-canvas"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: -15%;
      left: 0;
      right: 0;
      height: 130%;
      z-index: 0;
      will-change: transform;
    }
    .shader-canvas {
      width: 100%;
      height: 100%;
      display: block;
      touch-action: none;
      background: black;
    }
  `]
})
export class ShaderAnimationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private gl!: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private animationId?: number;
  private isLightTheme = false;
  private themeObserver?: MutationObserver;

  // Pointer / interaction state
  private pointers = new Map<number, [number, number]>();
  private lastCoords: [number, number] = [0, 0];
  private moves: [number, number] = [0, 0];
  private active = false;

  // Uniform locations (nullable — shader may not declare all of them)
  private uResolution: WebGLUniformLocation | null = null;
  private uTime: WebGLUniformLocation | null = null;
  private uMove: WebGLUniformLocation | null = null;
  private uTouch: WebGLUniformLocation | null = null;
  private uPointerCount: WebGLUniformLocation | null = null;
  private uPointers: WebGLUniformLocation | null = null;

  // ── Vertex shader (fullscreen quad) ────────────────────────────────────────
  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

  // ── Dark theme shader — diagonal streaks ───────────────────────────────────
  private readonly darkFragmentSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time * 0.05;
  float lineWidth = 0.002;
  vec3 color = vec3(0.0);
  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 5; i++) {
      color[j] += lineWidth * float(i * i) / abs(
        fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
        - length(uv)
        + mod(uv.x + uv.y, 0.2)
      );
    }
  }
  O = vec4(color[0], color[1], color[2], 1.0);
}`;

  // ── Light theme shader — cloud / nebula by Matthias Hurrle (@atzedent) ─────
  private readonly fragmentSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T  time
#define R  resolution
#define MN min(R.x, R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  float a = rnd(i),
        b = rnd(i + vec2(1, 0)),
        c = rnd(i + vec2(0, 1)),
        d = rnd(i + 1.);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float t = .0, a = 1.;
  mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2. * m;
    a *= .5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1., t = .0;
  for (float i = .0; i < 3.; i++) {
    float a = d * fbm(i * 10. + p.x * .2 + .2 * (1. + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2. / (i + 1.);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - .5 * R) / MN, st = uv * vec2(2, 1);
  vec3 col = vec3(0);
  float bg = clouds(vec2(st.x + T * .5, -st.y));
  uv *= 1. - .3 * (sin(T * .2) * .5 + .5);
  for (float i = 1.; i < 12.; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .5 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    col += .00125 / d * (cos(sin(i) * vec3(1, 2, 3)) + 1.);
    float b = noise(i + p + bg * 1.731);
    col += .002 * b / length(max(p, vec2(b * p.x * .02, p.y)));
    col = mix(col, vec3(bg * .25, bg * .137, bg * .05), d);
  }
  O = vec4(col, 1);
}`;

  private readonly quadVertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);

  ngAfterViewInit(): void {
    this.initWebGL();
    this.bindPointerEvents();
    this.resize();
    window.addEventListener('resize', this.resize, false);
    this.animationId = requestAnimationFrame(this.loop);

    this.themeObserver = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light-theme');
      if (isLight !== this.isLightTheme) {
        this.isLightTheme = isLight;
        this.swapShader();
      }
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // ── WebGL2 setup ────────────────────────────────────────────────────────────
  private initWebGL(): void {
    const canvas = this.canvasRef.nativeElement;
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.warn('WebGL2 not supported — shader animation disabled.');
      return;
    }
    this.gl = gl;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.quadVertices, gl.STATIC_DRAW);

    this.buildProgram(this.darkFragmentSrc);
  }

  private buildProgram(fragmentSrc: string): void {
    const gl = this.gl;
    if (!gl) return;

    if (this.program) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }

    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compileShader(this.vs, this.vertexSrc);
    this.compileShader(this.fs, fragmentSrc);

    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Shader link error:', gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    const posLoc = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    this.uResolution   = gl.getUniformLocation(this.program, 'resolution');
    this.uTime         = gl.getUniformLocation(this.program, 'time');
    this.uMove         = gl.getUniformLocation(this.program, 'move');
    this.uTouch        = gl.getUniformLocation(this.program, 'touch');
    this.uPointerCount = gl.getUniformLocation(this.program, 'pointerCount');
    this.uPointers     = gl.getUniformLocation(this.program, 'pointers');
  }

  private swapShader(): void {
    this.buildProgram(this.isLightTheme ? this.fragmentSrc : this.darkFragmentSrc);
  }

  private compileShader(shader: WebGLShader, src: string): void {
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
    }
  }

  // ── Resize: match canvas pixel size to its CSS size ────────────────────────
  private resize = (): void => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.gl) return;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  };

  // ── Render loop ─────────────────────────────────────────────────────────────
  private loop = (now: number): void => {
    this.animationId = requestAnimationFrame(this.loop);
    if (!this.gl || !this.program) return;

    const gl     = this.gl;
    const canvas = this.canvasRef.nativeElement;
    const first  = this.getFirst();
    const coords = this.getCoords();

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    if (this.uResolution)   gl.uniform2f(this.uResolution, canvas.width, canvas.height);
    if (this.uTime)         gl.uniform1f(this.uTime, now * 1e-3);
    if (this.uMove)         gl.uniform2f(this.uMove, this.moves[0], this.moves[1]);
    if (this.uTouch)        gl.uniform2f(this.uTouch, first[0], first[1]);
    if (this.uPointerCount) gl.uniform1i(this.uPointerCount, this.pointers.size);
    if (this.uPointers)     gl.uniform2fv(this.uPointers, coords);

    this.moves = [0, 0];

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  // ── Pointer helpers ─────────────────────────────────────────────────────────
  private mapCoords(x: number, y: number): [number, number] {
    const canvas = this.canvasRef.nativeElement;
    const dpr    = Math.max(1, 0.5 * window.devicePixelRatio);
    return [x * dpr, canvas.height - y * dpr];
  }

  private getFirst(): [number, number] {
    const first = this.pointers.values().next().value;
    return first !== undefined ? first : this.lastCoords;
  }

  private getCoords(): number[] {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }

  private bindPointerEvents(): void {
    const canvas = this.canvasRef.nativeElement;

    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      this.active = true;
      this.pointers.set(e.pointerId, this.mapCoords(e.clientX, e.clientY));
    });

    canvas.addEventListener('pointerup', (e: PointerEvent) => {
      if (this.pointers.size === 1) this.lastCoords = this.getFirst();
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    canvas.addEventListener('pointerleave', (e: PointerEvent) => {
      if (this.pointers.size === 1) this.lastCoords = this.getFirst();
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, this.mapCoords(e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.themeObserver?.disconnect();
    window.removeEventListener('resize', this.resize);

    const gl = this.gl;
    if (gl && this.program) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      if (this.buffer) gl.deleteBuffer(this.buffer);
      gl.deleteProgram(this.program);
    }
  }
}
