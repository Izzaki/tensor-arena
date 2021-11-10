import * as TF from '@tensorflow/tfjs';
import {Rocket} from "../../Views/Rocket";
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {DefaultScene} from '../DefaultScene';
import {Aim} from "../../Views/Aim";
import {Config} from "../../Configs/Config";
import {Assets} from "../../Assets/Assets";

export class ImageTextGuesser extends DefaultScene {

    public create(): void {
        super.create('Image');

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
        //
        fitPromise.then((history: TF.History) => {
            this.hideLoader();
            this.time.addEvent({
                loop: true,
                delay: 30,
                callback: () => {

                }
            });
        });
    }
}
