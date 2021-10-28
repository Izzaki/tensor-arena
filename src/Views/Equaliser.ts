export class Equaliser extends Phaser.GameObjects.Container {

    protected _rectangles: Array<Phaser.GameObjects.Rectangle> = [];

    constructor(scene: Phaser.Scene, width = 128, height = 128, length: number = 256) {
        super(scene);

        const container = scene.add.container();
        this.add(container);

        for (let i = 0; i < length; i++) {
            const rectangle = scene.add.rectangle(i * 10, 0, 8, 50, 0xFFFFFF, 0.5);
            container.add(rectangle);
            this._rectangles.push(rectangle);
        }
    }

    drawFrequencies(data): void {
        data.forEach((data, index) => {
            // const db = 20 * Math.log10(data) / 255 * 100;
            this._rectangles[index].height = -data;
        });
    }
}
