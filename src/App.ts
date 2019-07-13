import {Context, IContext, IEventDispatcher, MVCSBundle, inject} from "@robotlegsjs/core";
import {ContextSceneManager, PhaserBundle} from "@robotlegsjs/phaser";
import {RocketToBouncingAim} from "./Scenes/RocketToBouncingAim";
import {AppConfig} from "./AppConfig";
import {Scene2} from "./Scenes/Scene2";
import {Config} from "./Configs/Config";

export class App extends Phaser.Game {
    private _context: IContext;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    constructor() {
        super({
            type: Phaser.AUTO,
            width: Config.WIDTH,
            height: Config.HEIGHT,
            backgroundColor: '#505050',
            // parent: 'tensor-arena',
            physics: {
                default: 'arcade'
            },
            scene: {
                create: () => {
                    this.canvas.style.width = '100%';
                    this.canvas.style.height = '100%';
                    this.canvas.style.objectFit = 'contain';
                }
            }
        });

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextSceneManager(this.scene))
            .configure(AppConfig)
            .initialize();

        // this.scene.add(LoadScene.KEY, new LoadScene());
        this.scene.add(Scene2.KEY, new Scene2());
        this.scene.add(RocketToBouncingAim.KEY, new RocketToBouncingAim());
        // this.scene.add(SceneKey.MAIN, new Main());

        // this.scene.start(BreakingVehicleScene.KEY);
        this.scene.stop('default');
        this.scene.start(RocketToBouncingAim.KEY);
    }
}
