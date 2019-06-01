import {NeuralNetwork} from "../NeuralNetwork/NeuralNetwork";
import {Lidar} from "./Lidar";

export class AIVehicle extends Phaser.GameObjects.Container {
    public readonly neuralNetwork: NeuralNetwork;
    public readonly lidar: Lidar;

    constructor(scene: Phaser.Scene, width = 64, height = 32) {
        super(scene, 0, 0);

        this.add(scene.add.rectangle(0, 0, width, height, 0x00FFFF));

        this.lidar = new Lidar(3);
        this.neuralNetwork = new NeuralNetwork(1, 2, 1);
    }
}
