class mainScene {
  preload() {
      // Load the player image
      this.load.image('player', 'assets/player.png');
      this.load.image('ring', 'assets/ring.png');
  }

  create() {
      // Create the player sprite
      this.player = this.physics.add.sprite(100, 100, 'player');
      this.ring = this.physics.add.sprite(300, 300, 'ring');

      // Scale the player sprite
      this.player.setScale(0.65, 0.65);

      // Store the score in a variable, initialized at 0
      this.score = 0;

      // Style of the text
      let style = { font: '20px Times New Roman', fill: '#fff' };

      // Display the score in the top left corner
      this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);

      // Set up the keyboard controls
      this.arrow = this.input.keyboard.createCursorKeys();

      // Set a cooldown timer to avoid rapid collision detection
      this.lastHitTime = 0;
  }

  update(time) {
      // This method is called 60 times per second after create()

      // Handle player movement
      if (this.arrow.right.isDown) {
          this.player.x += 3;
      } else if (this.arrow.left.isDown) {
          this.player.x -= 3;
      }

      if (this.arrow.down.isDown) {
          this.player.y += 3;
      } else if (this.arrow.up.isDown) {
          this.player.y -= 3;
      }

      // Constrain the player's position within the game boundaries
      this.player.x = Phaser.Math.Clamp(this.player.x, 25, this.sys.game.config.width - 25);
      this.player.y = Phaser.Math.Clamp(this.player.y, 30, this.sys.game.config.height - 30);

      // Avoid hit detection happening too quickly
      if (time - this.lastHitTime > 500) { // 500ms cooldown
          if (this.physics.overlap(this.player, this.ring)) {
              this.hit(time);
          }
      }
  }

  hit(time) {
      // Randomize the position of the ring
      this.ring.x = Phaser.Math.Between(100, 600);
      this.ring.y = Phaser.Math.Between(100, 300);

      // Increment the score by 10
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      // Animate the player sprite with a scaling effect
      this.tweens.add({
          targets: this.player,
          duration: 200,
          scaleX: 1.2,
          scaleY: 1.2,
          yoyo: true, // Return to original size
      });

      // Update last hit time
      this.lastHitTime = time;
  }
}

new Phaser.Game({
  width: 700,
  height: 600,
  backgroundColor: '#3498db',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game',
});
