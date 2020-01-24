

export default class Solder extends Phaser.GameObjects.Sprite
{
  constructor(config)
  {
    super(config.scene, config.x, config.y);

    this.scene = config.scene;

    this.sprite = this.scene.physics.add
      .sprite(config.x, config.y, "eye", 0)
      .setOrigin(0.5,0.5)
      .setSize(64,64);

      this.scene.physics.world.enable(this);

      this.lastFired = 0;
      //once lastFired is equal to fireMax then a bullet can be spawned
      this.fireMax = 50;
      this.canShoot = true;

  }

  create()
  {
    //this.sprite.setActive(false);
  }
/*
  canSee()
  {
  if ((this.distanceToPlayerX > 32 || this.distanceToPlayerY > 32) && this.canShoot){
			this.canShoot = false;
    this.scene.time.addEvent({ delay: 2000, callback: this.enableFireball, callbackScope: this });
    let bullet = this.scene.enemyAttack.get();
	        if (bullet)
	        {
	        	bullet.fire(this.sprite, [player]);

	        }
   }
  }

  enableShoot()
	{
		this.canShoot = true;
	}
*/




enemyFire(player)
{
    if (this.active === false || this.lastFired < this.fireMax)
    {
        return;
    }
        // Get bullet from bullets group

        let bullet = this.scene.enemyBullets.get(this);
        this.lastFired = 0;
        //check if bullet exists
        if (bullet)
        {

        bullet.fire(this, player);

        //add collider and do stuf as they connect
        this.scene.physics.add.overlap(bullet.sprite, player, ()=>{ bullet.die(); this.scene.player.playerShot()}, null, this);

        //this.scene.physics.add.collider(bullet.sprite, this.scene.midGround, (bullet)=> {bullet.die(); console.log("thump")});

    }else{
      return;
    }
}


  freeze()
  {

      this.sprite.body.moves = false;
  }

  ouch()
  {
    console.log('huh');
  }

  destroy()
  {

      this.destroy;
  }

  update(pX, pY, player, time, delta)
  {

 if (!this.active) return;

    //alows update to access sprite (or did I just copypaste without thinking?)
    const { sprite} = this; //          <  might need to change since I'm extending Sprite?

    //activate when in range
    //console.log('enemyupdate1: ' + player);
this.lastFired += 1;
//sprite.angle = Phaser.Math.Angle.RotateTo(sprite.angle,  Phaser.Math.Angle.Between(sprite.x, sprite.y, pX, pY));
 sprite.rotation = Phaser.Math.Angle.Between(sprite.x, sprite.y, pX, pY);

//sprite.rotation -= 0.1;
/*
if(sprite.angle === Phaser.Math.Angle.RotateTo(sprite.angle,  Phaser.Math.Angle.Between(sprite.x, sprite.y, pX, pY)))
{
  return;
}else if (sprite.angle > Phaser.Math.Angle.RotateTo(sprite.angle,  Phaser.Math.Angle.Between(sprite.x, sprite.y, pX, pY)))
{
sprite.rotation += 0.1;
}else{
  sprite.rotation -= 0.1;
}
*/

//Phaser.Math.Angle.RotateTo(sprite.angle, Phaser.Math.Angle.Between(sprite.x, sprite.y, pX, pY));
  // Make enemy fire
  //this.enemyFire({x: sprite.x, y: sprite.y, rotation: sprite.rotation, pX: pX, pY: pY});
  if (this.active === false || this.lastFired < this.fireMax)
  {
      return;
  }
      // Get bullet from bullets group

      let bullet = this.scene.enemyBullets.get(this);
      this.lastFired = 0;
      //check if bullet exists
      if (bullet)
      {

      bullet.fire(this, player);

      //add collider and do stuf as they connect
      this.scene.physics.add.overlap(bullet.sprite, player, ()=>{ bullet.die(); this.scene.player.playerShot()}, null, this);

      //this.scene.physics.add.collider(bullet.sprite, this.scene.midGround, (bullet)=> {bullet.die(); console.log("thump")});

  }else{
    return;
  }
//this.enemyFire(player);

  }


/*
  enemyFire(enemy, player, time, gameObject)
  {
      if (this.active === false)
      {
          return;
      }

      if ((time - this.lastFired) > 1000)
      {
          this.lastFired = time;

          // Get bullet from bullets group
          var bullet = enemyBullets.get().setActive(true).setVisible(true);

          if (bullet)
          {
              bullet.fire(enemy, player);
              // Add collider between bullet and player
              gameObject.physics.add.collider(player, bullet, playerHitCallback);
          }
      }
  }
*/

}
