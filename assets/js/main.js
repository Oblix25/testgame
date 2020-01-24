import Player from "./player.js";
import Solder from './enemies.js';
import Bullet from "./bullet.js";
import {spawner} from './spawner.js';



class BootScene extends Phaser.Scene
{
constructor()
{
super({key: 'boot'});
}

preload()
{
this.load.json('assets','assets/json/assets.json');
this.load.image('title','assets/art/title.png');
}

create()
{
 this.scene.start('preloadScene');
}

}


class PreloadScene extends Phaser.Scene
{

   constructor()
  {
    super({
      key: "preloadScene",
      files: [
        {type: 'image', key: 'title', url:'./assets/art/title.png'},
        {type: 'json', key: 'assets', url:'./assets/json/assets.json'}
      ]

    });
  }


   preload()
  {
    this.loadAssets(this.cache.json.get('assets'));
    this.load.image('tiles','./assets/tiles/test_tileimage-ex.png');
    this.load.tilemapTiledJSON('map', './assets/maps/testM4.json');
    this.createProgressbar(this.centerX,this.centerY + 200);
  }



  centerX()
  {
    return this.sys.game.config.width/2;
  }

  centerY()
  {
    return this.sys.game.config.height/2;
  }

//changes made to loadAssets: 1. made all instances of &amp; into &


  loadAssets (json)
    {
        Object.keys(json).forEach(function (group)
        {
            Object.keys(json[group]).forEach(function (key)
            {
                let value = json[group][key];

                if (group === 'atlas' ||
                    group === 'unityAtlas' ||
                    group === 'bitmapFont' ||
                    group === 'spritesheet' ||
                    group === 'multiatlas')
                {

                    // atlas:ƒ       (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
                    // unityAtlas:ƒ  (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
                    // bitmapFont ƒ  (key, textureURL,  xmlURL,    textureXhrSettings, xmlXhrSettings)
                    // spritesheet:ƒ (key, url,         config,    xhrSettings)
                    // multiatlas:ƒ  (key, textureURLs, atlasURLs, textureXhrSettings, atlasXhrSettings)
                    this.load[group](key, value[0], value[1]);

                }
                else if (group === 'audio')
                {

                    // do not add mp3 unless, you bought a license 😉
                    // opus, webm and ogg are way better than mp3
                    if (value.hasOwnPorperty('opus') && this.sys.game.device.audio.opus)
                    {
                        this.load[group](key, value['opus']);

                    }
                    else if (value.hasOwnPorperty('webm') && this.sys.game.device.audio.webm)
                    {
                        this.load[group](key, value['webm']);

                    }
                    else if (value.hasOwnPorperty('ogg') && this.sys.game.device.audio.ogg)
                    {
                        this.load[group](key, value['ogg']);

                    }
                    else if (value.hasOwnPorperty('wav') && this.sys.game.device.audio.wav)
                    {
                        this.load[group](key, value['wav']);
                    }
                }
                else if (group === 'html')
                {
                    // html:ƒ (key, url, width, height, xhrSettings)
                    this.load[group](key, value[0], value[1], value[2]);

                }
                else
                {
                    // animation:ƒ (key, url, xhrSettings)
                    // binary:ƒ (key, url, xhrSettings)
                    // glsl:ƒ (key, url, xhrSettings)
                    // image:ƒ (key, url, xhrSettings)
                    // image:ƒ (key, [url, normal-url], xhrSettings)
                    // json:ƒ (key, url, xhrSettings)
                    // plugin:ƒ (key, url, xhrSettings)
                    // script:ƒ (key, url, xhrSettings)
                    // svg:ƒ (key, url, xhrSettings)
                    // text:ƒ (key, url, xhrSettings)
                    // tilemapCSV:ƒ (key, url, xhrSettings)
                    // tilemapTiledJSON:ƒ (key, url, xhrSettings)
                    // tilemapWeltmeister:ƒ (key, url, xhrSettings)
                    // xml:ƒ (key, url, xhrSettings)
                    this.load[group](key, value);
                }
            }, this);
        }, this);
}

createProgressbar (x, y)
    {
        // size &amp; position
        let width = 400;
        let height = 20;
        let xStart = x - width / 2;
        let yStart = y - height / 2;

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xaaaaaa
            }
        });
        border.strokeRectShape(borderRect);

        let progressbar = this.add.graphics();

        /**
         * Updates the progress bar.
         *
         * @param {number} percentage
         */
        let updateProgressbar = function (percentage)
        {
            progressbar.clear();
            progressbar.fillStyle(0xffffff, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function ()
        {

            this.load.off('progress', updateProgressbar);
            //this.scene.start('title');

        }, this);
}

  create()
  {
    this.initRegistry();
    this.scene.start('battleScene');
  }


  initRegistry()
  {
  //can set and get data here from all scenes

    this.registry.set('load', 'Level1');
    this.registry.set('spawn', 'spawnCenter');
  }

}


class BattleScene extends Phaser.Scene
{



  constructor()
  {
    super({
      key: 'battleScene'
    });

  }

