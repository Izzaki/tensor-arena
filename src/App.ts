import {Context, IContext, IEventDispatcher, inject, MVCSBundle} from "@robotlegsjs/core";
import {ContextSceneManager, PhaserBundle} from "@robotlegsjs/phaser";
import {RocketToBouncingAim} from "./Scenes/RocketToBouncingAim";
import {AppConfig} from "./AppConfig";
import {Config} from "./Configs/Config";
import {VisualiserScene} from "./Scenes/VisualiserScene";

export class App extends Phaser.Game {
    private _context: IContext;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    constructor() {
        super({
            type: Phaser.AUTO,
            transparent: false,
            // parent: 'tensor-arena',
            physics: {
                default: 'arcade'
            },
            scale: {
                // mode: Phaser.Scale.RESIZE
                mode: Phaser.Scale.FIT,
                width: Config.WIDTH,
                height: Config.HEIGHT,
                zoom: 1,
            }
        });

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextSceneManager(this.scene))
            .configure(AppConfig)
            .initialize();

        // this.scene.add(LoadScene.KEY, new LoadScene());
        this.scene.add(VisualiserScene.KEY, new VisualiserScene());
        this.scene.add(RocketToBouncingAim.KEY, new RocketToBouncingAim());
        this.scene.start(RocketToBouncingAim.KEY);
    }
}
