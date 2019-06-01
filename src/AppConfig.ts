import {inject, injectable} from "inversify";
import {IConfig} from "@robotlegsjs/core";
import {ISceneMediatorMap} from "@robotlegsjs/phaser";
import {DefaultSceneMediator} from "./Mediators/DefaultSceneMediator";
import {DefaultScene} from "./Scenes/DefaultScene";

@injectable()
export class AppConfig implements IConfig {

    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    configure() {
        this.sceneMediatorMap.map(DefaultScene).toMediator(DefaultSceneMediator);
    }
}
