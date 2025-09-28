import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
// import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { gsap } from 'gsap'

/**
 * Base
 */
// const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
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

floorColor.wrapS = floorColor.wrapT = THREE.RepeatWrapping
floorColor.colorSpace = THREE.SRGBColorSpace
floorARM.wrapS = floorARM.wrapT = THREE.RepeatWrapping
floorNormal.wrapS = floorNormal.wrapT = THREE.RepeatWrapping
floorDisplacement.wrapS = floorDisplacement.wrapT = THREE.RepeatWrapping

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
roofColor.colorSpace = THREE.SRGBColorSpace
roofColor.repeat.set(3, 1)
roofARM.repeat.set(3, 1)
roofNormal.repeat.set(3, 1)
roofColor.wrapS = roofARM.wrapS = roofNormal.wrapS = THREE.RepeatWrapping

// Door
const doorColor = textureLoader.load('./door/color.webp')
const doorAlpha = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusion = textureLoader.load('./door/ambientOcclusion.webp')
const doorHeight = textureLoader.load('./door/height.webp')
const doorNormal = textureLoader.load('./door/normal.webp')
const doorMetalness = textureLoader.load('./door/metalness.webp')
const doorRoughness = textureLoader.load('./door/roughness.webp')
doorColor.colorSpace = THREE.SRGBColorSpace

// Bushes
const bushesColor = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp")
const bushesARM = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp")
const bushesNormal = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp")
const bushesDisplacement = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_disp_1k.jpg")
bushesColor.colorSpace = THREE.SRGBColorSpace
bushesColor.repeat.set(2, 1)
bushesARM.repeat.set(2, 1)
bushesNormal.repeat.set(2, 1)
bushesDisplacement.repeat.set(2, 1)
bushesColor.wrapS = bushesColor.wrapT = THREE.RepeatWrapping
bushesARM.wrapS = bushesARM.wrapT = THREE.RepeatWrapping
bushesNormal.wrapS = bushesNormal.wrapT = THREE.RepeatWrapping
bushesDisplacement.wrapS = bushesDisplacement.wrapT = THREE.RepeatWrapping

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
gravesColor.wrapS = gravesColor.wrapT = THREE.RepeatWrapping
gravesARM.wrapS = gravesARM.wrapT = THREE.RepeatWrapping
gravesNormal.wrapS = gravesNormal.wrapT = THREE.RepeatWrapping
gravesDisplacement.wrapS = gravesDisplacement.wrapT = THREE.RepeatWrapping

/**
 * House
 */
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
floor.rotation.x = -Math.PI / 2
scene.add(floor)

const house = new THREE.Group()
scene.add(house)

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

const roofDimensions = {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
    heightSegments: 64,
}
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(roofDimensions.radius, roofDimensions.height, roofDimensions.radialSegments),
    new THREE.MeshStandardMaterial({
        map: roofColor,
        aoMap: roofARM,
        roughnessMap: roofARM,
        metalnessMap: roofARM,
        normalMap: roofNormal,
    })
)
roof.position.y += wallsDimensions.height + (roofDimensions.height / 2)
roof.rotation.y = Math.PI / 4
house.add(roof)

const doorDimensions = {
    width: 2.2,
    height: 2.2,
    divisions: 128
}
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorDimensions.width, doorDimensions.height, doorDimensions.divisions, doorDimensions.divisions),
    new THREE.MeshStandardMaterial({
        color: "grey",
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
door.position.set(0, doorDimensions.height / 2, wallsDimensions.width / 2 + 0.0001)
house.add(door)

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
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

bush1.rotation.x = bush2.rotation.x = bush3.rotation.x = bush4.rotation.x = -0.75
house.add(bush1, bush2, bush3, bush4)

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

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3.125 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    const grave = new THREE.Mesh(gravesGeo, gravesMat)
    grave.position.set(x, Math.random() * 0.4, z)
    grave.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
    )
    graves.add(grave)
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#86CDFF', 0.275)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#86CDFF', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorLight = new THREE.PointLight("#ff7d46", 5)
doorLight.position.set(0, (doorDimensions.height + ((wallsDimensions.height - doorDimensions.height) * 0.5)), (wallsDimensions.width / 2) + 0.5)
house.add(doorLight)

const ghost1 = new THREE.PointLight("#8800ff", 6)
const ghost2 = new THREE.PointLight("#ff0088", 6)
const ghost3 = new THREE.PointLight("#ff0000", 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const beforeCameraPos = 100
// const afterCameraPos = 5
const afterCameraPos = window.innerWidth > 600 ? 5 : 6.25
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 90)
camera.position.set(4, 2, beforeCameraPos)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false // Disable zoom
controls.minPolarAngle = Math.PI * 0.4125 // Restrict to horizontal rotation
controls.maxPolarAngle = Math.PI * 0.475 // Restrict to horizontal rotation

controls.enabled = false

function cameraPosAnimation() {
    gsap.to(camera.position, {
        z: afterCameraPos,
        duration: 2.75,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(".contentH1", {
                opacity: 1,
                duration: 1.25,
            })
            controls.enabled = true
        }
    })
    gsap.to("#plySound", {
        opacity: 0,
        duration: 1.25,
        onComplete: () => {
            document.querySelector("#plySound").style.display = 'none'
            // console.log('ok')
        }
    })
}
document.getElementById('plySound')?.addEventListener('click', cameraPosAnimation)



