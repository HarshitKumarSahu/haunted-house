import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";



/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()




/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor 
const floorAlpha = textureLoader.load("./floor/alpha.webp")
const floorColor = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp")
const floorARM = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp")
const floorNormal = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp")
const floorDisplacement = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp")

floorColor.repeat.set(8, 8)
floorARM.repeat.set(8, 8)
floorNormal.repeat.set(8, 8)
floorDisplacement.repeat.set(8, 8)

floorColor.wrapS = THREE.RepeatWrapping
floorColor.wrapT = THREE.RepeatWrapping
floorColor.colorSpace = THREE.SRGBColorSpace

floorARM.wrapS = THREE.RepeatWrapping
floorARM.wrapT = THREE.RepeatWrapping

floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping

floorDisplacement.wrapS = THREE.RepeatWrapping
floorDisplacement.wrapT = THREE.RepeatWrapping

// Walls
const wallsColor = textureLoader.load("./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp")
const wallsARM = textureLoader.load("./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp")
const wallsNormal = textureLoader.load("./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp")
const wallsDisplacement = textureLoader.load("./wall/castle_brick_broken_06_1k/castle_brick_broken_06_disp_1k.jpg")

wallsColor.colorSpace = THREE.SRGBColorSpace

// Roofs
const roofColor = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp")
const roofARM = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp")
const roofNormal = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp")
// const roofDisplacement = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_disp_1k.jpg")

roofColor.colorSpace = THREE.SRGBColorSpace

roofColor.repeat.set(3, 1)
roofARM.repeat.set(3, 1)
roofNormal.repeat.set(3, 1)
// roofDisplacement.repeat.set(3, 1)

roofColor.wrapS = THREE.RepeatWrapping
roofARM.wrapS = THREE.RepeatWrapping
roofNormal.wrapS = THREE.RepeatWrapping
// roofDisplacement.wrapS = THREE.RepeatWrapping

// Door
const doorColor = textureLoader.load('./door/color.jpg')
const doorAlpha = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusion = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeight = textureLoader.load('./door/height.jpg')
const doorNormal = textureLoader.load('./door/normal.jpg')
const doorMetalness = textureLoader.load('./door/metalness.jpg')
const doorRoughness = textureLoader.load('./door/roughness.jpg')

doorColor.colorSpace = THREE.SRGBColorSpace

// bushes
const bushesColor = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp")
const bushesARM = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp")
const bushesNormal = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp")
const bushesDisplacement = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_disp_1k.jpg")

bushesColor.colorSpace = THREE.SRGBColorSpace

bushesColor.repeat.set(2, 1)
bushesARM.repeat.set(2, 1)
bushesNormal.repeat.set(2, 1)
bushesDisplacement.repeat.set(2, 1)

bushesColor.wrapS = THREE.RepeatWrapping
bushesColor.wrapT = THREE.RepeatWrapping

bushesARM.wrapS = THREE.RepeatWrapping
bushesARM.wrapT = THREE.RepeatWrapping

bushesNormal.wrapS = THREE.RepeatWrapping
bushesNormal.wrapT = THREE.RepeatWrapping

bushesDisplacement.wrapS = THREE.RepeatWrapping
bushesDisplacement.wrapT = THREE.RepeatWrapping

// Graves
const gravesColor = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp")
const gravesARM = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp")
const gravesNormal = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp")
const gravesDisplacement = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_disp_1k.jpg")

gravesColor.colorSpace = THREE.SRGBColorSpace

gravesColor.repeat.set(0.4, 0.3)
gravesARM.repeat.set(0.4, 0.3)
gravesNormal.repeat.set(0.4, 0.3)
gravesDisplacement.repeat.set(0.4, 0.3)

gravesColor.wrapS = THREE.RepeatWrapping
gravesColor.wrapT = THREE.RepeatWrapping

gravesARM.wrapS = THREE.RepeatWrapping
gravesARM.wrapT = THREE.RepeatWrapping

gravesNormal.wrapS = THREE.RepeatWrapping
gravesNormal.wrapT = THREE.RepeatWrapping

gravesDisplacement.wrapS = THREE.RepeatWrapping
gravesDisplacement.wrapT = THREE.RepeatWrapping




/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 128, 128),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlpha,
        transparent: true,
        map: floorColor,
        aoMap: floorARM,
        roughnessMap: floorARM,
        metalnessMap: floorARM,
        normalMap: floorNormal,
        displacementMap: floorDisplacement,
        displacementScale: 0.35,
        displacementBias: -0.175
    })
)
floor.rotation.x = - Math.PI / 2
scene.add(floor)

// House Container
const house = new THREE.Group()
scene.add(house)

