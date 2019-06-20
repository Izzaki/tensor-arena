import * as TF from '@tensorflow/tfjs';
import {Rocket} from "../Objects/Rocket";
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {DefaultScene} from './DefaultScene';

export class VehiclesScene extends DefaultScene {
    static readonly KEY: string = "VehiclesScene";

    vehicle: Rocket;
    goal: Phaser.GameObjects.Arc;

    public create(): void {
        super.create();

        this.titleText.setText('Vehicles');

        const vehicle = new Rocket(this, 64, 64);
        this.physics.add.existing(vehicle);
        vehicle.x = 200;
        vehicle.y = 700;
        vehicle.setAngle(-90);
        this.add.existing(vehicle);
        this.vehicle = vehicle;

        this.goal = this.add.circle(700, 360, 10, 0xFFFF00);
        this.physics.add.existing(this.goal);

        const vehicleBody = this.vehicle.body as Phaser.Physics.Arcade.Body;
        const goalBody = this.goal.body as Phaser.Physics.Arcade.Body;

        goalBody.setGravityY(100);
        goalBody.setBounceY(1);
        goalBody.collideWorldBounds = true;

        // this.physics.add.collider(this.vehicle, this.goal);

        const sequentialModel: TF.Sequential = TF.sequential();

        const hiddenLayer: Layer = TF.layers.dense({
            units: 2,
            inputShape: [1],
            activation: 'sigmoid'
        });
        sequentialModel.add(hiddenLayer);

        const outputLayer: Layer = TF.layers.dense({
            units: 1,
            activation: 'sigmoid'
        });
        sequentialModel.add(outputLayer);

        const sgdOptimizer: TF.Optimizer = TF.train.adam(0.1);
        sequentialModel.compile({
            optimizer: sgdOptimizer,
            loss: TF.losses.meanSquaredError
        });

        // const batch = TF.data.array([123,2131,2321,3,213,21,321,321,321]).batch(2);
        // console.log("%c @ batch : ", "color: white; background: grey", batch);

        const trainInputTensor2d: TF.Tensor2D = TF.tensor2d(
            [
                [360],
                [270],
                [180],
                [90],
                [0],
                [-90],
                [-180],
                [-270],
                [-360],
            ]
        );
        trainInputTensor2d.print();

        const trainTensor2d: TF.Tensor2D = TF.tensor2d(
            [
                [0.1],
                [0.2],
                [0.3],
                [0.4],
                [0.5],
                [0.6],
                [0.7],
                [0.8],
                [0.9],
            ]
        );
        trainTensor2d.print();

        const fitConfig: TF.ModelFitArgs = {
            // shuffle: true,
            epochs: 200
        };

        const fitPromise: Promise<TF.History> = sequentialModel.fit(trainInputTensor2d, trainTensor2d, fitConfig);

        fitPromise.then((history: TF.History) => {
            this.time.addEvent({
                loop: true,
                delay: 30,
                callback: () => {
                    const angleOffset = this.vehicle.angle - Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(vehicleBody.x, vehicleBody.y, goalBody.x, goalBody.y));
                    const inputs = [angleOffset];
                    const outputTensor2d = sequentialModel.predict(TF.tensor2d([inputs], [1, 1])) as TF.Tensor;
                    const outputs = outputTensor2d.dataSync();

                    const predictedAngle = outputs[0] * 360 - 180;

                    const angle = this.vehicle.angle + predictedAngle / 20;
                    this.physics.velocityFromAngle(angle, 200, vehicleBody.velocity);
                    this.vehicle.angle = angle;

                    this.infoText.setText([
                        `loss: ${history.history.loss[0]}`,
                        `inputs: ${inputs}`,
                        `outputs: ${outputs}`,
                        `angle: ${this.vehicle.angle}`
                    ]);
                }
            });
        });
    }

    public update(): void {

    }
}
