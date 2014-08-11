/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var Space = new cp.Space();
Space.iterations = 5;
Space.gravity = cp.v(0, -350);
var CPSprite = cc.Sprite.extend({
    animation: null,
    calabaza: null,
    ctor: function(filename, pos, mass, Elasticity, friction) {
        
        //Cache para el spritesheet
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(p_Murumuru, s_Murumuru);
        
        //Colección de frames del spritesheet para crear la animación
        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 12; i++) {
            str = "Walk_left" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = cache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        this.animation = cc.Animation.create(animFrames, 0.05);
        this.calabaza = cc.PhysicsSprite.createWithSpriteFrameName(this.spriteFrameNamePrefix + "00.png");

        var spritebatch = cc.SpriteBatchNode.create(s_Murumuru);

        var contentSize = this.calabaza.getContentSize();
        cc.log(contentSize);
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(100, 200);
        
         //5. add the created body to space
        Space.addBody(this.body);
        //6. create the shape for the body
        //7. add shape to space
        Space.addShape(new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height));
//        Space.step(0.2);
        this.scheduleUpdate();
//        shape.setElasticity(1);
//        shape.setFriction(1);

        this.calabaza.setBody(this.body);

        this.schedule(this.onUnpause, this.getRandom(1, 5));
        this.schedule(this.eyes, this.getRandom(2, 4));

//        this.calabaza.setPosition(cc.p(100,300));
//        var pos = this.body.p;
//        this.calabaza.setPosition(pos.x, pos.y);
//        this.calabaza.setRotation(cc.RADIANS_TO_DEGREES(-1 * this.body.a));
        return spritebatch.addChild(this.calabaza);

    },
    update: function(dt) {
        
    }
});

var MyLayer = cc.Layer.extend({
    isMouseDown: false,
    helloImg: null,
    helloLabel: null,
    circle: null,
    sprite: null,
    criatura: null,
    calabaza: null,
    spriteFrameNamePrefix: "Walk_left",
    fondo: null,
    space: null,
            body: null,
    direccion: 1,
    init: function() {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();
        
        
        // add a "close" icon to exit the progress. it's an autorelease object
//        var closeItem = cc.MenuItemImage.create(
//                s_CloseNormal,
//                s_CloseSelected,
//                function() {
//                    cc.log("close");
//                }, this);
//        closeItem.setAnchorPoint(cc.p(0.5, 0.5));
//
//        var menu = cc.Menu.create(closeItem);
//        menu.setPosition(cc.p(0, 0));
//        this.addChild(menu, 1);
//        closeItem.setPosition(cc.p(size.width - 20, 20));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
//        this.helloLabel = cc.LabelTTF.create("Murumuru", "Impact", 38);
//        // position the label on the center of the screen
//        this.helloLabel.setPosition(cc.p(size.width / 2, size.height - 40));
//        // add the label as a child to this layer
//        this.addChild(this.helloLabel, 5);

// ======================================= CHIMPMUNK =======================================
//        var thickness = 10;
//        this.setTouchEnabled(true);
//        //add floor
//        var floor = Space.addShape(new cp.SegmentShape(Space.staticBody, cp.v(0, 0 - thickness), cp.v(size.width, 0 - thickness), thickness));
//        floor.setElasticity(1);
//        floor.setFriction(1);
//        var lwall = Space.addShape(new cp.SegmentShape(Space.staticBody, cp.v(0 - thickness, size.height), cp.v(0 - thickness, 0), thickness));
//        var rwall = Space.addShape(new cp.SegmentShape(Space.staticBody, cp.v(size.width + thickness, size.height), cp.v(size.width + thickness, 0), thickness));
//        var ceiling = Space.addShape(new cp.SegmentShape(Space.staticBody, cp.v(0, size.height + thickness), cp.v(size.width, size.height + thickness), thickness));
//        lwall.setElasticity(1);
//        lwall.setFriction(1);
//        rwall.setElasticity(1);
//        rwall.setFriction(1);
//        ceiling.setElasticity(1);
//        ceiling.setFriction(1);

        var wallBottom = new cp.SegmentShape(Space.staticBody,
                cp.v(0, 100), // start point
                cp.v(size.width, 100), // MAX INT:4294967295
                0);// thickness of wall
                wallBottom.setFriction(0.8);
                wallBottom.setElasticity(1);
        var wallI = new cp.SegmentShape(Space.staticBody,
                cp.v(0, size.height), // start point
                cp.v(0, 0), // MAX INT:4294967295
                0);// thickness of wall
        var wallD = new cp.SegmentShape(Space.staticBody,
                cp.v(size.width, size.height), // start point
                cp.v(size.width, 0), // MAX INT:4294967295
                0);// thickness of wall
        Space.addStaticShape(wallBottom);
        Space.addStaticShape(wallI);
        Space.addStaticShape(wallD);
        
        //4. apply impulse to the body
//        this.body.applyImpulse(cp.v(200 * this.direccion, 0), cp.v(0, 0));


//        this.body.schedule(function() {
//
//
//            //run speed
//            if (this.p.x >= size.width) {
//                this.direccion = -1;
//            }
//            else if (this.p.x <= 0) {
//                this.direccion = 1;
//            }
//            cc.log(this.p.x);
//            this.applyImpulse(cp.v(200 * this.direccion, 0), cp.v(0, 0));
//        })

       
//                this.addChild(this.calabaza);
//                
// ======================================= CHIMPMUNK =======================================

        this.fondo = cc.Sprite.create(s_Fondo);
        var fondoSize = this.fondo.getContentSize();

        this.fondo.setAnchorPoint(cc.p(0, 0));
        this.fondo.setPosition(cc.p(0, 0));




//        this.fondo.addChild(spritebatch);
        this.addChild(this.fondo);
        this.addChild(spritebatch);
        this.setKeyboardEnabled(true);

//        this.scheduleUpdate();
//        this.calabaza = new CPSprite(s_Calabaza, cc.p(100, 400));
//        this.addChild(this.calabaza);





        return true;
    },
    update: function(dt) {
//        dt = dt > 0.2 ? 0.1 : dt;
        Space.step(dt);

    },
    onTouchesEnded: function(event) {
        this.body.applyImpulse(cp.v(200 * this.direccion, 0), cp.v(0, 0));

        cc.log("click")
    },
    onUnpause: function() {

//        this.unschedule(this.onUnpause);
        var randomPixelsX = this.getRandom(0, 40) - 20;
        var randomPixelsY = this.getRandom(50, 400);

//        var size = cc.Director.getInstance().getWinSize();
//        var action = cc.MoveBy.create(1, cc.p(randomPixelsX, randomPixelsY));
//        var jump1 = cc.JumpBy.create(10, cc.p(randomPixelsX, randomPixelsY), this.getRandom(100,300), 2);
//        var seq = cc.Sequence.create(jump1, action);
//        this.calabaza.runAction(seq);
        this.body.applyImpulse(cp.v(randomPixelsX, randomPixelsY), cp.v(0, 0));
        cc.log(this.calabaza.getPosition());

//        var node = this.getChildByTag(TAG_GROSSINI);
//        director.getActionManager().resumeTarget(node);
    },
    eyes: function() {
        this.calabaza.runAction(cc.Animate.create(this.animation));
    },
    getRandom: function(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
});

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
