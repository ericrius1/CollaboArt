var World = function() {


  var camera, scene, renderer, controls,
      particle1,light1;

      var FAR = 300;

      var clock = new THREE.Clock();

      init();
      animate();

      function init() {

        var container = document.getElementById( 'container' );

        // CAMERA

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, FAR );
        camera.position.set( 0, 15, 150 );
        camera.lookAt( new THREE.Vector3() );

        // SCENE

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x040306, 10, FAR );

        


        // TEXTURES

        var texture = THREE.ImageUtils.loadTexture( "../textures/disturb.jpg" );
        texture.repeat.set( 20, 10 );
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.format = THREE.RGBFormat;

        var texture2 = THREE.ImageUtils.loadTexture( "../textures/moon_1024.jpg" );
        texture2.repeat.set( 2, 1 );
        texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
        texture2.format = THREE.RGBFormat;

        // MATERIALS

        var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, ambient: 0x444444, map: texture } );
        var objectMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, ambient: 0x111111, specular: 0xffffff, metal: true, map: texture2 } );

        // GROUND

        var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 800, 400, 2, 2 ), groundMaterial );
        mesh.position.y = -5;
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );

        // OBJECTS

        //var objectGeometry = new THREE.CubeGeometry( 0.5, 1, 1 );
        var objectGeometry = new THREE.SphereGeometry( 1.5, 16, 8 );
        //var objectGeometry = new THREE.TorusGeometry( 1.5, 0.4, 8, 16 );

        for ( var i = 0; i < 5000; i ++ ) {

          var mesh = new THREE.Mesh( objectGeometry, objectMaterial );

          mesh.position.x = 400 * ( 0.5 - Math.random() );
          mesh.position.y = 50 * ( 0.5 - Math.random() ) + 25;
          mesh.position.z = 200 * ( 0.5 - Math.random() );

          mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
          mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );

          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();
          scene.add( mesh );

        }

        // LIGHTS

        scene.add( new THREE.AmbientLight( 0x111111 ) );

        var intensity = 2.5;
        var distance = 100;
        var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
        //var c1 = 0xffffff, c2 = 0xffffff, c3 = 0xffffff, c4 = 0xffffff, c5 = 0xffffff, c6 = 0xffffff;

        light1 = new THREE.PointLight( c1, intensity, distance );
        scene.add( light1 );

        light2 = new THREE.PointLight( c2, intensity, distance );
        scene.add( light2 );

        light3 = new THREE.PointLight( c3, intensity, distance );
        scene.add( light3 );

        light4 = new THREE.PointLight( c4, intensity, distance );
        scene.add( light4 );

        light5 = new THREE.PointLight( c5, intensity, distance );
        scene.add( light5 );

        light6 = new THREE.PointLight( c6, intensity, distance );
        scene.add( light6 );

        var dlight = new THREE.DirectionalLight( 0xffffff, 0.1 );
        dlight.position.set( 0.5, -1, 0 ).normalize();
        scene.add( dlight );

        var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );

        var l1 = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) );
        l1.position = light1.position;
        scene.add( l1 );

      
        // RENDERER

        renderer = new THREE.WebGLRenderer( { antialias: false, clearColor: 0x030303, clearAlpha: 1 } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( scene.fog.color, 1 );

        container.appendChild( renderer.domElement );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.physicallyBasedShading = true;

        // STATS

        stats = new Stats();
        container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.handleResize();

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

      }

      function render() {

        var time = Date.now() * 0.00025;
        var z = 20, d = 150;

        light1.position.x = Math.sin( time * 0.7 ) * d;
        light1.position.z = Math.cos( time * 0.3 ) * d;


        renderer.render( scene, camera );

      }

}