import {ThreadWorkerExecutionConfig} from "../Workers/WorkersAPI";

export class WorkerThread<T = any> {

    protected worker: Worker;

    constructor(workerUrl: string) {
        this.worker = new Worker(workerUrl);
    }

    execute(config: ThreadWorkerExecutionConfig<keyof T>): Promise<any> {
        return new Promise((resolve) => {
            this.worker.postMessage(config);
            this.worker.onmessage = (event) => {
                resolve(event.data);
            };
        });
    }
}
