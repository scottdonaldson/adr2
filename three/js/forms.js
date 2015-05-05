(function() {

    function generateTexture(height) {

    	var canvas = document.createElement( 'canvas' );
    	canvas.width = 32;
    	canvas.height = height || 100;

    	var context = canvas.getContext( '2d' );
    	context.fillStyle = '#ffffff';
    	context.fillRect( 0, 0, 32, height );

    	for ( var y = 10; y < height; y += 10 ) {

    		for ( var x = 0; x < 32; x += 1 ) {

    			var value = Math.floor( Math.random() * 255 / 3 );
    			context.fillStyle = 'rgb(' + [ value, value, value ].join( ',' )  + ')';
    			context.fillRect( x, y, 1, 10 / 2 );
    		}
    	}

    	var canvas2 = document.createElement( 'canvas' );
    	canvas2.width = 512;
    	canvas2.height = 1024;

    	var context = canvas2.getContext( '2d' );
    	context.imageSmoothingEnabled = false;
    	context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );

    	return canvas2;
    }

    Building = function(obj) {

        var x = obj.x || 0,
            y = obj.y || -1,
            z = obj.z || 0,
            width = obj.width || 10,
            height = obj.height || 10,
            depth = obj.depth || 10,
            color = obj.color || '#fff';

        var geometry = Box(width, height, depth);
        geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );

        // change UVs for the top face
        // - it is the roof so it wont use the same texture as the side of the building
        // - set the UVs to the single coordinate 0,0. so the roof will be the same color
        //   as a floor row.
        [4, 5].forEach(function(n) {
            var i = 0;
            while (i <= 2) {
                geometry.faceVertexUvs[0][n][i] = 0;
                i++;
            }
        });

        var light = new THREE.Color( 0xffffff );
        var shadow  = new THREE.Color( 0x303050 );

        var value = 1 - Math.random() * Math.random();
        var baseColor = new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );

        var top  = baseColor.clone().multiply( light );
        var bottom = baseColor.clone().multiply( shadow );

        for ( var j = 0; j < geometry.faces.length; j++ ) {
            if ( j === 2 ) {
                // set face.vertexColors on root face
                geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
            } else {
                // set face.vertexColors on sides faces
                geometry.faces[ j ].vertexColors = [ top, bottom, bottom, top ];
            }
        }

        var texture = new THREE.Texture( generateTexture(height) );
        texture.anisotropy = this.renderer.getMaxAnisotropy();
		texture.needsUpdate = true;

        var cube = this.mesh( geometry, Material('lambert', {
            color: color,
            map: texture,
            vertexColors: THREE.VertexColors
        }));

        cube.position.x = x;
        cube.position.y = y + height / 2;
        cube.position.z = z;

        this.scene.add(cube);

        return cube;
    }

    Building.generateTexture = generateTexture;

    Texture = function(color) {
        var canvas = document.createElement( 'canvas' );
    	canvas.width = 32;
    	canvas.height = 32;

    	var context = canvas.getContext( '2d' );
    	context.fillStyle = color || '#f00';
    	context.fillRect( 0, 0, 32, 32 );

    	var canvas2 = document.createElement( 'canvas' );
    	canvas2.width = 32;
    	canvas2.height = 32;

    	var context = canvas2.getContext( '2d' );
    	context.imageSmoothingEnabled = false;
    	context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );

    	// return canvas2;

        return new THREE.Texture(canvas2);
    }

})();
