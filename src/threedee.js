var threedee = namespace('game.polys.threedee');

threedee.Quad = {
	//vertices: [],

    rotateX: function(theta) {

    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateX(theta);
    	}
    },

    rotateY: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateY(theta);
    	}
    },

    rotateZ: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateZ(theta);
    	}
    },

    rotateArb: function(theta, axis) {

    },

    translate: function(v3) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].translate(v3);
    	}
    },

    getEdges: function() {
        this.edges = [];
        this.edges[0] = this.vertices[0].y < this.vertices[1].y ?
                        threedee.newEdge(this.vertices[0], this.vertices[1]) :
                        threedee.newEdge(this.vertices[1], this.vertices[0]);
        this.edges[1] = this.vertices[1].y < this.vertices[2].y ?
                        threedee.newEdge(this.vertices[1], this.vertices[2]) :
                        threedee.newEdge(this.vertices[2], this.vertices[1]);                 
        this.edges[2] = this.vertices[2].y < this.vertices[3].y ?
                        threedee.newEdge(this.vertices[2], this.vertices[3]) :
                        threedee.newEdge(this.vertices[3], this.vertices[2]);
        this.edges[3] = this.vertices[3].y < this.vertices[0].y ?
                        threedee.newEdge(this.vertices[3], this.vertices[0]) :
                        threedee.newEdge(this.vertices[0], this.vertices[3]);

        // round off the points
        for (var i = 0; i < this.edges.length; i++) {
            p1 = this.edges[i].p1;
            p2 = this.edges[i].p2;
            p1.x = Math.round(p1.x);
            p1.y = Math.round(p1.y);
            p1.z = Math.round(p1.z);
            p2.x = Math.round(p2.x);
            p2.y = Math.round(p2.y);
            p2.z = Math.round(p2.z);
        }

        // sort based on vertical magnitude
        this.edges.sort(function(a,b) {
            return Math.abs(a.p1.y - a.p2.y) <
                Math.abs(b.p1.y - b.p2.y);
        });
        return this.edges;
    },

    area: function() {
        var tris = this.getTris();
        return tris[0].area() + tris[1].area();
    },

    getTris: function() {
        var tri1 = threedee.newTri([
            this.vertices[0],
            this.vertices[1],
            this.vertices[2]
        ]); 
        var tri2 = threedee.newTri([
            this.vertices[2],
            this.vertices[3],
            this.vertices[0]
        ]);
        return [tri1, tri2];
    }
};

threedee.newQuad = function(vertArr) {
    var q = Object.create(game.polys.threedee.Quad);
    q.vertices = [];

    if (vertArr) {
        q.vertices = vertArr;
    } else {
        for (var i = 0; i <= 3; i++) {
            q.vertices[i] = Object.create(game.vectors.Vector3);
        }
    }

    return q;
}

threedee.Tri = {
	vertices: [Object.create(game.vectors.Vector3),
			   Object.create(game.vectors.Vector3),
			   Object.create(game.vectors.Vector3)],

    rotateX: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateX(theta);
    	}
    },

    rotateY: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateY(theta);
    	}
    },

    rotateZ: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateZ(theta);
    	}
    },

    rotateArb: function(theta, axis) {

    },

    translate: function(v3) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].translate(v3);
    	}
    },

    getEdges: function() {
        this.edges = [];
        this.edges[0] = this.vertices[0].y < this.vertices[1].y ?
                        threedee.newEdge(this.vertices[0], this.vertices[1]) :
                        threedee.newEdge(this.vertices[1], this.vertices[0]);
        this.edges[1] = this.vertices[1].y < this.vertices[2].y ?
                        threedee.newEdge(this.vertices[1], this.vertices[2]) :
                        threedee.newEdge(this.vertices[2], this.vertices[1]);                 
        this.edges[2] = this.vertices[2].y < this.vertices[0].y ?
                        threedee.newEdge(this.vertices[2], this.vertices[0]) :
                        threedee.newEdge(this.vertices[0], this.vertices[2]);

        // round off the points
        for (var i = 0; i < this.edges.length; i++) {
            p1 = this.edges[i].p1;
            p2 = this.edges[i].p2;
            p1.x = Math.round(p1.x);
            p1.y = Math.round(p1.y);
            p2.x = Math.round(p2.x);
            p2.y = Math.round(p2.y);
        }

        // sort based on vertical magnitude
        this.edges.sort(function(a,b) {
            return Math.abs(a.p1.y - a.p2.y) <
                Math.abs(b.p1.y - b.p2.y);
        });
        return this.edges;
    },

    area: function() {
        var a = this.vertices[1].subtract(this.vertices[0]).length();
        var b = this.vertices[2].subtract(this.vertices[1]).length();
        var c = this.vertices[0].subtract(this.vertices[2]).length();

        // c^2 = a^2 + b^2 - 2abCos(C)
        // 2abCos(C) = a^2 + b^2 - c^2
        // Cos(C) = (a^2 + b^2 - c^2) / 2ab
        var cosC = ((Math.pow(a,2) + Math.pow(b, 2) - Math.pow(c,2)) /
                        (2 * a * b)) * (a/a * b/b * c/c);
        var C = Math.acos(cosC);
        var A = 0.5 * a * b * Math.sin(C);

        return A;
    }

};

threedee.newTri = function(vertArr) {
    var t = Object.create(game.polys.threedee.Tri);

    if (vertArr) {
        t.vertices = vertArr;
    } else {
        t.vertices = [
            game.vectors.newVector3(),
            game.vectors.newVector3(),
            game.vectors.newVector3()
        ];
    }

    return t;
};

threedee.Edge = {

};

threedee.newEdge = function(p1, p2) {
    var e = Object.create(threedee.Edge);
    if (p1.y < p2.y) {
        e.p1 = p1;
        e.p2 = p2;
    } else {
        e.p1 = p2;
        e.p2 = p1;
    }

    return e;
}