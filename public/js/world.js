var World = function() {


  var container, stats;

  var camera, scene, renderer;
  var projector;

  var light1;

  var mesh, zmesh, lightMesh, geometry;

  var mouseX = 0,
    mouseY = 0;

  var clock = new THREE.Clock();

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();


  function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    projector = new THREE.Projector();

    scene = new THREE.Scene();

    light1 = new THREE.PointLight(0xffffff, 2, 50);
    scene.add(light1);

    var sphere = new THREE.SphereGeometry(0.5, 16, 8);
    var l1 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
      color: 0xff0040
    }));
    l1.position = light1.position;
    scene.add(l1);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    renderer.autoClearColor = false;
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);
    $(container).mousehold(move);

  }

  function move() {
    light1.position.z +=10;
  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }


  //

  function animate() {

    requestAnimationFrame(animate);


    render();
    stats.update();

  }

  function render() {
    

    renderer.render(scene, camera);

  }


}