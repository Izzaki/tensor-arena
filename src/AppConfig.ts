import {inject, injectable} from "inversify";
import {
    IConfig, IEventCommandMap,
    IEventDispatcher,
} from "@robotlegsjs/core";
import {ISceneMediatorMap} from "@robotlegsjs/phaser";
import {DefaultSceneMediator} from "./Mediators/DefaultSceneMediator";
import {DefaultScene} from "./Scenes/DefaultScene";
import {UIEvents} from "./Events/UIEvent";
import {PreviousSceneCommand} from "./Commands/PreviousSceneCommand";
import {NextSceneCommand} from "./Commands/NextSceneCommand";

@injectable()
export class AppConfig implements IConfig {

    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    @inject(IEventCommandMap)
    public eventCommandMap: IEventCommandMap;

    configure() {
        this._configureScenes();
        this._configureInteraction();
    }

    private _configureScenes() {
        this.sceneMediatorMap.map(DefaultScene).toMediator(DefaultSceneMediator);
    }

    private _configureInteraction() {
        this.eventCommandMap.map(UIEvents.BUTTON_NEXT).toCommand(NextSceneCommand);
        this.eventCommandMap.map(UIEvents.BUTTON_PREVIOUS).toCommand(PreviousSceneCommand);
    }
}
