import {Assets, AssetsPaths} from "../Assets/Assets";
import {TextButton} from "../Objects/TextButton";
import {UIEvent, UIEvents} from "../Events/UIEvent";
import {Config} from "../Configs/Config";

export class DefaultScene extends Phaser.Scene {
    static readonly KEY: string = "DefaultScene";

    titleText: Phaser.GameObjects.Text;
    infoText: Phaser.GameObjects.Text;
    previousText: Phaser.GameObjects.Text;
    nextText: Phaser.GameObjects.Text;
    loader: Phaser.GameObjects.Container;

    constructor() {
        super({});
    }

    preload(): void {
        this.load.image(Assets.ROCKET, AssetsPaths.ROCKET);
        this.load.image(Assets.AIM, AssetsPaths.AIM);
        this.load.image(Assets.SKY, AssetsPaths.SKY);
    }

    create(): void {
        const background = this.add.sprite(0, 0, Assets.SKY);
        background.setDisplaySize(Config.WIDTH, Config.HEIGHT);
        background.setOrigin(0, 0);

        this.previousText = new TextButton(this, Config.WIDTH / 2 - 100, Config.HEIGHT - Config.UI_PADDING - 20, "Previous", {fontSize: Config.UI_FONTSIZE}, () => {
            this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_PREVIOUS);
        });
        this.add.existing(this.previousText);

        this.nextText = new TextButton(this, Config.WIDTH / 2 + 100, Config.HEIGHT - Config.UI_PADDING - 20, "Next", {align: 'right', fontSize: Config.UI_FONTSIZE}, () => {
            this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_NEXT);
        });
        this.add.existing(this.nextText);

        this.infoText = this.add.text(Config.UI_PADDING, Config.UI_PADDING, "Info");
        this.titleText = this.add.text(Config.WIDTH / 2, Config.UI_PADDING, "Title", {align: 'center', fontSize: Config.UI_FONTSIZE});

        this.loader = this.add.container(0, 0, [
            this.add.rectangle(0, 0, Config.WIDTH, Config.HEIGHT, 0x000000, 0.5).setOrigin(0, 0),
            this.add.text(Config.WIDTH / 2, Config.HEIGHT / 2, 'Loading...', {fontSize: 64}).setOrigin(0.5, 0.5)
        ]);
    }

    hideLoader(): void {
        this.loader.visible = false;
    }
}