// if (gui) {
//     gui.add(camera.position, "z").min(5).max(100).step(0.001).name("camera Z Position")
// }

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

directionalLight.shadow.mapSize.set(256, 256)
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.set(256, 256)
ghost1.shadow.camera.far = 10
ghost2.shadow.mapSize.set(256, 256)
ghost2.shadow.camera.far = 10
ghost3.shadow.mapSize.set(256, 256)
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(200, 200, 200)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
scene.add(sky)

/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#04343F", 0.125)

/**
 * Audio
 */
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
let audioSource = null
let audioBuffer = null
let doorAudioSource = null
let doorAudioBuffer = null
let isSoundPlaying = false

async function loadAudio() {
    try {
        const response = await fetch('./sounds/haunted.mp3')
        audioBuffer = await audioContext.decodeAudioData(await response.arrayBuffer())
    } catch (error) {
        console.error('Error loading haunted audio:', error)
    }
}

async function loadDoorAudio() {
    try {
        const response = await fetch('./sounds/boo.mp3')
        doorAudioBuffer = await audioContext.decodeAudioData(await response.arrayBuffer())
    } catch (error) {
        console.error('Error loading door audio:', error)
    }
}

function playHauntedSound() {
    if (audioContext.state === 'suspended') {
        audioContext.resume()
    }
    if (audioBuffer) {
        audioSource = audioContext.createBufferSource()
        audioSource.buffer = audioBuffer
        audioSource.connect(analyser)
        audioSource.connect(audioContext.destination)
        isSoundPlaying = true
        audioSource.onended = () => {
            isSoundPlaying = false
        }
        audioSource.start()
        audioSource.loop = true
    }
}

function playDoorSound() {
    if (audioContext.state === 'suspended') {
        audioContext.resume()
    }
    if (doorAudioBuffer) {
        doorAudioSource = audioContext.createBufferSource()
        doorAudioSource.buffer = doorAudioBuffer
        doorAudioSource.connect(audioContext.destination)
        doorAudioSource.onended = () => {
            if (modelPosition && Math.abs(modelPosition.position.z - 3) < 0.01) {
                gsap.to(modelPosition.position, {
                    z: 1,
                    duration: 1.75,
                    ease: "power2.inOut"
                })
            }
        }
        doorAudioSource.start()
    }
}

document.getElementById('plySound')?.addEventListener('click', playHauntedSound)
loadAudio()
loadDoorAudio()

const analyser = audioContext.createAnalyser()
analyser.fftSize = 256
const bufferLength = analyser.frequencyBinCount
const frequencyData = new Uint8Array(bufferLength)

/**
 * Ghost Model
 */
let modelPosition = null
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("./draco/")
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    "./model/ghost.glb",
    function (gltf) {
        const model = gltf.scene
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.userData.originalMaterial = child.material
            }
        })
        const scale = 1.75
        gltf.scene.scale.set(scale, scale, scale)
        gltf.scene.position.z = 1
        modelPosition = gltf.scene
        scene.add(gltf.scene)
        // if (gui) {
        //     gui.add(modelPosition.position, "z").min(1).max(4).step(0.001).name("Ghost Z Position")
        // }
    },
    undefined,
    function (e) {
        console.error("Model loading error:", e)
    }
)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(door)
    if (intersects.length > 0 && modelPosition && !gsap.isTweening(modelPosition.position)) {
        const targetZ = Math.abs(modelPosition.position.z - 1) < 0.01 ? 3 : 1
        playDoorSound()
        gsap.to(modelPosition.position, {
            z: targetZ,
            duration: 1.75,
            ease: "power2.inOut"
        })
    }
})

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    timer.update()
    const elapsedTime = timer.getElapsed()

    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.set(
        Math.cos(ghost1Angle) * 4,
        Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45),
        Math.sin(ghost1Angle) * 4
    )

    const ghost2Angle = -elapsedTime * 0.38
    ghost2.position.set(
        Math.cos(ghost2Angle) * 5,
        Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45),
        Math.sin(ghost2Angle) * 5
    )

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.set(
        Math.cos(ghost3Angle) * 6,
        Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45),
        Math.sin(ghost3Angle) * 6
    )

    analyser.getByteFrequencyData(frequencyData)
    let sum = 0
    const lowFreqBins = 10
    for (let i = 0; i < lowFreqBins; i++) {
        sum += frequencyData[i]
    }
    const average = sum / lowFreqBins
    const intensity = isSoundPlaying ? (3 + (average / 255) * (6 - 3)) : 5
    doorLight.intensity = intensity
    ghost1.intensity = intensity * Math.random() + Math.sin(intensity)
    ghost2.intensity = intensity * Math.random() + Math.atan(intensity)
    ghost3.intensity = intensity * Math.random() + Math.cosh(intensity)

    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()