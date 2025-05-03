function init() {
	// scene
	var scene = new THREE.Scene();
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
	const linkedInURL = 'https://linkedin.com/in/curtleonard03';
	const githubURL = 'https://github.com/cml36252';
	const resumeURL ='./Leonard_Curt.pdf'
	const clickableObjects = [];
	const rotatingLogoMeshes = [];

	// Variables for camera animation
	let isZoomed = false;
	let animationProgress = 0;
	const animationDuration = 1.0;
	let computerScreen = null;
	let originalCameraPosition = null;
	let originalCameraTarget = null;
	let zoomedCameraPosition = null;
	let zoomedCameraTarget = null;
	let originalFov = null; // Store original FOV
	
	// Portfolio overlay reference
	const portfolioOverlay = document.getElementById('portfolio-overlay');
	const closeButton = document.querySelector('.close-button');

	// Add event listener for close button if elements exist
	if (portfolioOverlay) {
		// Dynamic close button creation if it doesn't exist
		if (!closeButton) {
			closeButton = document.createElement('button');
			closeButton.className = 'close-button';
			closeButton.textContent = 'Close';
			portfolioOverlay.appendChild(closeButton);
		}
		
		// Re-attach event listener to ensure it works
		closeButton.addEventListener('click', function() {
			// Hide the portfolio overlay with fade-out effect
			portfolioOverlay.classList.remove('visible');
			
			// Wait for fade-out animation to complete before hiding
			setTimeout(() => {
				portfolioOverlay.style.display = 'none';
			}, 400);
			
			// Return camera to original position
			if (isZoomed) {
				isZoomed = false;
				animationProgress = 0;
				
				// Force camera back to original position
				camera.position.copy(originalCameraPosition);
				camera.lookAt(originalCameraTarget);
				camera.fov = originalFov;
				camera.updateProjectionMatrix();
				
				// Re-enable controls
				controls.enabled = true;
				
				// Update texture state when closing
				updatePortfolioTexture(false);
			}
		});
	}

	// Canvas Texture for Portfolio Screen
	let portfolioCanvas = null;
	let portfolioCtx = null;
	let portfolioTexture = null;

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

	// Initialize camera animation variables
	originalFov = camera.fov;
	originalCameraPosition = camera.position.clone();
	originalCameraTarget = new THREE.Vector3(0, -0.8, 0);
	zoomedCameraPosition = new THREE.Vector3(0, 0, 1.5);
	zoomedCameraTarget = new THREE.Vector3(0, 0, 0);

	// Setup Canvas Texture
	portfolioCanvas = document.createElement('canvas');
	portfolioCanvas.width = 8192; // Significantly increased texture resolution
	portfolioCanvas.height = 4096;
	portfolioCtx = portfolioCanvas.getContext('2d');
	portfolioTexture = new THREE.CanvasTexture(portfolioCanvas);
	portfolioTexture.flipY = true; // Flipped Y
	portfolioTexture.anisotropy = 16; // Improve texture quality with anisotropic filtering

	// Function to update the screen texture
	function updatePortfolioTexture(showPortfolio) {
		if (!portfolioCtx || !portfolioTexture) return;

		// Fill the entire canvas with a light blue color
		portfolioCtx.fillStyle = '#00008B';
		portfolioCtx.fillRect(0, 0, portfolioCanvas.width, portfolioCanvas.height);

		if (showPortfolio) {
			// Draw white background with text prompting user to click
			portfolioCtx.fillStyle = '#00008B';
			portfolioCtx.fillRect(20, 20, portfolioCanvas.width - 40, portfolioCanvas.height - 40); // Add some padding

			// Draw portfolio text
			portfolioCtx.font = 'bold 300px Helvetica, Arial, sans-serif';
			portfolioCtx.fillStyle = '#00008B';
			portfolioCtx.textAlign = 'center';
			portfolioCtx.textBaseline = 'middle';
			portfolioCtx.fillText('My Portfolio', portfolioCanvas.width / 2, portfolioCanvas.height / 2);
		} else {
			// Ultra simple, just plain white text on blue
			portfolioCtx.font = 'bold 1350px sans-serif';
			portfolioCtx.fillStyle = 'white';
			portfolioCtx.textAlign = 'center';
			portfolioCtx.textBaseline = 'middle';
			portfolioCtx.fillText('My Portfolio', portfolioCanvas.width / 2, portfolioCanvas.height / 2);
		}

		portfolioTexture.needsUpdate = true;
	}

	// Initial screen state (off)
	updatePortfolioTexture(false);

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
	controls.minDistance = 1; // Prevent zooming in too close
	controls.maxDistance = 7; // Prevent zooming out too far
	controls.enablePan = false; // Disable panning
	controls.panSpeed = 0.5;
	controls.minPolarAngle = Math.PI * 0.4; // Very restrictive up limit
	controls.maxPolarAngle = Math.PI * 0.5; // Restrict to horizon to prevent seeing through floor
	controls.minAzimuthAngle = -Math.PI * 0.1; // Extremely limited rotation to the left
	controls.maxAzimuthAngle = Math.PI * 0.1;  // Extremely limited rotation to the right
	controls.screenSpacePanning = true;
	controls.target.set(0, -0.8, 0); // Fix the target point

	// Raycaster for click detection
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

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

					// Find computer screen
					if (node.name.toLowerCase().includes('screen') || 
						node.name.toLowerCase().includes('monitor')) {
						computerScreen = node;
						node.userData.isClickable = true;
						clickableObjects.push(node);

						// Apply canvas texture to computer screen
						if (portfolioTexture) {
							const screenMaterial = new THREE.MeshBasicMaterial({
								map: portfolioTexture
							});
							node.material = screenMaterial;
							
							// Store the screen object's world position
							const boundingBox = new THREE.Box3().setFromObject(node);
							const screenCenter = new THREE.Vector3();
							boundingBox.getCenter(screenCenter);
							
							// Use fixed coordinates specifically targeting where the screen is in the scene
							// These are hardcoded values based on scene inspection
							zoomedCameraTarget = new THREE.Vector3(1.35, 0, -0.5); // Target center of screen
							zoomedCameraPosition = new THREE.Vector3(1.5, 0.2, 0.5); // Position directly in front
							
							// Log position info for debugging
							const worldPos = new THREE.Vector3();
							node.getWorldPosition(worldPos);
							console.log("Screen world position:", worldPos);
							console.log("Using fixed camera target:", zoomedCameraTarget);
							console.log("Using fixed camera position:", zoomedCameraPosition);
						}
					}

					if (node.material) {
						node.material.needsUpdate = true;
					}
				}
			});

			// After loading the main scene, load the logos
			loadLogo('./3d_linkedin_logo/scene.gltf', new THREE.Vector3(-2.3, -0.98, -2.3), 0.1, linkedInURL);
			loadLogo('./3d_github_logo/scene.gltf', new THREE.Vector3(-2, -0.98, -2.3), 0.1, githubURL);
			loadLogo('./floppy_disk/scene.gltf', new THREE.Vector3(-1.6, -.65, -1.8), 0.05, resumeURL, true);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.error('An error occurred while loading the model:', error);
		}
	);

	// Function to load, scale, position, and prepare logos
	function loadLogo(path, position, scale, url, isFloppy = false) {
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
						node.receiveShadow = true;
						
						// Make floppy disk brighter
						if (isFloppy && node.material) {
							// Very subtle brightness adjustment
							if (node.material.isMeshStandardMaterial || node.material.isMeshPhysicalMaterial) {
								// Minimal emissive glow
								node.material.emissive = new THREE.Color(0x050505);
								// Just slightly boost color
								if (node.material.color) {
									const color = node.material.color.clone();
									// Barely brighten the color
									color.r = Math.min(1, color.r * 1.05);
									color.g = Math.min(1, color.g * 1.05);
									color.b = Math.min(1, color.b * 1.05);
									node.material.color = color;
								}
							}
							// Ensure material updates
							node.material.needsUpdate = true;
						}
						
						// Only add to rotating meshes if not a floppy disk
						if (!isFloppy) {
							rotatingLogoMeshes.push(node);
						} else {
							// For floppy disk, we'll handle rotation differently
							node.userData.isFloppy = true;
						}
						
						// Apply URL to each mesh in the model for click detection
						node.userData.isClickable = true;
						node.userData.url = url;
						clickableObjects.push(node);
					}
				});

				// Add user data for click detection to the parent object too
				logo.userData = { isClickable: true, url: url };
				clickableObjects.push(logo);

				scene.add(logo);
				console.log(`Logo loaded from ${path}`);
			},
			undefined,
			function (error) {
				console.error(`An error occurred while loading logo ${path}:`, error);
			}
		);
	}

	function onClick(event) {
		// Calculate mouse position in normalized device coordinates (-1 to +1) for both components
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		// Update the picking ray with the camera and mouse position
		raycaster.setFromCamera(mouse, camera);

		// Calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObjects(clickableObjects, true);

		for (let i = 0; i < intersects.length; i++) {
			let targetObject = intersects[i].object;
			
			// Handle computer screen click
			if (targetObject === computerScreen || targetObject.parent === computerScreen) {
				// Toggle the zoomed state
				isZoomed = !isZoomed;
				animationProgress = 0;
				
				// If zooming in, capture current camera position/target
				if (isZoomed) {
					originalCameraPosition = camera.position.clone();
					originalCameraTarget = controls.target.clone();
					
					// Show portfolio overlay when zooming in
					if (portfolioOverlay) {
						// Show portfolio overlay after a short delay to allow camera animation
						setTimeout(() => {
							portfolioOverlay.style.display = 'block';
							// Add a small delay before adding the visible class for smooth fade-in
							setTimeout(() => {
								portfolioOverlay.classList.add('visible');
							}, 50);
						}, 800); // 800ms delay - slightly less than animation duration
					} else {
						// Fallback to the old method if overlay doesn't exist
						updatePortfolioTexture(true);
					}
				} else {
					// Hide portfolio overlay when zooming out
					if (portfolioOverlay) {
						// Fade out then hide overlay
						portfolioOverlay.classList.remove('visible');
						// Wait for fade-out animation to complete before hiding
						setTimeout(() => {
							portfolioOverlay.style.display = 'none';
						}, 400);
					} else {
						// Fallback to the old method if overlay doesn't exist
						updatePortfolioTexture(false);
					}
				}
				
				return;
			}

			// Check the clicked object and its parent chain for URL data
			let currentObj = targetObject;
			let foundURL = false;
			
			while (currentObj && !foundURL) {
				if (currentObj.userData && currentObj.userData.url) {
					window.open(currentObj.userData.url, '_blank');
					foundURL = true;
					return;
				}
				currentObj = currentObj.parent;
			}
		}
	}

	window.addEventListener('click', onClick, false);

	function update() {
		const delta = clock.getDelta();

		requestAnimationFrame(update);
		controls.update();

		// Handle camera animation
		if (animationProgress < animationDuration) {
			animationProgress += delta;
			const t = Math.min(animationProgress / animationDuration, 1);
			const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // Ease in-out

			if (isZoomed) {
				// Disable controls during zoom animation
				controls.enabled = false;
				
				camera.position.lerpVectors(originalCameraPosition, zoomedCameraPosition, easeT);
				// Use direct positioning of camera instead of lookAt to avoid snapping
				const lerpedTarget = new THREE.Vector3().lerpVectors(originalCameraTarget, zoomedCameraTarget, easeT);
				camera.lookAt(lerpedTarget);
				camera.fov = THREE.MathUtils.lerp(originalFov, 5, easeT); // Even narrower FOV for more focused view
			} else {
				// Disable controls during zoom animation
				controls.enabled = false;
				
				camera.position.lerpVectors(zoomedCameraPosition, originalCameraPosition, easeT);
				// Use direct positioning of camera instead of lookAt to avoid snapping
				const lerpedTarget = new THREE.Vector3().lerpVectors(zoomedCameraTarget, originalCameraTarget, easeT);
				camera.lookAt(lerpedTarget);
				camera.fov = THREE.MathUtils.lerp(5, originalFov, easeT); // Return FOV to original
			}
			camera.updateProjectionMatrix(); // IMPORTANT: Update matrix after FOV change
		} else if (isZoomed) {
			// When animation is complete and zoomed in, ensure camera stays pointed at screen
			camera.position.copy(zoomedCameraPosition);
			camera.lookAt(zoomedCameraTarget);
			// Keep controls disabled when zoomed in
			controls.enabled = false;
		} else {
			// Re-enable controls when zoomed out and animation complete
			controls.enabled = true;
		}

		// Rotate the logos
		rotatingLogoMeshes.forEach(mesh => {
			mesh.rotation.z += 0.5 * delta;
		});

		// Find and rotate floppy disk differently
		scene.traverse((node) => {
			if (node.isMesh && node.userData && node.userData.isFloppy) {
				// Rotate floppy on a different axis (y-axis)
				node.rotation.x += 0.5 * delta;
			}
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