CG.B2DTerrain.extend('MyTerrain', {
    init: function (world, name, image, terrainPoly, x, y, scale, b2BodyType, bullet) {
        //custom bodydef
        this.bodyDef = new b2BodyDef
        this.bodyDef.allowSleep = true
        this.bodyDef.awake = true

        //custom fixture def
        this.fixDef = new b2FixtureDef
        this.fixDef.density = 0
        this.fixDef.friction = 0
        this.fixDef.restitution = 0

        this._super(world, name, image, terrainPoly, x, y, scale, b2BodyType, bullet)
    }
})
