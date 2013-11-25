var terrainBody
var ballOnTerrain = false
var ballCollideWithTerrain = {}
var ballOnGold = false
var ballCollideWithGold = {}
var spriteNextToRock = false
var spriteCollideWithRock = {}
var playerItem = ''
var playerCollisionWith = {}

// the Game object
Game = (function () {
    var Game = {
        path: '',
        fps: 60,
        width: 1024,
        height: 768,
        width2: 1024 / 2,
        height2: 768 / 2,
        bound: new CG.Bound(0, 0, 1024, 768).setName('game'),
        canvas: {},
        ctx: {},
        b_canvas: {},
        b_ctx: {},
        asset: {}, //new CG.MediaAsset('media/img/splash3.jpg'), //initialize media asset with background image
        director: new CG.Director(),
        renderer: new CG.CanvasRenderer(),
        delta: new CG.Delta(60),
        preload: function () {
            //canvas for ouput
            Game.canvas = document.getElementById('canvas')
            Game.ctx = Game.canvas.getContext('2d')
            Game.asset = new CG.MediaAsset('media/img/splash3.jpg', Game.ctx)

            //frame buffer
            Game.b_canvas = document.createElement('canvas')
            Game.b_ctx = Game.b_canvas.getContext('2d')
            Game.b_canvas.width = Game.bound.width
            Game.b_canvas.height = Game.bound.height

            //Asset preloading font files
            Game.asset.addFont('media/font/small.txt', 'small', 'small')
                .addFont('media/font/abadi_ez.txt', 'abadi')
                .addImage('media/img/glowball-50.png', 'glowball')
                .addImage('media/img/ballon.png', 'ballon')
                .addImage('media/img/TestTerrain.png', 'testTerrain')
                .addImage('media/img/hunter.png', 'hunter')
                .addImage('media/img/back1.jpg', 'back1')
                .addImage('media/img/back3.jpg', 'back3')
                .addImage('media/img/TerrainBackground.png', 'back')
                .addImage('media/img/spritetestphysics.png', 'spritetestphysics')
                .addImage('media/img/sun.png', 'sun')
                .addImage('media/img/rock.png', 'rock')
                .addImage('media/img/redrock.png', 'redrock')
                .addImage('media/img/haus2.png', 'haus2')
                .addImage('media/img/baum2.png', 'baum2')
                .addImage('media/img/gold.png', 'gold')
                .addImage('media/img/axt.png', 'axt')
                .addImage('media/img/arrow-25.png', 'arrow-25')
                .addImage('media/img/exp1.png', 'exp1')
                .addImage('media/img/exp2.png', 'exp2')
                .addImage('media/img/exp3.png', 'exp3')
                .addImage('media/img/exp4.png', 'exp4')
                .addImage('media/img/exp5.png', 'exp5')
                .addImage('media/img/expbig1.png', 'bigexplosion')


                //tiled map
                .addJson('media/map/map-advanced-inner-outer.json', 'map1')

                //physics engine
                .addJson('media/img/ballon.json', 'ballon')
                .addJson('media/img/rainbow_256.json', 'rainbow_256')
                .addJson('media/img/powerstar75.json', 'powerstar75')
                .addJson('media/img/spritetestphysics.json', 'spritetestphysics')
                .addJson('media/img/gold.json', 'gold')
                .addJson('media/img/baum2.json', 'baum2')
                .addJson('media/img/haus2.json', 'haus2')

                //texturepacker
                .addImage('media/img/texturepacker.png', 'texturepacker')
                .addJson('media/img/texturepacker.json', 'texturepacker-json')

                .startPreLoad()
        },
        create: function () {

            //create texturepacker image in asset
            tp.loadJson(Game.asset.getJsonByName('texturepacker-json'))

            //put the texturepacker TPImages to the asset
            Game.asset.images.push.apply(Game.asset.images, tp.getAtlasImages())

            //            font = new CG.Font().loadFont(Game.asset.getFontByName('small'))
            abadi = new CG.Font().loadFont(Game.asset.getFontByName('abadi'))
            small = new CG.Font().loadFont(Game.asset.getFontByName('small'))

            //screen and layer
            mainscreen = new CG.Screen('mainscreen')
            mainlayer = new CG.Layer('mainlayer')
            
            ingamemenulayer = new CG.Layer('ingamemenulayer')

            //sprite for the background
            back = new CG.Sprite(Game.asset.getImageByName('back'), new CG.Point(Game.width2, Game.height2))
            back.name = 'back'
            mainlayer.addElement(back)

            //create Box2D World
            b2world = new CG.B2DTestbed('box2d-world')
            b2world.debug = 0

            //create circle element with image
            //static rocks

            for ( var i = 0; i < 50; i++) {
                var x = Math.random() * 1024
                var y = Math.random() * 768
                if (y < 200) y+=200;
                b2world.createCircle('rock', Game.asset.getImageByName('rock'), 16, x, y, box2d.b2BodyType.b2_staticBody)

            }
            for ( var i = 0; i < 50; i++) {
                var x = Math.random() * 1024
                var y = Math.random() * 768
                if (y < 200) y+=200;
                b2world.createCircle('redrock', Game.asset.getImageByName('redrock'), 16, x, y, box2d.b2BodyType.b2_staticBody)

            }



            //dynamic glowballs:
            /*
            b2world.createCircle('glowball', Game.asset.getImageByName('glowball'), 36, 340, -800, box2d.b2BodyType.b2_dynamicBody)
            b2world.createCircle('glowball', Game.asset.getImageByName('glowball'), 36, 310, -100, box2d.b2BodyType.b2_dynamicBody)
            b2world.createCircle('glowball', Game.asset.getImageByName('glowball'), 36, 320, -400, box2d.b2BodyType.b2_dynamicBody)
            b2world.createCircle('glowball', Game.asset.getImageByName('glowball'), 36, 330, -600, box2d.b2BodyType.b2_dynamicBody)
			*/

            //a bitmap that hides the background sprite
            bitmap = new CG.Bitmap(Game.width, Game.height)
            bitmap.loadImage(Game.asset.getImageByName('testTerrain'))
            mainlayer.addElement(bitmap)

            var terrainPolys =
                [

                    {
                        outer: [
                            {x: 0, y: 165},
                            {x: 1024, y: 165},
                            {x: 1024, y: 768},
                            {x: 0, y: 768}
                        ],

                        holes: [
                        ]
                    }
                ]

            terrainBody = b2world.createTerrain('terrain', false, terrainPolys, 0, 0, box2d.b2BodyType.b2_staticBody, false)

            //add it to a CGLayer
            mainlayer.addElement(b2world)

            //add screen to Director
            Game.director.addScreen(mainscreen.addLayer(mainlayer))


            renderStats = new Stats()
            document.body.appendChild(renderStats.domElement)

            Game.loop()
        },
        loop: function () {
            requestAnimationFrame(Game.loop);
            if (Game.asset.ready == true) {
                Game.update()
                Game.draw()
            }
        },
        update: function () {
            //update here what ever you want

			if(ballOnTerrain === true){
					if(b2world.checkIfBodyExists(ballCollideWithTerrain)){
                  	  	bitmap.clearCircle(ballCollideWithTerrain.GetPosition().x * 40 +20,ballCollideWithTerrain.GetPosition().y * 40+20, 40)
                  	    terrainBody.clipTerrain({points: 16, radius: 40, x: ballCollideWithTerrain.GetPosition().x * 40+20, y: ballCollideWithTerrain.GetPosition().y * 40+20})
                    	b2world.getStaticBodyListAt(ballCollideWithTerrain.GetPosition().x *40+20, ballCollideWithTerrain.GetPosition().y * 40+20, 36, 0)
                    	b2world.deleteBody(ballCollideWithTerrain) 
                    }
			}
            if(ballOnGold === true){
                  	  	//bitmap.clearCircle(ballCollideWithGold.GetPosition().x * 40 +20,ballCollideWithGold.GetPosition().y * 40+20, 40)
                  	    //gold.clipTerrain({points: 16, radius: 40, x: ballCollideWithGold.GetPosition().x * 40+20, y: ballCollideWithGold.GetPosition().y * 40+20})
                    	//b2world.getStaticBodyListAt(ballCollideWithGold.GetPosition().x *40+20, ballCollideWithGold.GetPosition().y * 40+20, 36, 0)
                    	b2world.deleteBody(ballCollideWithGold) 
			}
			if(spriteNextToRock === true){
				if(leftplayer.item === ''){
					b2world.deleteBody(spriteCollideWithRock)
					switch(playerItem)
						{
						case 'redrock':
	  			            redrock = new CG.Sprite(Game.asset.getImageByName('redrock'), new CG.Point(10 , Game.b_canvas.height -10))
				            redrock.name = 'redrock'
				            mainlayer.addElement(redrock)
				            leftplayer.item = playerItem
						  break;
						case 'rock':
  	  			            rock = new CG.Sprite(Game.asset.getImageByName('rock'), new CG.Point(10 , Game.b_canvas.height -10))
				            rock.name = 'rock'
				            mainlayer.addElement(rock)
				            leftplayer.item = playerItem
						  break;
						}
				}
			}

            Game.director.update()
        },
        draw: function () {
            Game.ctx.clearRect(0, 0, Game.bound.width, Game.bound.height)
            var xpos = 10
            var ypos = 10

            //draw all elements that the director has
            Game.director.draw()


            //text stuff
            abadi.drawText('cangaja - Canvas Game JavaScript FW', xpos, ypos)
            small.drawText('Destructible Terrain.', xpos, ypos + 50)
            small.drawText('C=clip hole, O=debugdraw on/off, B=new ball, I=impulse on body below mousepointer, WASD=Player, g + asd = digging', xpos, ypos + 70)
            small.drawText('Triangles: ' + terrainBody.terrainTriangles.length , xpos, ypos + 90)

            // draw Game.b_canvas to the canvas
            Game.ctx.drawImage(Game.b_canvas, 0, 0)

            // clear the Game.b_canvas
            Game.b_ctx.clearRect(0, 0, Game.bound.width, Game.bound.height)

            renderStats.update();
        },
        touchinit: function () {
        },
        touchhandler: function () {
        }
    }
	
    return Game
})()