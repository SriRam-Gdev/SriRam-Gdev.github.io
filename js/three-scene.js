// Three.js 3D Interactive Character Scene
let scene, camera, renderer, character, particles = [];
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

function initThreeJS() {
  const container = document.getElementById('three-js-container');
  const loading = document.getElementById('three-loading');

  // Scene Setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e27);
  scene.fog = new THREE.Fog(0x0a0e27, 100, 1000);

  // Camera Setup
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  loading.remove();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ffcc, 1.5);
  pointLight1.position.set(5, 5, 5);
  pointLight1.castShadow = true;
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff0080, 1);
  pointLight2.position.set(-5, -5, 5);
  pointLight2.castShadow = true;
  scene.add(pointLight2);

  // Create Main Character (Neon Cube with animation)
  const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);
  
  // Create neon material with emissive glow
  const materials = [
    new THREE.MeshStandardMaterial({ 
      color: 0xff0080,
      emissive: 0xff0080,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xff0080,
      emissive: 0xff0080,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0x00ffcc,
      emissive: 0x00ffcc,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0x00ffcc,
      emissive: 0x00ffcc,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xffaa00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xffaa00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    })
  ];

  character = new THREE.Mesh(geometry, materials);
  character.castShadow = true;
  character.receiveShadow = true;
  scene.add(character);

  // Create Eyes (small spheres)
  const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1,
    metalness: 0.9,
    roughness: 0.1
  });

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.4, 0.3, 0.76);
  character.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.4, 0.3, 0.76);
  character.add(rightEye);

  // Create Particles around character
  createParticles();

  // Handle mouse movement
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);

  // Start animation
  animate();
}

function createParticles() {
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);
  particles.push(particleSystem);
}

function onMouseMove(event) {
  const container = document.getElementById('three-js-container');
  const rect = container.getBoundingClientRect();
  
  mouseX = (event.clientX - rect.left) / rect.width * 2 - 1;
  mouseY = -(event.clientY - rect.top) / rect.height * 2 + 1;

  targetRotationY = mouseX * Math.PI * 0.5;
  targetRotationX = mouseY * Math.PI * 0.5;
}

function onWindowResize() {
  const container = document.getElementById('three-js-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);

  // Smooth rotation based on mouse position
  if (character) {
    character.rotation.x += (targetRotationX - character.rotation.x) * 0.1;
    character.rotation.y += (targetRotationY - character.rotation.y) * 0.1;
    
    // Add slight bounce animation
    character.position.y = Math.sin(Date.now() * 0.001) * 0.3;
  }

  // Rotate particles
  particles.forEach((particle, index) => {
    particle.rotation.x += 0.0003;
    particle.rotation.y += 0.0005;
  });

  renderer.render(scene, camera);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initThreeJS);
