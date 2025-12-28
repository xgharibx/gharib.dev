// Custom GLSL Shaders for Ultra-Premium Visual Effects
// These create the dimensional tear, reality warping, and cosmic void effects

// ============================================================================
// COSMIC VOID - The main background shader with dimensional tears
// ============================================================================

export const cosmicVoidVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDistortion;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDistortionStrength;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Create distortion based on noise
    float noise = snoise(vec3(position.xy * 0.5, uTime * 0.1));
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, length(position.xy - uMouse * 2.0));
    
    vec3 newPosition = position;
    float distortion = noise * uDistortionStrength * (1.0 + mouseInfluence * 2.0);
    newPosition.z += distortion;
    
    vDistortion = distortion;
    vPosition = newPosition;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const cosmicVoidFragmentShader = `
  precision highp float;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDistortion;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform float uDimensionalTear;
  
  #define PI 3.14159265359
  #define TAU 6.28318530718
  
  // Fractal Brownian Motion
  float fbm(vec2 p, float time) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
      f += w * sin(p.x * 3.0 + time) * cos(p.y * 3.0 + time * 0.7);
      p = p * 2.1;
      w *= 0.5;
    }
    return f;
  }
  
  // Voronoi noise for cell-like structures
  float voronoi(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float minDist = 1.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = vec2(
          sin(dot(i + neighbor, vec2(127.1, 311.7))) * 43758.5453,
          sin(dot(i + neighbor, vec2(269.5, 183.3))) * 43758.5453
        );
        point = 0.5 + 0.5 * sin(uTime * 0.5 + 6.2831 * fract(point));
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        minDist = min(minDist, dist);
      }
    }
    return minDist;
  }
  
  // Dimensional tear effect
  vec3 dimensionalTear(vec2 uv, float time) {
    float tear = sin(uv.x * 20.0 + time) * sin(uv.y * 20.0 + time * 0.8);
    tear = smoothstep(0.98, 1.0, abs(tear));
    
    // Electric blue rifts
    vec3 tearColor = vec3(0.0, 0.8, 1.0) * tear;
    tearColor += vec3(0.5, 0.0, 1.0) * tear * sin(time * 3.0);
    
    return tearColor * uDimensionalTear;
  }
  
  // Aurora/nebula effect
  vec3 aurora(vec2 uv, float time) {
    float f = fbm(uv * 3.0, time);
    vec3 color = vec3(0.0);
    
    color += vec3(0.0, 0.5, 0.8) * smoothstep(0.3, 0.7, f + 0.3);
    color += vec3(0.5, 0.0, 0.8) * smoothstep(0.4, 0.8, f);
    color += vec3(0.0, 0.8, 0.5) * smoothstep(0.5, 0.9, f - 0.1);
    
    return color * 0.5;
  }
  
  // Quantum foam - tiny fluctuating cells
  float quantumFoam(vec2 uv, float time) {
    float foam = 0.0;
    for (float i = 1.0; i < 4.0; i++) {
      foam += voronoi(uv * (5.0 * i) + time * 0.2 * i) / i;
    }
    return foam;
  }
  
  // Black hole gravitational lensing
  vec2 gravityWarp(vec2 uv, vec2 center, float strength) {
    vec2 delta = uv - center;
    float dist = length(delta);
    float warp = 1.0 / (1.0 + dist * dist * 10.0);
    return uv + normalize(delta) * warp * strength;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 centeredUv = uv - 0.5;
    
    // Apply mouse-based gravity warping
    vec2 mousePos = uMouse * 0.5;
    uv = gravityWarp(uv, mousePos + 0.5, 0.1 * uIntensity);
    
    // Base cosmic void color
    vec3 voidColor = vec3(0.02, 0.01, 0.05);
    
    // Add deep space gradient
    float gradient = length(centeredUv) * 0.8;
    voidColor += vec3(0.05, 0.0, 0.1) * (1.0 - gradient);
    
    // Add aurora/nebula
    vec3 auroraColor = aurora(uv, uTime * 0.2);
    voidColor += auroraColor * (0.3 + 0.2 * sin(uTime * 0.1));
    
    // Add quantum foam texture
    float foam = quantumFoam(uv, uTime);
    voidColor += vec3(0.0, 0.3, 0.5) * foam * 0.1;
    
    // Add dimensional tears
    vec3 tears = dimensionalTear(uv, uTime);
    voidColor += tears;
    
    // Add pulsing energy veins
    float veins = sin(uv.x * 50.0 + uTime) * sin(uv.y * 50.0 - uTime * 0.7);
    veins = smoothstep(0.95, 1.0, abs(veins));
    voidColor += vec3(0.0, 1.0, 0.8) * veins * 0.2;
    
    // Holographic interference pattern
    float interference = sin(length(centeredUv) * 100.0 - uTime * 2.0);
    interference = smoothstep(0.8, 1.0, abs(interference));
    voidColor += vec3(0.2, 0.5, 1.0) * interference * 0.1;
    
    // Mouse proximity glow
    float mouseDist = length(centeredUv - mousePos);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist);
    voidColor += vec3(0.0, 0.5, 1.0) * mouseGlow * 0.3;
    
    // Chromatic aberration at edges
    float aberration = length(centeredUv) * 0.1;
    voidColor.r += sin(uTime * 2.0 + uv.x * 10.0) * aberration * 0.1;
    voidColor.b += sin(uTime * 2.5 + uv.y * 10.0) * aberration * 0.1;
    
    // Distortion visualization
    voidColor += vec3(0.0, 0.5, 1.0) * abs(vDistortion) * 0.5;
    
    // Vignette
    float vignette = 1.0 - length(centeredUv) * 0.8;
    voidColor *= vignette;
    
    // Final intensity adjustment
    voidColor *= uIntensity;
    
    // Ensure we don't clip
    voidColor = clamp(voidColor, 0.0, 1.0);
    
    gl_FragColor = vec4(voidColor, 1.0);
  }
`;

