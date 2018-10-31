import * as TF from '@tensorflow/tfjs';
import {DType} from '@tensorflow/tfjs-core/dist/types';
import {Layer} from '@tensorflow/tfjs-layers/dist/exports_layers';

// const values: Array<number> = Array(10).fill(0).map(() => Math.random() * 100);
// const shape: [number, number] = [2, 5];
// const inputTensor2d: TF.Tensor2D = TF.tensor2d(values, shape, DType.int32);
// inputTensor2d.print();

const inputTensor2d: TF.Tensor2D = TF.tensor2d([
    [0, 0],
    [0.5, 0.5],
    [1, 1],
]);
inputTensor2d.print();

const trainTensor2d: TF.Tensor2D = TF.tensor2d([
    [1],
    [0.5],
    [0],
]);
trainTensor2d.print();

const sequentialModel: TF.Sequential = TF.sequential();

const hiddenLayer: Layer = TF.layers.dense({
    units: 4,
    inputShape: [2],
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

const fitConfig: TF.ModelFitConfig = {
    shuffle: true,
    epochs: 300
};
const fitPromise: Promise<TF.History> = sequentialModel.fit(inputTensor2d, trainTensor2d, fitConfig);
fitPromise.then((history: TF.History) => {
    console.log("%c @ loss: ", "color: white; background: grey", history.history.loss[0]);

    const outputTensor2d = sequentialModel.predict(inputTensor2d);
    (outputTensor2d as any).print();
});
