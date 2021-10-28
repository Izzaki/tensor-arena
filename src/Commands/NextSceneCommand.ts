import {ICommand, inject, injectable} from "@robotlegsjs/core";
import {IContextSceneManager} from "@robotlegsjs/phaser";
import {ScenesModel} from "../Models/ScenesModel";

@injectable()
export class NextSceneCommand implements ICommand {

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    @inject(ScenesModel)
    public scenesModel: ScenesModel;

    execute(): void {
        const nextScene: Phaser.Scene = this.scenesModel.scenes[this.scenesModel.currentSceneIndex + 1];
        if (nextScene) {
            this.contextSceneManager.sceneManager.stop(this.scenesModel.currentScene);
            this.contextSceneManager.sceneManager.start(nextScene);
            this.scenesModel.setScene(nextScene);
        }
    }
}
