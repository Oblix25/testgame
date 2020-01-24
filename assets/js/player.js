export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;


    // Create the physics-based sprite that we will move around and animate

    this.sprite = scene.physics.add
      .sprite(x, y, "proto_player", 0)
      .setOrigin(0.5,0.5)
      .setSize(64,64);

    this.scene.physics.world.enable(this);
    this.scene.physics.add.existing(this);

    this.hp = 3;
    this.dead = false;
    //base speed
    this.speed = 800;

    //this.sprintTime = 0;
      //direction of movment is stored
      //this.direction


      // Track the arrow keys & WASD
      const { LEFT, RIGHT, UP, DOWN, W, A, D, S} = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        w: W,
        a: A,
        d: D,
        s: S
      });

  }

  freeze() {
    this.sprite.body.moves = false;
  }


  update() {

    //alows update to access keys and sprite
    const {keys,sprite} = this;

    //check if dead
    if (this.hp < 1) this.dead = true;

        // Stop any previous movement from the last frame
       this.sprite.setVelocity(0);



      // Horizontal movement
      if (this.keys.left.isDown) {
        sprite.setVelocityX(-this.speed);
        sprite.setAngle(-90);
      } else if (this.keys.right.isDown) {
        sprite.setVelocityX(this.speed);
        sprite.setAngle(90);
      }

    // Vertical movement
      if (this.keys.up.isDown) {
        sprite.setVelocityY(-this.speed);
        sprite.setAngle(0);
      } else if (this.keys.down.isDown) {
        sprite.setVelocityY(this.speed);
        sprite.setAngle(180);
      }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.sprite.body.velocity.normalize().scale(this.speed);



    //rotate sprite to angle
    //this.sprite.rotation = this.direction

  }

  playerShot()
  {

    this.hp -= 1;
  }

}
