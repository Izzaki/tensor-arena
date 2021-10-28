import {PhaserEvents} from "../Events/PhaserEvents";

export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style);

        this.setInteractive({useHandCursor: true})
            .on(PhaserEvents.POINTER_OVER, () => this._hoverState())
            .on(PhaserEvents.POINTER_OUT, () => this._restState())
            .on(PhaserEvents.POINTER_DOWN, () => this._activeState())
            .on(PhaserEvents.POINTER_UP, () => {
                this._hoverState();
                callback();
            });
    }

    protected _hoverState() {
        this.setStyle({fill: '#d5fcff'});
    }

    protected _restState() {
        this.setStyle({fill: '#FFFFFF'});
    }

    protected _activeState() {
        this.setStyle({fill: '#00c1ff'});
    }
}
