import {ICommand, inject, injectable} from "@robotlegsjs/core";
import {IContextSceneManager} from "@robotlegsjs/phaser";
import {BreakingVehicleScene} from "../Scenes/BreakingVehicleScene";

@injectable()
export class NextSceneCommand implements ICommand {

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    execute() {
        this.contextSceneManager.sceneManager.scenes.forEach((scene: Phaser.Scene) => {
            if (this.contextSceneManager.sceneManager.isActive(scene.scene.key)) {
                this.contextSceneManager.sceneManager.stop(scene.scene.key);
            }
        });
        this.contextSceneManager.sceneManager.start(BreakingVehicleScene.KEY);
    }
}
