import {injectable} from "inversify";
import {SceneMediator} from "@robotlegsjs/phaser";
import {DefaultScene} from "../Scenes/DefaultScene";
import {UIEvent, UIEvents} from "../Events/UIEvent";

@injectable()
export class DefaultSceneMediator extends SceneMediator<DefaultScene> {
    
    public initialize(): void {
        this.scene.events.on(UIEvent.BUTTON_CLICK, this._onButtonClick, this);
    }

    public destroy(): void {
        this.scene.events.off(UIEvent.BUTTON_CLICK, this._onButtonClick, this, false);
    }

    private _onButtonClick(eventData: UIEvents): void {
        this._eventDispatcher.dispatchEvent(new UIEvent(eventData));
    }
}
