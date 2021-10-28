import {inject, injectable} from "inversify";
import {IConfig, IEventCommandMap, IEventDispatcher, IInjector,} from "@robotlegsjs/core";
import {IContextSceneManager, ISceneMediatorMap} from "@robotlegsjs/phaser";
import {DefaultSceneMediator} from "./Mediators/DefaultSceneMediator";
import {DefaultScene} from "./Scenes/DefaultScene";
import {UIEvents} from "./Events/UIEvent";
import {PreviousSceneCommand} from "./Commands/PreviousSceneCommand";
import {NextSceneCommand} from "./Commands/NextSceneCommand";
import {ScenesModel} from "./Models/ScenesModel";
import {ScenesConfig} from "./Configs/Scenes";

@injectable()
export class AppConfig implements IConfig {

    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    @inject(IEventCommandMap)
    public eventCommandMap: IEventCommandMap;

    @inject(IContextSceneManager)
    public contextSceneManager: IContextSceneManager;

    @inject(IInjector)
    public injector: IInjector;

    configure() {
        this._configureModels();
        this._configureMediators();
        this._configureCommands();
        this._configureScenes();
    }

    private _configureMediators(): void {
        this.sceneMediatorMap.map(DefaultScene).toMediator(DefaultSceneMediator);
    }

    private _configureCommands(): void {
        this.eventCommandMap.map(UIEvents.BUTTON_NEXT).toCommand(NextSceneCommand);
        this.eventCommandMap.map(UIEvents.BUTTON_PREVIOUS).toCommand(PreviousSceneCommand);
    }

    private _configureModels(): void {
        this.injector.bind(ScenesModel).toSelf().inSingletonScope();
    }

    private _configureScenes(): void {
        const scenesModel = this.injector.get(ScenesModel);

        scenesModel.load(ScenesConfig.scenes.map(sceneClass => new sceneClass()));
        scenesModel.scenes.forEach((scene: Phaser.Scene, index: number) => {
            this.contextSceneManager.sceneManager.add(index.toString(), scene);
        });

        const firstScene = scenesModel.scenes[0];
        this.contextSceneManager.sceneManager.start("0");
        scenesModel.setScene(firstScene);
    }
}
