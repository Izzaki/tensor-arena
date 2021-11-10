import {generate} from "../Utilities/Generate";
import {AIComponent} from "../Components/IAIComponent";
import {AITensorComponent} from "../Components/AITensorComponent";
import {DefaultUIView} from "../RootViews/DefaultUIView";

export class DefaultScene extends Phaser.Scene {

    @generate
    static readonly KEY: string;

    aiComponent: AIComponent;

    titleText: Phaser.GameObjects.Text;
    infoText: Phaser.GameObjects.Text;
    previousText: Phaser.GameObjects.Text;
    nextText: Phaser.GameObjects.Text;
    loader: Phaser.GameObjects.Container;

    constructor(config = {}) {
        super(config);
    }

    create(title: string = ''): void {
        DefaultUIView.call(this);

        this.aiComponent = new AITensorComponent();

        this.titleText.setText(title);
        this.loader.setVisible(true);
    }

    hideLoader(): void {
        this.loader.visible = false;
    }
}
