import {ICommand, injectable, inject} from "@robotlegsjs/core";
import {IContextSceneManager} from "@robotlegsjs/phaser";
import {ScenesModel} from "../Models/ScenesModel";

@injectable()
export class PreviousSceneCommand implements ICommand {

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    @inject(ScenesModel)
    public scenesModel: ScenesModel;

    execute() {
        const previousScene: Phaser.Scene = this.scenesModel.scenes[this.scenesModel.currentSceneIndex - 1];
        if (previousScene) {
            this.contextSceneManager.sceneManager.stop(this.scenesModel.currentScene);
            this.contextSceneManager.sceneManager.start(previousScene);
            this.scenesModel.setScene(previousScene);
        }
    }
}
