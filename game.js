
class mainScene {
    preload() {
      // Load the player image
      this.load.image('player', 'assets/player.png');
      this.load.image('ring', 'assets/ring.png');
    }
  
    create() {
      // Get the game container dimensions to keep sprites within the circle
      this.gameWidth = this.sys.game.config.width;
      this.gameHeight = this.sys.game.config.height;
      this.gameCenterX = this.gameWidth / 2;
      this.gameCenterY = this.gameHeight / 2;
      this.gameRadius = this.gameWidth / 2;
  
      // Create the player sprite within the circular area
      this.player = this.physics.add.sprite(this.gameCenterX - 150, this.gameCenterY, 'player');
      this.ring = this.physics.add.sprite(this.gameCenterX + 100, this.gameCenterY, 'ring');
  
      // Scale the player sprite
      this.player.setScale(0.65, 0.65).setDepth(10);
  
      // Store the score in a variable, initialized at 0
      this.score = 0;
  
      // Style of the text
      let style = { font: '30px fantasy', fill: '#fff' };
  
      // Display the score in the center of the game
      this.scoreText = this.add.text(this.gameCenterX - this.gameRadius + 150, this.gameCenterY - 200, 'Score: ' + this.score, style)
        .setOrigin(0.5)
        .setDepth(20); // Make sure score is above everything
  
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
  
      // Constrain the player's position within the circular boundary
  let distanceFromCenter = Phaser.Math.Distance.Between(this.gameCenterX, this.gameCenterY, this.player.x, this.player.y);
  
  // If the player goes beyond the circle, move them back to the edge
  if (distanceFromCenter > this.gameRadius - 25) {
    let angle = Phaser.Math.Angle.Between(this.gameCenterX, this.gameCenterY, this.player.x, this.player.y);
    this.player.x = this.gameCenterX + (this.gameRadius - 25) * Math.cos(angle);
    this.player.y = this.gameCenterY + (this.gameRadius - 25) * Math.sin(angle);
  }
    //   this.player.x = Phaser.Math.Clamp(this.player.x, this.gameCenterX - this.gameRadius + 25, this.gameCenterX + this.gameRadius - 25);
    //   this.player.y = Phaser.Math.Clamp(this.player.y, this.gameCenterY - this.gameRadius + 25, this.gameCenterY + this.gameRadius - 25);
  
      // Avoid hit detection happening too quickly
      if (time - this.lastHitTime > 500) { // 500ms cooldown
        if (this.physics.overlap(this.player, this.ring)) {
          this.hit(time);
        }
      }
    }
  
    hit(time) {
      // Randomize the position of the ring within the circular space
      let angle = Phaser.Math.Between(0, 360);
      let distance = Phaser.Math.Between(100, this.gameRadius - 50); // Keep ring within the circle's radius
      this.ring.x = this.gameCenterX + distance * Math.cos(Phaser.Math.DegToRad(angle));
      this.ring.y = this.gameCenterY + distance * Math.sin(Phaser.Math.DegToRad(angle));
  
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
    width: 800,
    height: 769.5,
    transparent: true,
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
  });
  