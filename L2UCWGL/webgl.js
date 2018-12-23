const canvasSketch = require('canvas-sketch');
const random       = require('canvas-sketch-util/random');
const palettes     = require('nice-color-palettes');
const eases        = require('eases');
const BezierEasing = require('bezier-easing');

random.setSeed(random.getRandomSeed());
console.log(`Using seed ${random.getSeed()}`);

const colorCount = random.rangeFloor(2, 6);
const palette    = random.shuffle(random.pick(palettes)).slice(0, colorCount);

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate   : true,
  dimensions: [512, 512],
  fps       : 24,
  duration  : 4, //seconds
  // Get a WebGL canvas rather than 2D
  context   : 'webgl',
  // Turn on MSAA
  attributes: {antialias: true}
};

const sketch = ({context}) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#eee', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();
  const box   = new THREE.BoxGeometry(1, 1, 1);

  for (let i = 0; i < 20; i++) {

    const mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette)
      })
    );

    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.multiplyScalar(0.5);
    scene.add(mesh);
  }

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('hsl(0,0%,50%)'));
  //
  // Add some light
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(1, 3, 4);
  scene.add(light);

  //http://cubic-bezier.com/#.17,.67,.83,.67
  const easeFn = BezierEasing(.17,.67,.83,.67);

  // draw each frame
  return {
    // Handle resize events here
    resize({pixelRatio, viewportWidth, viewportHeight}) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.5;

      // Bounds
      camera.left   = -zoom * aspect;
      camera.right  = zoom * aspect;
      camera.top    = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far  = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({time, playhead}) {
      //mesh.rotation.y = time * (10 * Math.PI / 180);
      // scene.rotation.y =  playhead * Math.PI * 2;
      const t          = Math.abs(Math.sin(playhead * Math.PI * 2));
      // scene.rotation.y = eases.quadInOut(t);
      //scene.rotation.y = easeFn(t);
      // controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
