class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {}
    create() {
        //define our objects
        //set up
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({ scene: this });

        // var sb = new SoundButtons({ scene: this });

        // create cannon bob animation

        this.backgroundScrollSpeed = 5;
        this.bobSpeed = 10;
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        console.log(game.config.width, game.config.height);

        this.background = this.add.image(0, 0, 'background');

        // this.bobChar = this.add.sprite(
        //     game.config.width / 2,
        //     game.config.height / 2,
        //     'bob'
        // );

        //this.bobChar.angle = 270;

        this.anims.create({
            key: 'fire',
            frames: [
                { key: 'bob', frame: 1 },
                { key: 'bob', frame: 2 },
                { key: 'bob', frame: 3 },
                { key: 'bob', frame: 4 },
                { key: 'bob', frame: 5 },
                { key: 'bob', frame: 6 },
                { key: 'bob', frame: 7 },
                { key: 'bob', frame: 8 },
                { key: 'bob', frame: 9 }
                //{ key: 'bob', frame: 10 }
            ],
            frameRate: 18,
            repeat: -1
        });

        this.bobGroup = this.physics.add.group();
        // this.bloidGroup = this.physics.add.group();

        //this.bobChar.play('fire');

        this.playerShip = this.physics.add.sprite(
            game.config.width / 2,
            game.config.height / 2,
            'airship'
        );
        Align.scaleToGameW(this.playerShip, 0.125);

        this.playerShip.body.collideWorldBounds = true;

        // set up a transparent overlay to capture interaction
        this.overlay = this.add.image(this.centerX, this.centerY, 'overlay');
        this.overlay.setOrigin(0.5, 0.5);

        this.overlay.setInteractive();
        this.overlay.on('pointerdown', this.onPointerDown, this);

        // temp bloid code
        // this.block = this.physics.add.sprite(
        //     600,
        //     this.centerY,
        //     'blackeye-block-1'
        // );
        // this.bloidGroup.add(this.block);

        // this.setColliders();

        this.bloids = new Bloids({
            scene: this,
            numBloids: 3,
            rowX: game.config.width / 2,
            rowY: game.config.height / 2
        });
    }

    // setColliders() {
    //     // between bob and bloid
    //     this.physics.add.collider(
    //         this.bobGroup,
    //         this.block,
    //         this.bobHitBlock,
    //         null,
    //         this
    //     );
    // }

    bobHitBlock(block, bob) {
        block.destroy();
        bob.destroy();
    }

    scrollBackground() {
        console.log(this.backgroundScrollSpeed);
        this.background.x -= this.backgroundScrollSpeed;
        // image is 1536 width... but > -1055 results in a black gap
        if (this.background.x < -1055) {
            console.log(this.background.x);
            this.background.x = 0;
        }
    }

    onPointerDown() {
        var tx = this.overlay.input.localX;
        var ty = this.overlay.input.localY;
        console.log(tx, ty);
        var angle = this.physics.moveTo(this.playerShip, tx, ty, 250);
        angle = this.toDegrees(angle);
        // this.playerShip.angle = angle;

        this.fireBob();
    }

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    }

    // moveBlock() {
    //     this.block.x--;
    //     if (this.block.x < -this.block.x.width) {
    //         this.block.destroy();
    //     }
    // }

    fireBob() {
        this.bob = this.physics.add.sprite(
            this.playerShip.x,
            this.playerShip.y,
            'bob'
        );
        this.bobGroup.add(this.bob);
        Align.scaleToGameW(this.bob, 0.025);
        this.bob.play('fire');

        this.bob.body.setVelocity(350, 0);
    }

    update() {
        //constant running loop
        this.scrollBackground();
        //this.moveBlock();
    }
}
