import * as TF from '@tensorflow/tfjs';
import {AIVehicle} from "../Objects/AIVehicle";
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {DefaultScene} from './DefaultScene';

export class VehiclesScene extends DefaultScene {
    static readonly KEY: string = "VehiclesScene";

    vehicle: AIVehicle;
    goal: Phaser.GameObjects.Arc;

    public create(): void {
        super.create();

        this.titleText.setText('Vehicles');

        const vehicle = new AIVehicle(this, 32, 16);
        vehicle.x = 200;
        vehicle.y = 700;
        this.physics.add.existing(vehicle);
        this.add.existing(vehicle);
        this.vehicle = vehicle;

        this.goal = this.add.circle(700, 360, 10, 0xFFFF00);
        this.physics.add.existing(this.goal);
        (this.goal.body as Phaser.Physics.Arcade.Body).setGravityY(100);
        (this.goal.body as Phaser.Physics.Arcade.Body).setBounceY(1);
        (this.goal.body as Phaser.Physics.Arcade.Body).collideWorldBounds = true;

        // this.physics.add.collider(this.vehicle, this.goal);

        const sequentialModel: TF.Sequential = TF.sequential();

        const hiddenLayer: Layer = TF.layers.dense({
            units: 3,
            inputShape: [2],
            activation: 'sigmoid'
        });
        sequentialModel.add(hiddenLayer);

        const outputLayer: Layer = TF.layers.dense({
            units: 2,
            activation: 'sigmoid'
        });
        sequentialModel.add(outputLayer);

        const sgdOptimizer: TF.Optimizer = TF.train.adam(0.1);
        sequentialModel.compile({
            optimizer: sgdOptimizer,
            loss: TF.losses.meanSquaredError
        });

        const batch = TF.data.array([123,2131,2321,3,213,21,321,321,321]).batch(2);
        console.log("%c @ batch : ", "color: white; background: grey", batch);

        const trainInputTensor2d: TF.Tensor2D = TF.tensor2d(
            [
                [-200, -200],
                [-500, 500],
                [700, -700],
                [300, 300],
                [-400, -400],
                [3000, 2000],
                [-15, 30],
                [1000, -120],
                [20000, 20000]
            ]
        );
        trainInputTensor2d.print();

        const trainTensor2d: TF.Tensor2D = TF.tensor2d(
            [
                [1, 1],
                [1, 0],
                [0, 1],
                [0, 0],
                [1, 1],
                [0, 0],
                [1, 0],
                [0, 1],
                [0, 0]
            ]
        );
        trainTensor2d.print();

        const fitConfig: TF.ModelFitArgs = {
            // shuffle: true,
            epochs: 600
        };

        const fitPromise: Promise<TF.History> = sequentialModel.fit(trainInputTensor2d, trainTensor2d, fitConfig);

        fitPromise.then((history: TF.History) => {
            this.time.addEvent({
                loop: true,
                delay: 100,
                callback: () => {
                    const distanceX = this.vehicle.x - this.goal.x;
                    const distanceY = this.vehicle.y - this.goal.y;
                    const inputs = [distanceX, distanceY];
                    const outputTensor2d = sequentialModel.predict(TF.tensor2d([inputs], [1, 2])) as TF.Tensor;
                    const outputs = outputTensor2d.dataSync();

                    const predictedAngle = outputs[0] * 100 - 50;

                    this.infoText.setText([
                        `loss: ${history.history.loss[0]}`,
                        `inputs: ${inputs}`,
                        `outputs: ${outputs}`,
                        `distanceX ${distanceX}`,
                        `distanceY ${distanceY}`
                    ]);

                    // (this.vehicle.body as Phaser.Physics.Arcade.Body).velocity = this.physics.velocityFromAngle(predictedAngle, 20);
                    (this.vehicle.body as Phaser.Physics.Arcade.Body).velocity.x = outputs[0] * 200 - 100;
                    (this.vehicle.body as Phaser.Physics.Arcade.Body).velocity.y = outputs[1] * 200 - 100;
                }
            });
        });
    }

    public update(): void {

    }
}