  create()
  {



    let load = this.registry.get('load');


  //map
  this.map = this.make.tilemap({key: 'map'});

  this.tileset = this.map.addTilesetImage('test_tileimage-ex','tiles');

  this.backGround = this.map.createStaticLayer("background", this.tileset,0,0);
  this.midGround = this.map.createDynamicLayer("midground", this.tileset,0,0);
  this.foreGround = this.map
  .createStaticLayer('foreground', this.tileset,0,0)
  .setDepth(1);

  const spawnPoint = this.map.findObject("stuff", obj => obj.name === "spawn_point");
  //const spawnPointE1 = map.findObject('stuff', obj => obj.name === "e1");


  this.spawnpoints = [];  //create an array to hold the spawnpoints populated by converObjects()
  //set up groups, tell group to run updates on its children, then call the object conversion method

  this.enemies = this.physics.add.group();
  this.enemies.runChildUpdate = false;

  this.enemyBullets = this.add.group({
   classType: Bullet,
   //maxSize: 10,
   runChildUpdate: false
  });

  //player
  this.player = new Player( this, spawnPoint.x, spawnPoint.y);

  //this.playerDeath = addEventListener

  //enemies
  //this.solder1 = new Solder( this, spawnPointE1.x, spawnPointE1.y);

  spawner(this.map, this.spawnpoints, this);

    this.midGround.setCollisionByProperty({collides: true});
  this.physics.add.collider(this.player.sprite,   this.midGround,  () =>  console.log('whataa'));

  //this.physics.world.collide(this.enemyBullets, this.midGround, (bullet)=> {bullet.die()}, null, this);
  this.physics.add.collider(this.enemies, this.midGround);

console.log(this);

    this.playerCameraSize = 0.5;

    this.playerCamera = this.cameras.main
    .startFollow(this.player.sprite)
    .setLerp(0.05)
    .setDeadzone(100,100)
    //.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    .zoom = this.playerCameraSize;



     //distance between player and center of camera
     this.distanceFmCam = 3;

     //controls the camera's lerp on an update by update bases
     this.contLerp = 0.05;

    this.cameraCords = this.add.text(-500, -280)
    .setScrollFactor(0);

    this.distanceFromSprite = this.add.text(-500, -200)
    .setScrollFactor(0);

    this.contLerpCheck = this.add.text(-500, -180)
    .setScrollFactor(0);

    this.playerXandY = this.add.text(-500, -150)
    .setScrollFactor(0);



    //on and off info gui switch
    this.toggleShowInfo = true;


    //None-player controls
    const {I, O, P} = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      i:I,
      o:O,
      p:P
    });

this.input.on('pointerdown', this.shoot, this);

this.bullets = this.physics.add.group({
  defaultKey: 'proto_player',
  maxSize: 10
});



}

  shoot(pointer) {
          var bullet = this.bullets.get(pointer.x, pointer.y);
          if (bullet) {
              bullet.setActive(true);
              bullet.setVisible(true);
              bullet.body.velocity.y = -200;
          }
      }




  end(type)
  {
      //restart the scene. You can place additional cleanup functions in here
      //this.music.stop();
      if (type === 'restart') {
        this.scene.restart();
      }/* else if (type === 'gameOver') {
        this.cameras.main.fade(1000, 16.5, 2.0, 1.2);
        this.events.emit('gameOver');
        this.time.addEvent({ delay: 1000, callback: () => {this.scene.start('GameOver', 'lose');}, callbackScope: this });
      } else if (type === 'win') {
        this.cameras.main.fade(1000, 16.5, 2.0, 1.2);
        this.events.emit('gameOver');
        this.time.addEvent({ delay: 1000, callback: () => {this.scene.start('GameOver', 'win');}, callbackScope: this });
      }
      */
    }
  //makes the camera try to catch up with the player
  speedFollow(conLerp)
  {

    if( this.keys.i.isDown && this.toggleShowInfo === true)
    {
      this.toggleShowInfo = false;
    }else{
        this.toggleShowInfo = true;
    }


    if(this.toggleShowInfo === false) return;





    if(this.distanceFmCam < 150 && conLerp <= 0.05)
    {
      conLerp -= 0.00000001;
      this.cameras.main.setLerp(conLerp);
    }else if( this.distanceFmCam > 150 && conLerp < 0.3){
      //set to 0.05 for glorious motion sickness
      conLerp += 0.06;
      this.cameras.main.setLerp(conLerp);
    }else if (this.distanceFmCam > 400 && conLerp < 0.75){
      conLerp += -0.002;
      this.cameras.main.setLerp(conLerp);
      this.playerCamera.shake(3000);
    }


  }




  reset() {this.scene.restart();}




  update(time, delta)
  {

    if (this.player.dead === true) this.reset();

    this.player.update();

    this.speedFollow(this.contLerp);


    //manual camera zoom
    this.cameras.main.setZoom(this.playerCameraSize);

    if (this.keys.o.isDown)
    {
      this.playerCameraSize += 0.01;
      //this.solder1.rotation = this.solder1.rotation + 0.1;
    }
    if (this.keys.p.isDown)
    {
      this.playerCameraSize -= 0.01;
      //this.solder1.rotation = this.solder1.rotation - 0.1;
    }


Array.from(this.enemyBullets.children.entries).forEach(
  (child) => {
    child.update(time, delta);
  });

    //updates each child in group while passing playerXY
    this.enemies.children.entries.forEach(
      (child) =>
      {
        if (child.active){
          child.update(this.player.sprite.x, this.player.sprite.y, this.player.sprite, time, delta);
        }
      }
    )





  }

}


var config = {
    type: Phaser.AUTO,
    width: 1050,
    height: 700,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y:0},
        debug: true,
        fps: 60
      }
    },
    scene:
        [BootScene, PreloadScene, BattleScene],
    extend: {
      time: 0
    }


};


window.addEventListener('load', ()=>
{
    window.game = new Phaser.Game(config);
});
