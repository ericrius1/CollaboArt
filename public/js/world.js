var World = function() {
  var camera, scene, renderer, controls, projector;

  var FAR = 300;
  var clock = new THREE.Clock();
  var scene_lights = [];
  var wire_lights = [];
  var maxPlayers = 10;
  var lightId;
  var pitchDetect;
  var previousPitch = 0;
  var pitchDiffThreshold = 500; 
  var me;

  var comm = new Comm();

  function init() {
    comm.listen();
    pitchDetect = new PitchDetect();
    pitchDetect.init();

    var container = document.getElementById('container');

    // CAMERA

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, FAR);
    camera.position.set(0, 15, 150);
    camera.lookAt(new THREE.Vector3());
    projector = new THREE.Projector();

 

    // SCENE

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x040306, 10, FAR);

         // LIGHTS
    add_lights();

    //CONTROLS
    // controls = new THREE.TrackballControls(camera);
    // controls.target.set(0, 0, 0);

    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;

    // controls.noZoom = false;
    // controls.noPan = false;

    // controls.staticMoving = false;
    // controls.dynamicDampingFactor = 0.15;

    // controls.keys = [65, 83, 68];

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
    groundMaterial.needsUpdate = true;

  

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

    window.addEventListener('resize', onWindowResize, false);
    $(container).on('mousedown', function(event) {
      move_light(event);
    });
    $(container).mousehold(play);

    animate();
  }

  function tween(){
    var hue = map(pitchDetect.getPitch(), 0, 500, 0, 1.0);
    new TWEEN.Tween(wire_lights[lightId].color)
    .to({h: hue}, 1000)
    .easing(TWEEN.Easing.Quartic.In)
    .onUpdate(
        function()
        {
            wire_lights[lightId].color.h = this.h;
            send_update_light();
        }
    )
    .start()
    send_update_light();
    
  }

  function play(){
    wire_lights[lightId].intensity+=1;
    send_update_light();
  }

  function move_light(event) {
    var position= {x: event.clientX, y : event.clientY };
    var vector = new THREE.Vector3(
    (position.x / window.innerWidth) * 2 - 1, -(position.y / window.innerHeight) * 2 + 1,
      0.5);
    projector.unprojectVector(vector, camera);
    var dir = vector.sub(camera.position).normalize();
    var ray = new THREE.Raycaster(camera.position, dir);
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    wire_lights[lightId].position.x = pos.x;
    send_update_light(lightId);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //controls.handleResize();
  }

  function animate() {
    //only begin animating when player is asigned id
    requestAnimationFrame(animate);
    handleAudioInput();
    render();
    stats.update();
  }

  function handleAudioInput(){
    var pitch = pitchDetect.getPitch();
    if(pitch===-1)return;
    if(Math.abs(pitch - previousPitch)> pitchDiffThreshold){
      console.log(pitch);
      previousPitch = pitch;
    }
  }

  function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  }

  function render() {
    //controls.update(clock.getDelta())
    TWEEN.update();
    renderer.render(scene, camera);
  }

  function add_lights() {
    for (var i = 0; i < maxPlayers; i++) {
      scene.add(new THREE.AmbientLight(0x111111));
      var wire_light = new Light(i);
      wire_lights.push(wire_light)
      var scene_light = new THREE.PointLight(wire_light.color, wire_light.intensity, wire_light.distance);
      scene_lights.push(scene_light);
      scene.add(scene_lights[i]);
    }
  }

  function activate_light(id) {
    lightId = lightId || id;
    wire_lights[id].intensity = 5;
    wire_lights[id].position.x = -10 * Math.random() * 10;
    scene_lights[id].intensity = wire_lights[id].intensity;
    scene_lights[id].position.x = wire_lights[id].position.x;
    send_update_light();

  }

  function send_update_light() {
    comm.update_light(wire_lights[lightId]);
  }

  function recieve_update_light(light) {
    wire_lights[light.id] = light;
    scene_lights[light.id].intensity = light.intensity;
    scene_lights[light.id].position.copy(light.position);
    scene_lights[light.id].color.setHSL(light.color.h, 0.8, 0.8);
  }

  //Happens when client connects
  function recieve_update_lights(lights) {
    for (var id in lights) {
      if (lights.hasOwnProperty(id)) {
        var light = lights[id];
        wire_lights[id] = light;
        scene_lights[id].color.setHSL(light.hue, 0.8, 0.8);
      }
    }
  }

  this.move_light = move_light;
  this.activate_light = activate_light;
  this.recieve_update_light = recieve_update_light;
  this.recieve_update_lights = recieve_update_lights;
  this.send_update_light = send_update_light;
  this.init = init;
  this.renderer = renderer;
  this.scene = scene;
  me = this;
  return this;
}