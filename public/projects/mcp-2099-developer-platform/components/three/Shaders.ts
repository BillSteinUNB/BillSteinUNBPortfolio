// --- Loader Ring Shaders ---
export const ringVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ringFragmentShader = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float dist = distance(vUv, vec2(0.5));
  float ring = smoothstep(0.4, 0.45, dist) - smoothstep(0.45, 0.5, dist);
  float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
  float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.1;
  
  // Cutout segments
  float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
  float segments =Step(0.0, sin(angle * 10.0 + uTime));
  
  vec3 finalColor = uColor * ring * (0.8 + 0.2 * pulse) + scanline;
  finalColor *= segments;
  
  gl_FragColor = vec4(finalColor, ring * segments);
}
`;

// --- Globe Shaders ---
export const globeVertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying float vDisplacement;

// Simplex 3D Noise function (simplified)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vNormal = normal;
  
  float noise = snoise(position * 2.0 + uTime * 0.2);
  vDisplacement = noise;
  
  vec3 newPosition = position + normal * noise * 0.15;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const globeFragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
varying vec3 vNormal;
varying float vDisplacement;
varying vec2 vUv;

void main() {
  // Fresnel
  vec3 viewDir = normalize(cameraPosition - vNormal); // Approximation
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
  
  // Scanlines
  float scanline = sin(vUv.y * 80.0 - uTime * 2.0) * 0.1;
  
  // Mix colors based on displacement
  vec3 color = mix(uColorA, uColorB, vDisplacement * 2.5 + 0.5);
  
  // Add glow + fresnel + scanline
  vec3 finalColor = color + (vec3(1.0) * fresnel * 0.5) + scanline;
  
  // Grid overlay effect
  float gridX = step(0.98, fract(vUv.x * 20.0));
  float gridY = step(0.98, fract(vUv.y * 20.0));
  finalColor += vec3(gridX + gridY) * 0.2 * uColorB;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

// --- Brain Shaders ---
export const brainVertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vSignal;

// Classic Perlin 3D Noise 
// (Using same snoise function or simplified for brevity - reusing structure logic)
// For brevity, using simple sine displacement here to save tokens while keeping effect
void main() {
  vUv = uv;
  
  // Organic movement
  float pulse = sin(uTime * 1.5) * 0.05;
  vec3 newPos = position + normal * pulse;
  
  // "Vein" signal moving through
  float signal = sin(uv.x * 20.0 + uTime * 5.0) * sin(uv.y * 20.0 + uTime * 3.0);
  vSignal = smoothstep(0.8, 1.0, signal);
  
  if (vSignal > 0.5) {
     newPos += normal * 0.05 * vSignal;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

export const brainFragmentShader = `
uniform vec3 uBaseColor;
uniform vec3 uSignalColor;
varying float vSignal;

void main() {
  vec3 color = mix(uBaseColor, uSignalColor, vSignal);
  
  // Make signal glow
  float alpha = 0.3 + vSignal * 0.7;
  
  gl_FragColor = vec4(color, alpha);
}
`;
