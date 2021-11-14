export interface ThreadWorkerExecutionConfig<T = string> {
    functionName: T;
    parameters: Array<any>;
}
