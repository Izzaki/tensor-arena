import {AIComponent, AITeachConfig} from "./IAIComponent";
import {WorkerThread} from "../Threads/WorkerThread";
import {TensorComponent} from "./TensorComponent";

export class ThreadedTensorComponent implements AIComponent {

    protected thread: WorkerThread<TensorComponent>;

    constructor() {
        this.thread = new WorkerThread<TensorComponent>('TensorComponentWorker.js');
    }

    teach(config: AITeachConfig, inputValues: Array<any>, outputValues: Array<any>): Promise<void> {
        return this.thread.execute({
            functionName: 'teach',
            parameters: [config, inputValues, outputValues],
        });
    }

    predict(inputs: any): Promise<any> {
        return this.thread.execute({
            functionName: 'predict',
            parameters: [inputs],
        });
    }
}
