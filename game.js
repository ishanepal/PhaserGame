class mainScene {  
    preload() {
      // load all the assets, sprites and sounds 
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/Coin.png');
    
    }
    create() {
      // initialize scene, the positions of the sprites
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.coin = this.physics.add.sprite(300, 300, 'coin');

    // Store the score in a variable, initialized at 0
    this.score = 0;

    // style of the text 
    let style = { font: '20px Times New Roman', fill: '#fff' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);

    this.arrow = this.input.keyboard.createCursorKeys();
    }

    update() {
      // This method is called 60 times per second after create() 
      // It will handle all the game's logic, like movements

      // If the player is overlapping with the coin
    if (this.physics.overlap(this.player, this.coin)) {
        // Call the hit() method
        this.hit();
    }
      // Handle horizontal movements
    if (this.arrow.right.isDown) {
        // If the right arrow is pressed, move to the right
        this.player.x += 3;
    } else if (this.arrow.left.isDown) {
        // If the left arrow is pressed, move to the left
        this.player.x -= 3;
    } 
    
    // same for vertical movements
    if (this.arrow.down.isDown) {
        this.player.y += 3;
    } else if (this.arrow.up.isDown) {
        this.player.y -= 3;
    } 
    }

    hit() {
    // Change the position x and y of the coin randomly
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 300);

    // Increment the score by 10
    this.score += 10;

    // Display the updated score on the screen
    this.scoreText.setText('score: ' + this.score);

    // Create a new tween 
    this.tweens.add({
        targets: this.player, // on the player 
        duration: 200, // for 200ms 
        scaleX: 1.4, // that scale vertically by 40% 
        scaleY: 1.4, // and scale horizontally by 20% 
        yoyo: true, // at the end, go back to original scale 
        });
        }
  }

  new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 600, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
  });
  