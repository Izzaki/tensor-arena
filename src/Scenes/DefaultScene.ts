import {Assets, AssetsPaths} from "../Assets/Assets";
import {TextButton} from "../Objects/TextButton";
import {UIEvent, UIEvents} from "../Events/UIEvent";

export class DefaultScene extends Phaser.Scene {
    static readonly KEY: string = "DefaultScene";

    titleText: Phaser.GameObjects.Text;
    infoText: Phaser.GameObjects.Text;
    previousText: Phaser.GameObjects.Text;
    nextText: Phaser.GameObjects.Text;

    constructor() {
        super({});
    }

    preload(): void {
        this.load.image(Assets.ROCKET, AssetsPaths.ROCKET);
    }

    create(): void {
        this.infoText = this.add.text(0, 0, "Info");

        this.previousText = new TextButton(this, 512 - 50, 700, "Previous", {}, () => {
            this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_PREVIOUS);
        });
        this.add.existing(this.previousText);

        this.nextText = new TextButton(this, 512 + 50, 700, "Next", {align: 'right'}, () => {
            this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_NEXT);
        });
        this.add.existing(this.nextText);

        this.titleText = this.add.text(512, 0, "Title", {align: 'center'});
    }
}
