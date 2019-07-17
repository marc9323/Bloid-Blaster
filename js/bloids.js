// Adds a row of Bloids container to the scene and manages them

class Bloids extends Phaser.GameObjects.Container {
    // scene, number of bloids, rowX, rowY
    constructor(config) {
        super(config.scene);

        // number of bloids to create
        this.numBloids = config.numBloids;

        // create a physics group for the Bloids
        this.bloidGroup = this.physics.add.group();

        // starting x, y position for the row
        this.rowX = config.rowX;
        this.rowY = config.rowY;

        // create a row of bloids, add to physics, add to physics group bloidGroup
        for (var i = 0; i < this.numBloids; i++) {
            // pick a random number for the Bloid color
            var bloidColor = Math.floor(Math.random() * 6);
            this.bloid = this.physics.add.sprite(
                this.rowX,
                this.rowY,
                `blackeye-block-${bloidColor}`
            );
            this.bloidGroup.add(this.bloid);
        }
    }

    addObject() {}
}
