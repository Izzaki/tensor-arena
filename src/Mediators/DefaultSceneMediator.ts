import {injectable} from "inversify";
import {SceneMediator} from "@robotlegsjs/phaser";
import {DefaultScene} from "../Scenes/DefaultScene";

@injectable()
export class DefaultSceneMediator extends SceneMediator<DefaultScene> {
    public initialize(): void {

    }

    public destroy(): void {

    }
}
