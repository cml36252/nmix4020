function init() {
	// scene
	var scene = new THREE.Scene();
	// var gui = new dat.GUI(); // Removed GUI
	var clock = new THREE.Clock();

	// Lighting setup
	// Moderate ambient light
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
	scene.add(ambientLight);

	// Main sunlight coming through window - Adjusted position and intensity
	var sunLight = new THREE.DirectionalLight(0xffd7b8, 3.0);
	sunLight.position.set(-5, 3, 3);
	sunLight.castShadow = true;
	sunLight.shadow.mapSize.width = 2048;
	sunLight.shadow.mapSize.height = 2048;
	sunLight.shadow.camera.left = -20;
	sunLight.shadow.camera.right = 20;
	sunLight.shadow.camera.top = 20;
	sunLight.shadow.camera.bottom = -20;
	sunLight.shadow.camera.near = 0.1;
	sunLight.shadow.camera.far = 60;
	sunLight.shadow.bias = -0.001;
	scene.add(sunLight);
	sunLight.target.position.set(0, 1, 0);
	scene.add(sunLight.target);

	// Ceiling lights - Reduced intensity
	const ceilingLightPositions = [
		new THREE.Vector3(-1, 2.4, 0),
		new THREE.Vector3(1, 2.4, 0)
	];
	const ceilingLights = [];
	ceilingLightPositions.forEach((pos, index) => {
		const pointLight = new THREE.PointLight(0xffeeb5, 0.6, 15, 2);
		pointLight.position.copy(pos);
		pointLight.castShadow = true;
		pointLight.shadow.mapSize.width = 512;
		pointLight.shadow.mapSize.height = 512;
		pointLight.shadow.camera.near = 0.1;
		pointLight.shadow.camera.far = 25;
		pointLight.shadow.bias = -0.01;
		scene.add(pointLight);
		ceilingLights.push(pointLight);
	});

	// URLs for the logos
	const linkedInURL = 'https://linkedin.com/in/curtleonard03'; // TODO: Replace with your actual LinkedIn URL
	const githubURL = 'https://github.com/cml36252'; // TODO: Replace with your actual GitHub URL
	const clickableObjects = []; // Array to hold clickable logo objects
	const rotatingLogoMeshes = []; // Array to hold logo meshes for rotation

	// Load the office scene
	const loader = new THREE.GLTFLoader();
	loader.load(
		'./small_office/scene.gltf',
		function (gltf) {
			console.log('Model loaded successfully');
			scene.add(gltf.scene);
			
			// Adjust the scene position and scale
			gltf.scene.scale.set(2, 2, 2);
			gltf.scene.position.set(0, 0, 0);

			// Enable shadows and handle materials
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.castShadow = true;
					node.receiveShadow = true;

					// Log material details, including roughness/metalness maps
					if (node.material) {
						console.log(`Mesh: ${node.name}, Material: ${node.material.name}`);
						// Check for standard PBR material properties
						if (node.material.isMeshStandardMaterial || node.material.isMeshPhysicalMaterial) {
							console.log('  Base Color Map:', node.material.map ? node.material.map.name : 'None');
							console.log('  Normal Map:', node.material.normalMap ? node.material.normalMap.name : 'None');
							console.log('  Roughness Map:', node.material.roughnessMap ? node.material.roughnessMap.name : 'None');
							console.log('  Metalness Map:', node.material.metalnessMap ? node.material.metalnessMap.name : 'None');
							console.log(`  Roughness Value: ${node.material.roughness}, Metalness Value: ${node.material.metalness}`);
						}
					}

					// Handle desk material
					if (node.name.toLowerCase().includes('desk') || node.name.toLowerCase().includes('table')) {
						if (node.material.isMeshStandardMaterial || node.material.isMeshPhysicalMaterial) {
							node.material.color.set(0xffffff);
							node.material.roughness = 0.1;
							node.material.metalness = 0.1;
						}
					}

					// Handle window material
					if (node.name.toLowerCase().includes('window') || 
						(node.material && node.material.name && 
						node.material.name.toLowerCase().includes('window'))) {
						console.log('Found window mesh:', node.name);
						
						node.material.side = THREE.DoubleSide;
						if (node.material.isMeshStandardMaterial || node.material.isMeshPhysicalMaterial) {
							node.material.emissive = new THREE.Color(0xeeeeee);
							node.material.emissiveIntensity = 0.4;
						}
						node.material.needsUpdate = true;
					}

					// Handle backdrop
					if (node.name.toLowerCase().includes('backdrop') || 
						(node.material && node.material.name && 
						(node.material.name.toLowerCase().includes('backdrop') ||
						node.material.name.toLowerCase().includes('background')))) {
						node.visible = false;
					}

					if (node.material) {
						node.material.needsUpdate = true;
					}
				}
			});

			// After loading the main scene, load the logos
			loadLogo('./3d_linkedin_logo/scene.gltf', new THREE.Vector3(-2.3, -0.98, -2.3), 0.1, linkedInURL); // Adjusted position for bookshelf
			loadLogo('./3d_github_logo/scene.gltf', new THREE.Vector3(-2, -0.98, -2.3), 0.1, githubURL); // Adjusted position for bookshelf
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.error('An error occurred while loading the model:', error);
		}
	);

	// Function to load, scale, position, and prepare logos
	function loadLogo(path, position, scale, url) {
		const logoLoader = new THREE.GLTFLoader();
		logoLoader.load(
			path,
			function (gltf) {
				const logo = gltf.scene;
				logo.scale.set(scale, scale, scale);
				logo.position.copy(position);

				// Enable shadows for the logo
				logo.traverse((node) => {
					if (node.isMesh) {
						node.castShadow = true;
						node.receiveShadow = true; // Optional: if it should receive shadows from other objects
						rotatingLogoMeshes.push(node); // Add mesh to the array for rotation
					}
				});

				// Add user data for click detection
				logo.userData = { isClickable: true, url: url };
				clickableObjects.push(logo); // Add the main group for raycasting

				scene.add(logo);
				console.log(`Logo loaded from ${path}`);
			},
			undefined, // Progress callback (optional)
			function (error) {
				console.error(`An error occurred while loading logo ${path}:`, error);
			}
		);
	}

	// camera with adjusted clipping planes and position
	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.01,
		1000
	);

	// Set camera position and lookAt from GUI values
	camera.position.set(0.77516, 0, 8.6);
	camera.lookAt(new THREE.Vector3(0, -0.8, 0));

	// renderer with shadow mapping enabled
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(220, 220, 220)');
	renderer.physicallyCorrectLights = true;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.8;
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	var composer = new THREE.EffectComposer(renderer);
	var renderPass = new THREE.RenderPass(scene, camera);
	renderPass.renderToScreen = true;
	composer.addPass(renderPass);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.minDistance = 0.1;
	controls.maxDistance = 100;
	controls.enablePan = true;
	controls.panSpeed = 0.5;
	controls.maxPolarAngle = Math.PI;
	controls.screenSpacePanning = true;

	// Raycaster for click detection
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	function onClick(event) {
		// Calculate mouse position in normalized device coordinates (-1 to +1) for both components
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		// Update the picking ray with the camera and mouse position
		raycaster.setFromCamera(mouse, camera);

		// Calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObjects(clickableObjects, true); // Check descendants

		for (let i = 0; i < intersects.length; i++) {
			// Find the first ancestor group that is clickable
			let targetObject = intersects[i].object;
			while (targetObject && !targetObject.userData.isClickable) {
				targetObject = targetObject.parent;
			}

			if (targetObject && targetObject.userData.url) {
				window.open(targetObject.userData.url, '_blank');
				return; // Stop checking after the first hit
			}
		}
	}

	window.addEventListener('click', onClick, false);

	function update() {
		const delta = clock.getDelta(); // Get time delta for frame-rate independent animation

		requestAnimationFrame(update);
		controls.update();

		// Rotate the logos
		rotatingLogoMeshes.forEach(mesh => {
			mesh.rotation.z += 0.5 * delta; // Rotate counter-clockwise around Y axis
		});

		// Render the scene
		composer.render();
	}

	// Handle window resizing
	window.addEventListener('resize', onWindowResize, false);
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		composer.setSize(window.innerWidth, window.innerHeight);
	}

	// Start the update loop
	update();

	return scene;
}

var scene = init();