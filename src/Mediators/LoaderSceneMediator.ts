import {injectable} from "inversify";
import {SceneMediator} from "@robotlegsjs/phaser";
import {DefaultScene} from "../Scenes/DefaultScene";
import {ScenesModel} from "../Models/ScenesModel";
import {inject} from "@robotlegsjs/core";

@injectable()
export class LoaderSceneMediator extends SceneMediator<DefaultScene> {

    @inject(ScenesModel)
    scenesModel: ScenesModel;

    public initialize(): void {
        const firstScene = this.scenesModel.scenes[0];
        this.scene.scene.start("0");
        this.scenesModel.setScene(firstScene);
    }

    public destroy(): void {
    }
}
