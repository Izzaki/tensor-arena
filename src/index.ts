/// <reference path="../node_modules/@robotlegsjs/phaser/definitions/phaser.d.ts"/>
const Phaser = require('phaser');
import "reflect-metadata";

import * as TF from '@tensorflow/tfjs';
import {Layer} from '@tensorflow/tfjs-layers/dist/exports_layers';
import {AIVehicle} from "./Objects/AIVehicle";

import {App} from "./App";

const tensorArena = new App();

function create(): void {

    // const values: Array<number> = Array(10).fill(0).map(() => Math.random() * 100);
    // const shape: [number, number] = [2, 5];
    // const inputTensor2d: TF.Tensor2D = TF.tensor2d(values, shape, 'int32');
    // inputTensor2d.print();

    // const inputTensor2d: TF.Tensor2D = TF.tensor2d([
    //     [0.5]
    // ]);
    // inputTensor2d.print();
    //
    // const trainTensor2d: TF.Tensor2D = TF.tensor2d([
    //     [1]
    // ]);
    // trainTensor2d.print();
    //
    // const sequentialModel: TF.Sequential = TF.sequential();
    //
    // const hiddenLayer: Layer = TF.layers.dense({
    //     units: 1,
    //     inputShape: [1],
    //     activation: 'sigmoid'
    // });
    // sequentialModel.add(hiddenLayer);
    //
    // const outputLayer: Layer = TF.layers.dense({
    //     units: 1,
    //     activation: 'sigmoid'
    // });
    // sequentialModel.add(outputLayer);
    //
    // const sgdOptimizer: TF.SGDOptimizer = TF.train.sgd(0.1);
    // sequentialModel.compile({
    //     optimizer: sgdOptimizer,
    //     loss: TF.losses.meanSquaredError
    // });
    //
    // const fitConfig: TF.ModelFitArgs = {
    //     shuffle: true,
    //     epochs: 50
    // };
    // const fitPromise: Promise<TF.History> = sequentialModel.fit(inputTensor2d, trainTensor2d, fitConfig);
    // fitPromise.then((history: TF.History) => {
    //     console.log("%c @ loss: ", "color: white; background: grey", history.history.loss[0]);
    //
    //     const outputTensor2d = sequentialModel.predict(inputTensor2d);
    //     (outputTensor2d as any).print();
    // });
}
create();