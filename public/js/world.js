var World = function() {


  var camera, scene, renderer, controls, projector,
    particle1, light1;

  var FAR = 300;

  var clock = new THREE.Clock();

  init();
  animate();

  function init() {

    var container = document.getElementById('container');

    // CAMERA

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, FAR);
    camera.position.set(0, 15, 150);
    camera.lookAt(new THREE.Vector3());
    projector = new THREE.Projector();

    // SCENE

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x040306, 10, FAR);

    //CONTROLS
    controls = new THREE.TrackballControls(camera);
    controls.target.set(0, 0, 0);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.15;

    controls.keys = [65, 83, 68];


    // TEXTURES

    var texture = THREE.ImageUtils.loadTexture("../textures/disturb.jpg");
    texture.repeat.set(20, 10);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;

    var texture2 = THREE.ImageUtils.loadTexture("../textures/moon_1024.jpg");
    texture2.repeat.set(2, 1);
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.format = THREE.RGBFormat;

    // MATERIALS

    var groundMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      ambient: 0x444444,
      map: texture
    });
    var objectMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      ambient: 0x111111,
      specular: 0xffffff,
      metal: true,
      map: texture2
    });

    // GROUND

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(800, 400, 2, 2), groundMaterial);
    mesh.position.y = -5;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    // OBJECTS

    //var objectGeometry = new THREE.CubeGeometry( 0.5, 1, 1 );
    var objectGeometry = new THREE.SphereGeometry(1.5, 16, 8);
    //var objectGeometry = new THREE.TorusGeometry( 1.5, 0.4, 8, 16 );

    for (var i = 0; i < 1000; i++) {

      var mesh = new THREE.Mesh(objectGeometry, objectMaterial);

      mesh.position.x = 400 * (0.5 - Math.random());
      mesh.position.y = 50 * (0.5 - Math.random()) + 25;
      mesh.position.z = 200 * (0.5 - Math.random());

      mesh.rotation.y = 3.14 * (0.5 - Math.random());
      mesh.rotation.x = 3.14 * (0.5 - Math.random());

      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      scene.add(mesh);

    }

    // LIGHTS

    scene.add(new THREE.AmbientLight(0x111111));

    var intensity = 11;
    var distance = 200;
    var c1 = 0xff11ff;

    light1 = new THREE.PointLight(c1, intensity, distance);
    light1.position.z = 11;
    console.log(light1.position.z);
    scene.add(light1);



    var dlight = new THREE.DirectionalLight(0xffffff, 0.1);
    dlight.position.set(0.5, -1, 0).normalize();
    scene.add(dlight);

    var sphere = new THREE.SphereGeometry(0.25, 16, 8);

    var l1 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
      color: c1
    }));
    l1.position = light1.position;
    scene.add(l1);


    // RENDERER

    renderer = new THREE.WebGLRenderer({
      antialias: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 1);

    container.appendChild(renderer.domElement);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;

    // STATS

    stats = new Stats();
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

  }

  //

  function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

  }

  function render() {

    var time = Date.now() * 0.00025;
    var z = 20,
      d = 150;
    controls.update( clock.getDelta() );
    renderer.render(scene, camera);

  }

}