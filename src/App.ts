import {Context, IContext, MVCSBundle} from "@robotlegsjs/core";
import {ContextSceneManager, PhaserBundle} from "@robotlegsjs/phaser";
import {AppConfig} from "./AppConfig";
import {Config} from "./Configs/Config";

export class App extends Phaser.Game {
    private _context: IContext;

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
            .install(MVCSBundle, PhaserBundle,)
            .configure(new ContextSceneManager(this.scene))
            .configure(AppConfig)
            .initialize();
    }
}
