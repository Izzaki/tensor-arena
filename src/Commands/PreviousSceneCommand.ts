import {ICommand, injectable, inject} from "@robotlegsjs/core";
import {IContextSceneManager} from "@robotlegsjs/phaser";
import {VehiclesScene} from "../Scenes/VehiclesScene";

@injectable()
export class PreviousSceneCommand implements ICommand {

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    execute() {
        this.contextSceneManager.sceneManager.scenes.forEach((scene: Phaser.Scene) => {
            if (this.contextSceneManager.sceneManager.isActive(scene.scene.key)) {
                this.contextSceneManager.sceneManager.stop(scene.scene.key);
            }
        });
        this.contextSceneManager.sceneManager.start(VehiclesScene.KEY);
    }
}