// Walls
const wallsDimensions = {
    height: 2.5,
    width: 4,
    depth: 4,
    division: 64,
}
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallsDimensions.width, wallsDimensions.height, wallsDimensions.depth, wallsDimensions.division, wallsDimensions.division, wallsDimensions.division),
    new THREE.MeshStandardMaterial({
        map: wallsColor,
        aoMap: wallsARM,
        roughnessMap: wallsARM,
        metalnessMap: wallsARM,
        normalMap: wallsNormal,
        displacementMap: wallsDisplacement,
        displacementScale: 0.1125,
        displacementBias: -0.1125
    })
)
walls.position.y += wallsDimensions.height / 2
house.add(walls)

// Roof
const roofDimensions = {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
    heightSegments: 64,
}
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(roofDimensions.radius, roofDimensions.height, roofDimensions.radialSegments),
    new THREE.MeshStandardMaterial({
        // color: "#",
        map: roofColor,
        aoMap: roofARM,
        roughnessMap: roofARM,
        metalnessMap: roofARM,
        normalMap: roofNormal,
    })
)
roof.position.y += wallsDimensions.height + (roofDimensions.height/2)
roof.rotation.y = Math.PI / 4
house.add(roof)

// Door
const doorDimensions = {
    width: 2.2,
    height: 2.2,
    divisions: 128
}
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorDimensions.width, doorDimensions.height, doorDimensions.divisions, doorDimensions.divisions),
    new THREE.MeshStandardMaterial({
        map: doorColor,
        transparent: true,
        alphaMap: doorAlpha,
        aoMap: doorAmbientOcclusion,
        displacementMap: doorHeight,
        normalMap: doorNormal,
        metalnessMap: doorMetalness,
        roughnessMap: doorRoughness,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
)
door.position.set(0, doorDimensions.height/2, wallsDimensions.width/2 + 0.0001)
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 64, 64)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#ccffcc",
    map: bushesColor,
    aoMap: bushesARM,
    roughnessMap: bushesARM,
    metalnessMap: bushesARM,
    normalMap: bushesNormal,
    displacementMap: bushesDisplacement,
    displacementScale: 0.7125,
    displacementBias: -0.1125
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

bush1.rotation.x = bush2.rotation.x = bush3.rotation.x = bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const gravesGeo = new THREE.BoxGeometry(0.6, 0.8, 0.2, 64, 64, 64)
const gravesMat = new THREE.MeshStandardMaterial({
    map: gravesColor,
    aoMap: gravesARM,
    roughnessMap: gravesARM,
    metalnessMap: gravesARM,
    normalMap: gravesNormal,
    displacementMap: gravesDisplacement,
    displacementScale: 0.0575,
    displacementBias: -0.04
})

for(let i=0; i<30; i++) {

    const angle = Math.random() * Math.PI * 2
    const radius = 3.125 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    const grave = new THREE.Mesh(gravesGeo, gravesMat);
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x =  (Math.random() - 0.5) * 0.4
    grave.rotation.y =  (Math.random() - 0.5) * 0.4
    grave.rotation.z =  (Math.random() - 0.5) * 0.4

    graves.add(grave)
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86CDFF', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86CDFF', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Point light - Door
const doorLight = new THREE.PointLight( "#ff7d46", 5);
doorLight.position.set(0, (doorDimensions.height + ((wallsDimensions.height - doorDimensions.height) * 0.5)), (wallsDimensions.width / 2) + 0.5 );
house.add(doorLight);




/**
 * Ghost
 */
const ghost1 = new THREE.PointLight( "#8800ff", 6);
const ghost2 = new THREE.PointLight( "#ff0088", 6);
const ghost3 = new THREE.PointLight( "#ff0000", 6);

scene.add(ghost1, ghost2, ghost3)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 90)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




/**
 * Shadows
 */
//Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Cast and Receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children) {
    grave.castShadow = true,
    grave.receiveShadow = true
}

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10



/**
 * Sky
 */
const sky = new Sky();

sky.scale.set(200,200,200)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.add( sky );




/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#04343F", 0.125)


/**
 * Audio
 */
// Audio setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let audioBuffer = null;

// Load and play audio
async function loadAudio() {
    try {
        const response = await fetch('./sounds/haunted.mp3'); // Replace with your audio file path
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error('Error loading audio:', error);
    }
}

// Audio analysis
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Size of frequency data (lower for faster analysis)
const bufferLength = analyser.frequencyBinCount; // Number of frequency bins
const frequencyData = new Uint8Array(bufferLength); // Array to hold frequency data

// Connect audio source to analyser
function connectAnalyser() {
    if (audioSource) {
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
    }
}

// Update play sound to include analyser
document.getElementById('plySound').addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (audioBuffer) {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        connectAnalyser(); // Connect to analyser
        audioSource.start();
        audioSource.loop = true
    }
});

// Load audio on page load
loadAudio();