// ============================================================================
// REALITY FABRIC - A morphing mesh shader
// ============================================================================

export const realityFabricVertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPosition;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uWarpIntensity;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  void main() {
    vUv = uv;
    
    // Create wave displacement
    float mouseDistance = length(position.xy - uMouse * 10.0);
    float mouseWave = sin(mouseDistance * 0.5 - uTime * 3.0) * exp(-mouseDistance * 0.1);
    
    // Multi-octave noise displacement
    float elevation = 0.0;
    elevation += sin(position.x * 0.5 + uTime) * 0.3;
    elevation += sin(position.y * 0.3 + uTime * 0.7) * 0.4;
    elevation += noise(position.xy * 0.2 + uTime * 0.1) * 0.5;
    elevation += mouseWave * 2.0 * uWarpIntensity;
    
    vElevation = elevation;
    
    vec3 newPosition = position;
    newPosition.z += elevation * uWarpIntensity;
    
    vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const realityFabricFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPosition;
  
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uHighlightColor;
  uniform float uGridIntensity;
  
  void main() {
    // Grid lines
    vec2 grid = abs(fract(vUv * 50.0 - 0.5) - 0.5);
    float line = min(grid.x, grid.y);
    float gridPattern = 1.0 - smoothstep(0.0, 0.05, line);
    
    // Color based on elevation
    vec3 color = mix(uBaseColor, uHighlightColor, (vElevation + 1.0) * 0.5);
    
    // Add grid overlay
    color += vec3(0.0, 0.8, 1.0) * gridPattern * uGridIntensity;
    
    // Add glow based on elevation
    color += vec3(0.0, 0.5, 1.0) * smoothstep(0.5, 1.5, vElevation) * 0.5;
    
    // Pulse effect
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    color += vec3(0.0, 0.3, 0.5) * pulse * 0.1;
    
    // Edge fade
    float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    edgeFade *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    color *= edgeFade;
    
    gl_FragColor = vec4(color, 0.3 + gridPattern * 0.2);
  }
`;

// ============================================================================
// DIMENSIONAL PORTAL - Swirling vortex shader
// ============================================================================

export const dimensionalPortalVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const dimensionalPortalFragmentShader = `
  precision highp float;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  uniform float uTime;
  uniform float uPortalIntensity;
  uniform vec3 uPortalColor;
  
  #define PI 3.14159265359
  
  float spiral(vec2 uv, float time) {
    vec2 center = uv - 0.5;
    float angle = atan(center.y, center.x);
    float radius = length(center);
    
    float spiral = sin(angle * 5.0 + radius * 20.0 - time * 3.0);
    spiral *= smoothstep(0.5, 0.1, radius);
    
    return spiral;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 center = uv - 0.5;
    float dist = length(center);
    
    // Create swirling effect
    float angle = atan(center.y, center.x);
    float swirlAmount = (0.5 - dist) * 5.0;
    angle += swirlAmount + uTime * 0.5;
    
    // Reconstruct UVs with swirl
    vec2 swirlUv = vec2(cos(angle), sin(angle)) * dist + 0.5;
    
    // Multiple spiral layers
    float sp1 = spiral(uv, uTime);
    float sp2 = spiral(uv * 1.5, uTime * 1.2);
    float sp3 = spiral(uv * 2.0, uTime * 0.8);
    
    float combinedSpiral = sp1 * 0.5 + sp2 * 0.3 + sp3 * 0.2;
    
    // Portal colors
    vec3 color = uPortalColor;
    color += vec3(0.0, 0.3, 0.8) * combinedSpiral;
    color += vec3(0.5, 0.0, 0.8) * (1.0 - dist * 2.0);
    
    // Event horizon glow
    float eventHorizon = smoothstep(0.3, 0.0, dist);
    color += vec3(1.0, 0.5, 0.0) * eventHorizon * 0.5;
    
    // Edge ring
    float ring = smoothstep(0.45, 0.48, dist) * smoothstep(0.52, 0.48, dist);
    color += vec3(0.0, 1.0, 1.0) * ring * 2.0;
    
    // Intensity falloff
    float alpha = smoothstep(0.5, 0.2, dist) * uPortalIntensity;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// ============================================================================
// NEURAL PULSE - Synaptic firing shader for connections
// ============================================================================

export const neuralPulseVertexShader = `
  attribute float aProgress;
  
  varying float vProgress;
  varying vec3 vPosition;
  
  uniform float uTime;
  uniform float uPulseSpeed;
  
  void main() {
    vProgress = aProgress;
    vPosition = position;
    
    // Add slight wave to the line
    vec3 pos = position;
    float wave = sin(aProgress * 3.14159 * 2.0 + uTime * uPulseSpeed) * 0.1;
    pos.y += wave * (1.0 - abs(aProgress - 0.5) * 2.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const neuralPulseFragmentShader = `
  varying float vProgress;
  varying vec3 vPosition;
  
  uniform float uTime;
  uniform float uPulseSpeed;
  uniform vec3 uBaseColor;
  uniform vec3 uPulseColor;
  
  void main() {
    // Create moving pulse
    float pulse = sin((vProgress - uTime * uPulseSpeed) * 10.0);
    pulse = smoothstep(0.5, 1.0, pulse);
    
    // Fade at ends
    float fade = sin(vProgress * 3.14159);
    
    vec3 color = mix(uBaseColor, uPulseColor, pulse);
    float alpha = fade * 0.5 + pulse * 0.5;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// ============================================================================
// HOLOGRAPHIC INTERFERENCE - Rainbow shimmer effect
// ============================================================================

export const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const holographicFragmentShader = `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  
  uniform float uTime;
  uniform float uFresnelPower;
  
  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }
  
  void main() {
    vec3 viewDir = normalize(-vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);
    
    // Rainbow based on angle and time
    float hue = vUv.x + vUv.y + uTime * 0.1;
    vec3 rainbowColor = hsl2rgb(vec3(fract(hue), 0.8, 0.5));
    
    // Interference pattern
    float interference = sin(vUv.x * 100.0 + uTime * 2.0) * sin(vUv.y * 100.0 - uTime * 1.5);
    interference = smoothstep(0.8, 1.0, abs(interference));
    
    vec3 color = rainbowColor * fresnel;
    color += vec3(1.0) * interference * 0.2;
    
    float alpha = fresnel * 0.5 + interference * 0.3;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default {
  cosmicVoid: {
    vertex: cosmicVoidVertexShader,
    fragment: cosmicVoidFragmentShader,
  },
  realityFabric: {
    vertex: realityFabricVertexShader,
    fragment: realityFabricFragmentShader,
  },
  dimensionalPortal: {
    vertex: dimensionalPortalVertexShader,
    fragment: dimensionalPortalFragmentShader,
  },
  neuralPulse: {
    vertex: neuralPulseVertexShader,
    fragment: neuralPulseFragmentShader,
  },
  holographic: {
    vertex: holographicVertexShader,
    fragment: holographicFragmentShader,
  },
};
