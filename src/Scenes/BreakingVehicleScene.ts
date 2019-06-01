import * as TF from '@tensorflow/tfjs';
import {AIVehicle} from "../Objects/AIVehicle";
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {DefaultScene} from "./DefaultScene";

export class BreakingVehicleScene extends DefaultScene {
    static readonly KEY: string = "BreakingVehicleScene";

    vehicle: AIVehicle;
    goal: Phaser.GameObjects.Arc;

    public create(): void {
        super.create();

        this.titleText.setText('Breaking Vehicle');

        const vehicle = new AIVehicle(this, 32, 16);
        vehicle.x = 200;
        vehicle.y = 360;
        this.physics.add.existing(vehicle);
        this.add.existing(vehicle);
        this.vehicle = vehicle;

        this.goal = this.add.circle(700, 360, 10, 0xFFFF00);
        this.physics.add.existing(this.goal);

        const sequentialModel: TF.Sequential = TF.sequential();

        const hiddenLayer: Layer = TF.layers.dense({
            units: 1,
            inputShape: [1],
            activation: 'sigmoid'
        });
        sequentialModel.add(hiddenLayer);

        const outputLayer: Layer = TF.layers.dense({
            units: 1,
            activation: 'sigmoid'
        });
        sequentialModel.add(outputLayer);

        const sgdOptimizer: TF.SGDOptimizer = TF.train.sgd(0.1);
        sequentialModel.compile({
            optimizer: sgdOptimizer,
            loss: TF.losses.meanSquaredError
        });


        const trainInputTensor2d: TF.Tensor1D = TF.tensor1d(
            [-100, -50, -20, 0, 20, 50, 100]
        );
        trainInputTensor2d.print();

        const trainTensor2d: TF.Tensor1D = TF.tensor1d(
            [1, 0.8, 0.5, 0.5, 0.5, 0.2, 0]
        );
        trainTensor2d.print();

        const fitConfig: TF.ModelFitArgs = {
            // shuffle: true,
            epochs: 800
        };

        const fitPromise: Promise<TF.History> = sequentialModel.fit(trainInputTensor2d, trainTensor2d, fitConfig);

        fitPromise.then((history: TF.History) => {
            this.time.addEvent({
                loop: true,
                delay: 100,
                callback: () => {
                    const distance = this.vehicle.x - this.goal.x;
                    const inputs = [distance];
                    const outputTensor2d = sequentialModel.predict(TF.tensor2d([
                        inputs
                    ], [1, 1])) as TF.Tensor;
                    const outputs = outputTensor2d.dataSync();

                    const predictedSpeed = outputs[0] * 100 - 50;

                    this.infoText.setText([
                        `loss: ${history.history.loss[0]}`,
                        `inputs: ${inputs} (distance)`,
                        `outputs: ${outputs}`,
                        `predictedSpeed: ${predictedSpeed}`
                    ]);

                    (this.vehicle.body as Phaser.Physics.Arcade.Body).velocity = this.physics.velocityFromAngle(this.vehicle.angle, predictedSpeed * 3);
                }
            });
        });
    }

    public update(): void {

    }
}
