// toDO: fill super() with what's contained in config (and, add sounds, low effort shot blast on spawn)

export default class Bullet extends Phaser.GameObjects.Sprite

{

  constructor(scene)
    {
      super(scene);
      this.sprite = this.scene.physics.add.sprite(0,0,'bullet',0);


      var sizeX = 40;
      var sizeY = 40;

      this.speed = 2;
      this.damage = 1;

      this.born = 0;
      this.direction = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;

      this.sprite.setSize(sizeX, sizeY, true);
      this.sprite.setDisplaySize(sizeX, sizeY);
      this.scene.physics.world.enable(this);
      this.scene.physics.add.existing(this);

    }


      freeze()
      {
       this.body.moves = false;
      }

      hit()
     {
      this.die();
     }

     die()
     {
       this.sprite.setPosition(-600);
       this.destroy;
     }

     fire(shooter, target)
     {

       if (!target) return;

      this.setActive(true).setVisible(true);

       this.sprite.setPosition(shooter.sprite.x, shooter.sprite.y);

      this.direction = Math.atan( (target.x-this.sprite.x) / (target.y-this.sprite.y));
      this.sprite.rotation = shooter.sprite.rotation; // angle bullet with shooters rotation

       // Calculate X and y velocity of bullet to moves it from shooter to target
       if (target.y >= this.sprite.y)
         {
           this.xSpeed = this.speed*Math.sin(this.direction);
           this.ySpeed = this.speed*Math.cos(this.direction);
       }
         else
       {
           this.xSpeed = -this.speed*Math.sin(this.direction);
           this.ySpeed = -this.speed*Math.cos(this.direction);

           this.born = 0; // Time since new bullet spawned
         }
    }

     update(time,delta)
     {

       if (!this.active)
       {
         this.destroy;
         return;
       }

//  this.scene.physics.world.collide( this.scene.midGround, this.sprite, () => {this.die();console.log("thumpa")});

       this.sprite.x += this.xSpeed * delta;
           this.sprite.y += this.ySpeed * delta;
           this.born += delta;



           if (this.born > 2000)
           {
               this.setActive(false).setVisible(false);
               this.destroy;
               this.born = 0;
           }

     }

}
