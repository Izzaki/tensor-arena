import {ThreadWorkerExecutionConfig} from "./WorkersAPI";

export class ThreadWorkerInternal {

    target: object;

    constructor(component: object) {
        this.target = component;
    }

    start(): void {
        self.onmessage = async ({data}) => {
            self.postMessage(await this.execute(data));
        };
    }

    execute(data: ThreadWorkerExecutionConfig): Promise<any> {
        return this.target[data.functionName](...(data.parameters || []))
    }
}
