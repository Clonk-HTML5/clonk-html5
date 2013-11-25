if(typeof KeyboardJS !== 'undefined'){		
			KeyboardJS.on('i', function(){
                    body = b2world.getBodyAt(mousex, mousey)
                    b2world.applyImpulse(body, 270, 10)
			});
			KeyboardJS.on('b', function(){
				b2world.createCircle('glowball', Game.asset.getImageByName('glowball'), 40, mousex, mousey, box2d.b2BodyType.b2_dynamicBody)
			});
			KeyboardJS.on('c', function(){
                    bitmap.clearCircle(mousex, mousey, 40)
                    terrainBody.clipTerrain({points: 16, radius: 40, x: mousex, y: mousey})
                    b2world.getStaticBodyListAt(mousex,mousey,34,0)
			});
			KeyboardJS.on('o', function(){
                    if (b2world.debug == 0 ) {
                        b2world.debug = 1
                    } else {
                        b2world.debug = 0
                    }
			});
			KeyboardJS.on('e', function(){
            	if(isEmptyObject(playerCollisionWith)){
                	if(leftplayer.item !== ''){
	                    var throwingball = b2world.createCircle(leftplayer.item, Game.asset.getImageByName(leftplayer.item), 40, leftplayer.body.GetPosition().x * 40+40, leftplayer.body.GetPosition().y * 40-5, box2d.b2BodyType.b2_dynamicBody)
	                	//console.log(throwingball)
	                	b2world.applyImpulse(throwingball.body, 1, 1)
	                	leftplayer.item = ''
	                	playerItem = ''
                	}
                	}else{
                		if(isEmptyObject(playerCollisionWith) !== true && playerCollisionWith.GetUserData().name === 'baum2'){
                			console.log(playerCollisionWith)
                			playerCollisionWith.SetType(box2d.b2BodyType.b2_dynamicBody)
                		}
                		if(isEmptyObject(playerCollisionWith) !== true && playerCollisionWith.GetUserData().name === 'haus2')
                			console.log(playerCollisionWith)
    			            var menu = new CG.Menu(Game.width2, 200, 10)
				            var button1 = new CG.Button(Game.asset.getImageByName('back1'), new CG.Point(Game.width2, 100), '(SCALE)', small, function () {
				                console.log('menu btn1 clicked')
				            })
				            button1.name = 'button1'
				            menu.addButton(button1)
        					// var menuHouse = new CG.Button(Game.asset.getImageByName('arrow-25'), new CG.Point(20, 20), 'Button', small, buttonhausCallback) 
							// menuHouse.name = 'button'
							// menuHouse.visible = false
							ingamemenulayer.addElement(menu)
    			            mainscreen.addLayer(ingamemenulayer)
                	}
			});
			KeyboardJS.on('a', function(){
				leftplayer.addVelocity(new b2Vec2(-2, 0))
			});
			KeyboardJS.on('d', function(){
				leftplayer.addVelocity(new b2Vec2(2, 0))
			});
			KeyboardJS.on('w', function(){
				leftplayer.addVelocity(new b2Vec2(0, -5))
			});
			KeyboardJS.on('s', function(){
				leftplayer.addVelocity(new b2Vec2(0, 2))
			});
			KeyboardJS.on('right', function(){
                    velo = b2world.elements[1].body.GetLinearVelocity()
                    velo.SelfAdd(new b2Vec2(5, 0))
                    b2world.elements[1].body.SetLinearVelocity(velo)
			});
			KeyboardJS.on('left', function(){
                    velo = b2world.elements[1].body.GetLinearVelocity()
                    velo.SelfAdd(new b2Vec2(-5, 0))
                    b2world.elements[1].body.SetLinearVelocity(velo)
			});
			KeyboardJS.on('up', function(){
				b2world.elements[1].body.ApplyForce(new b2Vec2(0, -500), b2world.elements[1].body.GetWorldCenter())
			});
			KeyboardJS.on('q + d', function () {
			  		// console.log('d down')
			  			bitmap.clearCircle(leftplayer.body.GetPosition().x * 40 +40,leftplayer.body.GetPosition().y * 40+18, 40)
	                    terrainBody.clipTerrain({points: 16, radius: 40, x: leftplayer.body.GetPosition().x * 40+40, y: leftplayer.body.GetPosition().y * 40+18})
	                    b2world.getStaticBodyListAt(leftplayer.body.GetPosition().x *40+40, leftplayer.body.GetPosition().y * 40+18, 36, 0)
			});
			KeyboardJS.on('q + s + d', function () {
			  		// console.log('s&d down')
			  			bitmap.clearCircle(leftplayer.body.GetPosition().x * 40 +40,leftplayer.body.GetPosition().y * 40+25, 40)
	                    terrainBody.clipTerrain({points: 16, radius: 40, x: leftplayer.body.GetPosition().x * 40+40, y: leftplayer.body.GetPosition().y * 40+25})
	                    b2world.getStaticBodyListAt(leftplayer.body.GetPosition().x *40+40, leftplayer.body.GetPosition().y * 40+25, 36, 0)
			});
			KeyboardJS.on('q + s', function () {
			  		// console.log('s down')
	                    bitmap.clearCircle(leftplayer.body.GetPosition().x * 40+25,leftplayer.body.GetPosition().y * 40+40, 40)
	                    terrainBody.clipTerrain({points: 16, radius: 40, x: leftplayer.body.GetPosition().x * 40+25, y: leftplayer.body.GetPosition().y * 40+40})
	                    b2world.getStaticBodyListAt(leftplayer.body.GetPosition().x *40+25, leftplayer.body.GetPosition().y * 40+40, 36, 0)
			});
			KeyboardJS.on('q + s + a', function () {
			  		// console.log('sa down')
	                    bitmap.clearCircle(leftplayer.body.GetPosition().x * 40 ,leftplayer.body.GetPosition().y * 40+30, 40)
	                    terrainBody.clipTerrain({points: 16, radius: 40, x: leftplayer.body.GetPosition().x * 40, y: leftplayer.body.GetPosition().y * 40+30})
	                    b2world.getStaticBodyListAt(leftplayer.body.GetPosition().x *40, leftplayer.body.GetPosition().y * 40+30, 36, 0)
			});
			KeyboardJS.on('q + a', function() {
			  		// console.log('a down')
	                    bitmap.clearCircle(leftplayer.body.GetPosition().x * 40 ,leftplayer.body.GetPosition().y * 40+20, 40)
	                    terrainBody.clipTerrain({points: 16, radius: 40, x: leftplayer.body.GetPosition().x * 40, y: leftplayer.body.GetPosition().y * 40+20})
	                    b2world.getStaticBodyListAt(leftplayer.body.GetPosition().x *40, leftplayer.body.GetPosition().y * 40+20, 36, 0)
			});
			KeyboardJS.on('q + w', function(){
				
			});
			KeyboardJS.on('q + w + d', function(){
				
			});
			KeyboardJS.on('q + w + a', function(){
				
			});
}

/* **
 *  Helper  Function
 ** */
function isEmptyObject(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}