class Movement extends Phaser.Scene {
  constructor() {
      super('movementScene');
  }

  init() {
      this.PLAYER_VELOCITY = 350;
  }

  preload() {
      this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
          frameWidth: 48
      });
  }

  create() {
      this.cameras.main.setBackgroundColor(0xDDDDDD);

      this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1)
          .setScale(2)
          .setCollideWorldBounds(true)
          .setSize(32, 32)
          .setOffset(8, 16);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.createAnimations();
  }

  createAnimations() {
      const animations = [
          { key: 'idle-down', frame: 1 },
          { key: 'idle-up', frame: 10 },
          { key: 'idle-left', frame: 4 },
          { key: 'idle-right', frame: 7 },
      ];

      animations.forEach(anim => {
          this.anims.create({
              key: anim.key,
              frames: [{ key: 'character', frame: anim.frame }],
              frameRate: 0,
              repeat: -1
          });
      });

      const walkingAnimations = [
          { key: 'walk-down', start: 0, end: 2 },
          { key: 'walk-up', start: 9, end: 11 },
          { key: 'walk-left', start: 3, end: 5 },
          { key: 'walk-right', start: 6, end: 8 }
      ];

      walkingAnimations.forEach(anim => {
          this.anims.create({
              key: anim.key,
              frames: this.anims.generateFrameNumbers('character', { start: anim.start, end: anim.end }),
              frameRate: 5,
              repeat: -1
          });
      });
  }

  update() {
      let playerVector = new Phaser.Math.Vector2(0, 0);
      let playerDirection = 'down';

      if (this.cursors.left.isDown) {
          playerVector.x = -1;
          playerDirection = 'left';
      } else if (this.cursors.right.isDown) {
          playerVector.x = 1;
          playerDirection = 'right';
      }
      if (this.cursors.up.isDown) {
          playerVector.y = -1;
          playerDirection = 'up';
      } else if (this.cursors.down.isDown) {
          playerVector.y = 1;
          playerDirection = 'down';
      }

      playerVector.normalize();
      this.player.setVelocity(playerVector.x * this.PLAYER_VELOCITY, playerVector.y * this.PLAYER_VELOCITY);

      const playerMovement = playerVector.length() ? 'walk' : 'idle';
      this.player.play(`${playerMovement}-${playerDirection}`, true);
  }
}