/**
 * Ghost Model
*/
/**
 * Ghost Model
 */
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
    "./model/ghost.glb",
    function (gltf) {
        const model = gltf.scene;
        let meshes = [];

        // Traverse the model to collect meshes
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.userData.originalMaterial = child.material;
                meshes.push(child);
            }
        });

        // Scale and position the model
        const scale = 1.75;
        gltf.scene.scale.set(scale, scale, scale);
        gltf.scene.position.z = 3;

        // Assign modelPosition for GUI
        const modelPosition = gltf.scene;

        // Add model to scene
        scene.add(gltf.scene);

        // Add GUI controls for model position
        if (gui) { // Ensure gui is defined
            gui.add(modelPosition.position, "z")
                .min(1)
                .max(4)
                .step(0.001)
                .name("Ghost Z Position");
        } else {
            console.warn("GUI is not defined. Skipping GUI setup.");
        }
    },
    undefined,
    function (e) {
        console.error("Model loading error:", e);
    }
);
// const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("./draco/");
// gltfLoader.setDRACOLoader(dracoLoader);

// let modelPosition = null

// gltfLoader.load(
//     "./model/ghost.glb",
//     function (gltf) {
//         const model = gltf.scene;
//         let meshes = [];

//         // console.log("GLTF Animations:", gltf.animations);
//         // gltf.animations.forEach((clip, index) => {
//         //     console.log(`Animation ${index} Tracks:`, clip.tracks);
//         //     console.log(`Animation ${index} targets:`, clip.tracks.map(track => track.name));
//         // });

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//                 child.userData.originalMaterial = child.material;

//                 // const box = new THREE.Box3().setFromObject(child);
//                 // const center = box.getCenter(new THREE.Vector3());

//                 // child.position.sub(center);
//                 // child.position.x = 0.15;
//                 // child.scale.set(0.0001,0.0001,0.0001);

//                 // child.material = that.material;

//                 meshes.push(child);

//                 // console.log("Mesh:", child.name, "Material:", child.material.name);
//                 // console.log("Mesh has skeleton:", !!child.skeleton, "Skeleton:", child.skeleton);
//                 // console.log("Mesh has morph targets:", !!child.morphTargetInfluences, "Morph targets:", child.morphTargetInfluences);
//                 // console.log("Geometry attributes:", Object.keys(child.geometry.attributes));
//                 // // Log UV attributes specifically
//                 // console.log("UV attributes available:");
//                 // if (child.geometry.attributes.uv) console.log(" - uv:", child.geometry.attributes.uv);
//                 // if (child.geometry.attributes.uv1) console.log(" - uv1:", child.geometry.attributes.uv1);
//                 // if (child.geometry.attributes.uv2) console.log(" - uv2:", child.geometry.attributes.uv2);
//                 // if (child.geometry.attributes.uv3) console.log(" - uv3:", child.geometry.attributes.uv3);
//             }
//         });

//         // let mixer = null;
//         // if (gltf.animations && gltf.animations.length > 0) {
//         //     mixer = new THREE.AnimationMixer(gltf.scene);
//         //     gltf.animations.forEach((clip, index) => {
//         //         console.log(`Playing animation ${index}: ${clip.name}`);
//         //         const action = mixer.clipAction(clip);
//         //         action.setLoop(THREE.LoopRepeat);
//         //         action.timeScale = 10;
//         //         action.play();

//         //     });
//         // } else {
//         //     console.warn("No animations found in the model.");
//         // }

//         const x = 1.75

//         gltf.scene.scale.set(x,x,x)
//         gltf.scene.position.z = 3

//         modelPosition = gltf.scene

//         scene.add(gltf.scene);
//     },
//     undefined,
//     function (e) {
//         console.error("Model loading error:", e);
//     }
// );

// if (modelPosition) {
//     gui.add(modelPosition.position, "z").min(1).max(4).step(0.25);
// }


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = -elapsedTime *  0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)


    // Get frequency data
    analyser.getByteFrequencyData(frequencyData);

    // Calculate average amplitude for low frequencies (e.g., first 10 bins ~0-200 Hz)
    let sum = 0;
    const lowFreqBins = 10; // Adjust to target specific frequency range
    for (let i = 0; i < lowFreqBins; i++) {
        sum += frequencyData[i];
    }
    const average = sum / lowFreqBins;

    // Map frequency amplitude (0-255) to light intensity (e.g., 0-5)
    const intensity = (average / 255) * 5; // Scale to desired max intensity
    doorLight.intensity = intensity;
    ghost1.intensity = intensity * Math.random() + Math.sin(intensity)
    ghost2.intensity = intensity * Math.random() + Math.atan(intensity)
    ghost3.intensity = intensity * Math.random() + Math.cosh(intensity)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()