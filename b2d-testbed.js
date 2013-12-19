CG.B2DWorld.extend('B2DTestbed', {
    init: function (name) {
        this._super(name)

        var fixDef = new b2FixtureDef
        fixDef.density = 1.0
        fixDef.friction = 0.5
        fixDef.restitution = 0.5

        var bodyDef = new b2BodyDef

        //create ground
        bodyDef.type = box2d.b2BodyType.b2_staticBody
        // positions the center of the object (not upper left!)
        bodyDef.position.x = Game.width2 / this.scale
        bodyDef.position.y = (Game.height / this.scale) - 1
        bodyDef.userData = 'ground'
        fixDef.shape = new b2PolygonShape
        // half width, half height. eg actual height here is 1 unit
        fixDef.shape.SetAsBox((Game.width / this.scale) / 2, 0.5 / 2)
        this.world.CreateBody(bodyDef).CreateFixture(fixDef)


        //create wall1
        bodyDef.type = box2d.b2BodyType.b2_staticBody
        // positions the center of the object (not upper left!)
        bodyDef.position.x = 10 / this.scale
        bodyDef.position.y = (Game.height2 / this.scale) - 1
        bodyDef.userData = 'wall left'
        fixDef.shape = new b2PolygonShape;
        // half width, half height. eg actual height here is 1 unit
        fixDef.shape.SetAsBox(0.5 / 2, (Game.width / this.scale) / 2)
        this.world.CreateBody(bodyDef).CreateFixture(fixDef)

        //create wall2
        bodyDef.type = box2d.b2BodyType.b2_staticBody
        // positions the center of the object (not upper left!)
        bodyDef.position.x = (Game.width - 10) / this.scale
        bodyDef.position.y = (Game.height2 / this.scale) - 1
        bodyDef.userData = 'wall right'
        fixDef.shape = new b2PolygonShape
        // half width, half height. eg actual height here is 1 unit
        fixDef.shape.SetAsBox(0.5 / 2, (Game.width / this.scale) / 2)
        this.world.CreateBody(bodyDef).CreateFixture(fixDef)

        haus2 = new CG.B2DNoCollisionBody(this.world, 'haus2', Game.asset.getImageByName('haus2'), Game.asset.getJsonByName('haus2'), 320 , 424, this.scale, box2d.b2BodyType.b2_staticBody, false)
        this.addCustom(haus2)
        
        baum2 = new CG.B2DNoCollisionBody(this.world, 'baum2', Game.asset.getImageByName('baum2'), Game.asset.getJsonByName('baum2'), 680, 375, this.scale, box2d.b2BodyType.b2_staticBody, false)
        this.addCustom(baum2)

        leftplayer = new CG.B2DLeftPlayer(this.world, 'spritetestphysics', Game.asset.getImageByName('spritetestphysics'), Game.asset.getJsonByName('spritetestphysics'), 610, 110, this.scale, box2d.b2BodyType.b2_dynamicBody, false)
        this.addCustom(leftplayer)

        gold = new CG.B2DGoldMine(this.world, 'gold', Game.asset.getImageByName('gold'), Game.asset.getJsonByName('gold'), 680, 510, this.scale, box2d.b2BodyType.b2_staticBody, false)
        this.addCustom(gold)
        
        this.createCircle('redrock', Game.asset.getImageByName('redrock'), 16, 230, -120, box2d.b2BodyType.b2_dynamicBody)
               
		button = new CG.Button(Game.asset.getImageByName('axt'), new CG.Point(20, 20), 'Button', small, buttonCallback) 
		button.name = 'button'
		button.visible = false
		mainlayer.addElement(button)
		
		buttonhaus = new CG.Button(Game.asset.getImageByName('arrow-25'), new CG.Point(20, 20), 'Button', small, buttonhausCallback) 
		buttonhaus.name = 'button'
		buttonhaus.visible = false
		mainlayer.addElement(buttonhaus)

    	this.addContactListener({
            BeginContact: function (idA, idB) {
            	if (typeof idA != 'undefined' && typeof idB != 'undefined' && idA.GetUserData() !== null && idB.GetUserData() !== null) {                           
                //console.log("idA"+ idA.GetUserData().name)
                //console.log(idB.GetUserData().name)
	                if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'redrock') || 
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'redrock')) {
	                		spriteNextToRock = true
	                		spriteCollideWithRock = idB
	                    	playerItem = 'redrock'               
	                }
	                if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'rock') ||
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'rock')) {
	                		spriteNextToRock = true
	                		spriteCollideWithRock = idB
	                    	playerItem = 'rock'              
	                }
	                
	                if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'baum2') ||
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'baum2')) {
	                	if(idA.GetType() === box2d.b2BodyType.b2_staticBody){
	                	button.position = new CG.Point(idA.GetPosition().x*40+30, idA.GetPosition().y*40-30)
						button.visible = true
						playerCollisionWith = idA
						}
	                }
	                if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'haus2') ||
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'haus2')) {
	                	buttonhaus.position = new CG.Point(idA.GetPosition().x*40+30, idA.GetPosition().y*40-30)
						buttonhaus.visible = true
						playerCollisionWith = idA
	                }
            	if ((idA.GetUserData().name === 'terrain' && idB.GetUserData().name === 'redrock') ||
            	(idB.GetUserData().name === 'terrain' && idA.GetUserData().name === 'redrock')) {
            			if(idB.GetLinearVelocity().y*40 > 200 || idB.GetLinearVelocity().x*40 > 200){
            			ballOnTerrain = true
            			ballCollideWithTerrain = idB
            			//var expl = new CG.Animation(Game.asset.getImageByName('exp' + (Math.floor((Math.random() * 5)) + 1)), new CG.Point(idB.GetPosition().x, idB.GetPosition().y), 1, 16, 64, 64)
            			var expl = new CG.Animation(Game.asset.getImageByName('bigexplosion'), new CG.Point(idB.GetPosition().x*40, idB.GetPosition().y*40), 1, 64, 256, 256)
			            expl.yspeed = -2
			            expl.delay = 5
			            mainlayer.addElement(expl)
            			}
                }
                if ((idA.GetUserData().name === 'gold' && idB.GetUserData().name === 'redrock') ||
                (idB.GetUserData().name === 'gold' && idA.GetUserData().name === 'redrock')) {
            			if(idB.GetLinearVelocity().y*40 > 200 || idB.GetLinearVelocity().x*40 > 200){
            			ballOnGold = true
            			ballCollideWithGold = idB
            			}
                }
               }
            },
            EndContact: function (idA, idB) {
            	if ((idA.GetUserData().name === 'terrain' && idB.GetUserData().name === 'redrock') ||
            	(idB.GetUserData().name === 'terrain' && idA.GetUserData().name === 'redrock')) {
            			ballOnTerrain = false
            			}
				   if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'baum2') ||
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'baum2')) {   
	                	button.visible = false
	                	playerCollisionWith = {}
	                }
                   if ((idA.GetUserData().name === 'spritetestphysics' && idB.GetUserData().name === 'haus2') ||
	                (idB.GetUserData().name === 'spritetestphysics' && idA.GetUserData().name === 'haus2')) {
						buttonhaus.visible = false
						playerCollisionWith = {}
	                }
            },
            PostSolve: function (idA, idB, impulse) {
            },
            PreSolve: function (contact, oldManifold) {
                var fixtureA = contact.GetFixtureA();
                var fixtureB = contact.GetFixtureB();
                // console.log(contact)
                 //console.log(fixtureA.GetBody().GetUserData())
                 //console.log(fixtureB.GetBody().GetUserData())
                	if ((fixtureA.GetBody().GetUserData().name === 'haus2' && fixtureB.GetBody().GetUserData().name === 'spritetestphysics') ||
	                (fixtureB.GetBody().GetUserData().name === 'haus2' && fixtureA.GetBody().GetUserData().name === 'spritetestphysics')) {
						contact.SetEnabled(false)               
	                }
                	if ((fixtureA.GetBody().GetUserData().name === 'baum2' && fixtureB.GetBody().GetUserData().name === 'spritetestphysics') ||
	                (fixtureB.GetBody().GetUserData().name === 'baum2' && fixtureA.GetBody().GetUserData().name === 'spritetestphysics')) {
						//if(fixtureA.GetBody().GetType() === box2d.b2BodyType.b2_staticBody){
							contact.SetEnabled(false)          
						//}     
	                }
                
                // if ((idA.GetUserData().name === 'haus2' && idB.GetUserData().name === 'spritetestphysics') ||
	                // (idB.GetUserData().name === 'haus2' && idA.GetUserData().name === 'spritetestphysics')) {
						// console.log('haus')                
	                // }
            }
        });

    },
    /**
     * @Author Christian Schmitt
     *
     * @description
     *
     * Get a Static B2D body at the give x, y position.
     *
     * @method getBodyAt
     * @param x {Number}
     * @param y {Number}
     * @return {*}
     */
    getStaticBodyAt: function (x, y) {
        var worldx = (x - this.x) / this.scale;
        var worldy = (y - this.y) / this.scale

        var mousePVec = new b2Vec2(worldx, worldy)  //b2world offset for x and y!!!
        var aabb = new b2AABB()
        aabb.lowerBound.SetXY(worldx - 0.001, worldy - 0.001)
        aabb.upperBound.SetXY(worldx + 0.001, worldy + 0.001)

        // Query the world for overlapping shapes.

        var selectedBody = null;
        this.world.QueryAABB(function (fixture) {
            if (fixture.GetBody().GetType() == box2d.b2BodyType.b2_staticBody) {
                if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                    selectedBody = fixture.GetBody();
                    return false;
                }
            }
            return true;
        }, aabb);
        return selectedBody;
    },
    /**
     * @description
     *
     * Deletes a B2D body
     *
     * @method deleteBody
     * @param body {Number}
     * @return {Boolean}
     */
    deleteBody: function (body) {
        if (body) {
                    if(this.checkIfBodyExists(body)){
                    this.removeElementByUid(body.GetUserData().uid)
                    this.world.DestroyBody(body)
                    return true
                    }
        }
        return false
    },
    /**
     * @Author Christian Schmitt
     *
     * @description
     *
     * Get a list of Static B2D bodys at the give x, y position.
     *
     * @method getStaticBodyListAt
     * @param x {Number}
     * @param y {Number}
     * @return {*}
     */
    getStaticBodyListAt: function (x, y, radius1, radius2) {
        var node = b2world.world.GetBodyList();
        while (node) {
            var body = node
            if (typeof body === 'object') {
                // if ( body.GetUserData() !== null && body.GetUserData().name === 'rock') {
                if (body.GetUserData() !== null && ( body.GetUserData().name === 'rock' || body.GetUserData().name === 'redrock'  ) && body.GetType() !== box2d.b2BodyType.b2_dynamicBody) {

                    var bodyPos = body.GetPosition();
                    var distx = x - bodyPos.x * 40;
                    var disty = y - bodyPos.y * 40;
                    var dist = Math.sqrt((distx * distx) + (disty * disty));

                    if (dist < radius1 + radius2) {
                        body.SetType(box2d.b2BodyType.b2_dynamicBody);
                    }
                }
                node = body.GetNext()
            }
        }
    }
})

function buttonCallback(obj) {
    alert('Clicked button')
    console.log(['clicked & execute callback', obj])
}
function buttonhausCallback(obj) {
    alert('Clicked button')
    console.log(['clicked & execute callback', obj])
}