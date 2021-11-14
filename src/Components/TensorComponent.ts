import {AIComponent, AITeachConfig} from "./IAIComponent";
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {TensorLike2D} from '@tensorflow/tfjs-core/dist/types';
import * as TF from "@tensorflow/tfjs";


export class TensorComponent implements AIComponent {

    protected sequentialModel;

    teach(config: AITeachConfig, inputValues: Array<any>, outputValues: Array<any>): Promise<any> {
        const trainingInputTensor2d: TF.Tensor2D = TF.tensor2d(inputValues);
        const trainingOutputTensor2d: TF.Tensor2D = TF.tensor2d(outputValues);

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

        this.sequentialModel = sequentialModel;

        return sequentialModel.fit(trainingInputTensor2d, trainingOutputTensor2d, config);
    }

    predict(inputs: TensorLike2D): any {
        const outputTensor2d = this.sequentialModel.predict(TF.tensor2d(inputs, [1, 1])) as TF.Tensor;
        return outputTensor2d.dataSync();
    }
}
