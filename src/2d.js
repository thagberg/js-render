var twodee = namespace('game.polys.twodee');

twodee.Quad = {
	vertices: [Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2)],

    rotate: function(theta) {
    	for (var i = 0; i < vertices.length; i++) {
    		vertices[i].rotate(theta);
    	}
    }
}

twodee.Tri = {
	vertices: [Object.create(game.vectors.Vector2),
	 		   Object.create(game.vectors.Vector2),
	 		   Object.create(game.vectors.Vector2)],

    rotate: function(theta) {
    	for (var i = 0; i < vertices.length; i++) {
    		vertices[i].rotate(theta);
    	}
    }
}