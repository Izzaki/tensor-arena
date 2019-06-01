import * as TF from '@tensorflow/tfjs';

let seeded = false;
let previous = false;
let y2 = 0;

const lcg = (function() {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    var a = 1664525;
    // c and m should be co-prime
    var c = 1013904223;
    var seed, z;
    return {
        setSeed: function(val) {
            // pick a random seed if val is undefined or null
            // the >>> 0 casts the seed to an unsigned 32-bit integer
            z = seed = (val == null ? Math.random() * m : val) >>> 0;
        },
        getSeed: function() {
            return seed;
        },
        rand: function() {
            // define the recurrence relationship
            z = (a * z + c) % m;
            // return a float in [0, 1)
            // if z = m then z / m = 0 therefore (z % m) / m < 1 always
            return z / m;
        }
    };
})();

const random = function(min, max) {
    var rand;

    if (seeded) {
        rand = lcg.rand();
    } else {
        rand = Math.random();
    }
    if (typeof min === 'undefined') {
        return rand;
    } else if (typeof max === 'undefined') {
        if (min instanceof Array) {
            return min[Math.floor(rand * min.length)];
        } else {
            return rand * min;
        }
    } else {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }

        return rand * (max - min) + min;
    }
};

const randomGaussian = function(mean?, sd?) {
    var y1, x1, x2, w;
    if (previous) {
        y1 = y2;
        previous = false;
    } else {
        do {
            x1 = Math.random() * 2 - 1;
            x2 = Math.random() * 2 - 1;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1);
        w = Math.sqrt(-2 * Math.log(w) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        previous = true;
    }

    var m = mean || 0;
    var s = sd || 1;
    return y1 * s + m;
};

export class NeuralNetwork implements TF.TensorContainerObject {
    [x: string]: TF.TensorContainer | any;

    model: TF.Sequential;
    input_nodes: any;
    hidden_nodes: any;
    output_nodes: any;

    constructor(a, b, c, d?) {
        if (a instanceof TF.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    copy(): NeuralNetwork {
        return TF.tidy<NeuralNetwork>(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
        });
    }

    mutate(rate): void {
        TF.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (Math.random() < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = TF.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    dispose(): void {
        this.model.dispose();
    }

    predict(inputs): TF.TensorContainer {
        return TF.tidy(() => {
            const xs = TF.tensor2d([inputs]);
            const ys = this.model.predict(xs) as TF.Tensor<TF.Rank>;
            const outputs = ys.dataSync();
            // console.log(outputs);
            return outputs;
        });
    }

    createModel(): TF.Sequential {
        const model = TF.sequential();
        const hidden = TF.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        model.add(hidden);
        const output = TF.layers.dense({
            units: this.output_nodes,
            activation: 'sigmoid'
        });
        model.add(output);
        return model;
    }

    learn(): void {

    }
}
