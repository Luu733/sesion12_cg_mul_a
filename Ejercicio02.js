//Crea una escena en la que estarán todos nuestros elementos como objetos, camaras y luces. 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // Añade "cube" a la escena.
    scene.add(cube);
    return(cube);
}
function init() {

    //Crea una cámara, la cual define a dónde estamos mirando.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Se crea un render y se establece el tamaño.
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Muestra los ejes en pantalla.
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //Se agrega luz.

   light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( -10, 10, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 


    Cubo = [];   // Definir un array unidimensional para almacenar tres cubos
    dim = 8; //Valor dimensiones iniciales de los cubos.
    delta= dim/2;
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2));
    valor= diagonal-delta;
    Angulo = ((Math.PI)/4);
    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); //Se agrega el cubo 0.

    Cubo.push(cubo(dim, dim, dim, 'green', 'Physical', false)); //Se agrega el cubo 1.

    Cubo.push(cubo(dim, dim, dim, 'yellow', 'Physical', false)); //Se agrega el cubo 2.

    for(i=0; i<3; i++){  //Se trasladan los tres cubos con uno de sus vértices al origen de coordenadas.

      Cubo[i].translateX(dim/2); 
      Cubo[i].translateZ(dim/2); 
      Cubo[i].translateY(dim/2); 
    }
    
    for(i=1; i<3; i++){ //Transformaciones de escalado y traslación sobre el eje y.

        escala= 1/(2*i); //Escalado a la mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); //Da la posición para que los cubos queden superpuestos.
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    for(i=0; i<3; i++){ 

      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor);  
    }
    Cubo[0].rotateY(Angulo);
    Cubo[2].rotateY(Angulo);


    //Posicionamiento de la cámara
    camera.position.set(0, 50, 0);
    camera.lookAt(scene.position);

    //Agrega la salida del render al elemento html.
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // renderiza la escena.
    renderer.render(scene, camera);
}