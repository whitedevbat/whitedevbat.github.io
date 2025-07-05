const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 30;

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 50;
    velocities[i] = (Math.random() - 0.5) * 0.01;
    velocities[i + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i + 2] = (Math.random() - 0.5) * 0.01;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x40c4ff,
    transparent: true,
    opacity: 0.8
});
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(particlesMesh);

    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (positions[i] > 50) positions[i] = -50;
        if (positions[i] < -50) positions[i] = 50;
        if (positions[i + 1] > 50) positions[i + 1] = -50;
        if (positions[i + 1] < -50) positions[i + 1] = 50;
        if (positions[i + 2] > 25) positions[i + 2] = -25;
        if (positions[i + 2] < -25) positions[i + 2] = 25;

        if (intersects.length > 0) {
            const dist = Math.sqrt(
                Math.pow(positions[i] - intersects[0].point.x, 2) +
                Math.pow(positions[i + 1] - intersects[0].point.y, 2) +
                Math.pow(positions[i + 2] - intersects[0].point.z, 2)
            );
            if (dist < 5) {
                velocities[i] += (Math.random() - 0.5) * 0.05;
                velocities[i + 1] += (Math.random() - 0.5) * 0.05;
                velocities[i + 2] += (Math.random() - 0.5) * 0.05;
            }
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});