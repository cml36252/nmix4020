function init() {
	var scene = new THREE.Scene();

	var mesh = getBox(1, 1, 1);
	scene.add(mesh)

	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);
	camera.position.z = 5;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);
	renderer.render(
		scene,
		camera 
	);
}

function getBox(w,h,d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	})

	var mesh = new THREE.Mesh(geometry, material)

	return mesh;
	
}

init();