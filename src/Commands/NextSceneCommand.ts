import {ICommand, inject, injectable} from "@robotlegsjs/core";
import {IContextSceneManager} from "@robotlegsjs/phaser";
import {scenesKeys} from "../Scenes/ScenesKeys";

@injectable()
export class NextSceneCommand implements ICommand {

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    execute() {
        scenesKeys.forEach((sceneKey: string) => {
            if (this.contextSceneManager.sceneManager.isActive(sceneKey)) {

                const previousSceneKeyIndex = scenesKeys.indexOf(sceneKey) + 1;
                const previousSceneKey = scenesKeys[previousSceneKeyIndex];

                if (previousSceneKey) {
                    this.contextSceneManager.sceneManager.stop(sceneKey);
                    this.contextSceneManager.sceneManager.start(previousSceneKey);
                    return;
                }
            }
        });
    }
}
