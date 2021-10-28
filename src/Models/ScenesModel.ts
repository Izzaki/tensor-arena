import {injectable} from "@robotlegsjs/core";
import {ILoadable} from "../Interfaces/ILoadable";

@injectable()
export class ScenesModel implements ILoadable {

    scenes: Array<Phaser.Scene> = [];

    private _currentScene: Phaser.Scene;
    private _currentSceneIndex: number;
    private _currentSceneKey: string;

    load(scenes): void {
        this.scenes = scenes;
    }

    getSceneKeys(): Array<string> {
        return this.scenes.map((scene, index) => index.toString());
    }

    setScene(scene: Phaser.Scene): void {
        this._currentScene = scene;
    }

    get currentScene(): Phaser.Scene {
        return this._currentScene;
    }

    set currentScene(value: Phaser.Scene) {
        this._currentScene = value;
    }

    get currentSceneIndex(): number {
        return this.scenes.indexOf(this._currentScene);
    }

    get currentSceneKey(): string {
        return this.scenes.indexOf(this._currentScene).toString();
    }
}
