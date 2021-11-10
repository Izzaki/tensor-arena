import {Config} from "../Configs/Config";
import {TextButton} from "../Views/TextButton";
import {UIEvent, UIEvents} from "../Events/UIEvent";
import {DefaultScene} from "../Scenes/DefaultScene";

export function DefaultUIView(this: DefaultScene) {
    this.titleText = this.add.text(Config.WIDTH / 2, Config.UI_PADDING, 'Title', {
        align: 'center',
        fontSize: Config.UI_FONTSIZE.toString() + 'px'
    });

    this.infoText = this.add.text(Config.UI_PADDING, Config.UI_PADDING, 'Info');

    this.loader = this.add.container(0, 0, [
        this.add.rectangle(0, 0, Config.WIDTH, Config.HEIGHT, 0x000000, 0.5).setOrigin(0, 0),
        this.add.text(Config.WIDTH / 2, Config.HEIGHT / 2, 'Loading...', {fontSize: '64px'}).setOrigin(0.5, 0.5)
    ]);

    this.previousText = new TextButton(this, 0, 0, 'Previous', {fontSize: Config.UI_FONTSIZE}, () => {
        this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_PREVIOUS);
    }).setOrigin(0.5, 0);
    this.add.existing(this.previousText);

    this.nextText = new TextButton(this, 0, 0, 'Next', {align: 'right', fontSize: Config.UI_FONTSIZE}, () => {
        this.events.emit(UIEvent.BUTTON_CLICK, UIEvents.BUTTON_NEXT);
    }).setOrigin(0.5, 0);
    this.add.existing(this.nextText);

    Phaser.Actions.GridAlign([this.previousText, this.nextText], {
        x: Config.WIDTH / 2,
        y: Config.HEIGHT - 20,
        cellWidth: 300,
        cellHeight: 40,
        width: 10,
    });
}
