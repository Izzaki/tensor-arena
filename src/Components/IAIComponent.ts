export interface AITeachConfig {
    epochs: number;
}

export interface AIComponent {

    teach(config: AITeachConfig, inputValues: Array<any>, outputValues: Array<any>): Promise<void>;

    predict(inputs: any): any;
}
