import {Context, IContext, IEventDispatcher, MVCSBundle, inject} from "@robotlegsjs/core";
import {ContextSceneManager, PhaserBundle} from "@robotlegsjs/phaser";
import {VehiclesScene} from "./Scenes/VehiclesScene";
import {AppConfig} from "./AppConfig";
import {BreakingVehicleScene} from "./Scenes/BreakingVehicleScene";

export class App extends Phaser.Game {
    private _context: IContext;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    constructor() {
        super({
            type: Phaser.AUTO,
            width: 1024,
            height: 720,
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
        this.scene.add(BreakingVehicleScene.KEY, new BreakingVehicleScene());
        this.scene.add(VehiclesScene.KEY, new VehiclesScene());
        // this.scene.add(SceneKey.MAIN, new Main());

        // this.scene.start(BreakingVehicleScene.KEY);
        this.scene.stop('default');
        this.scene.start(VehiclesScene.KEY);
    }
}
