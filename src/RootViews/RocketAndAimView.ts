import {RocketToBouncingAimScene} from "../Scenes/Scenes/RocketToBouncingAimScene";
import {Aim} from "../Views/Aim";
import {Assets} from "../Assets/Assets";
import {Config} from "../Configs/Config";
import {Rocket} from "../Views/Rocket";

export function RocketAndAimView(this: RocketToBouncingAimScene) {
    this.add.sprite(0, 0, Assets.SKY)
        .setDisplaySize(Config.WIDTH, Config.HEIGHT)
        .setOrigin(0, 0)
        .setDepth(-1);


    this.vehicle = new Rocket(this, 64, 64);
    this.vehicle.x = 50;
    this.vehicle.y = 700;
    this.vehicle.setAngle(-90);
    this.add.existing(this.vehicle);
    this.physics.add.existing(this.vehicle);


    this.aim = new Aim(this, 48, 48);
    this.aim.x = Config.WIDTH / 2 - 150;
    this.aim.y = 200;
    this.add.existing(this.aim);
    this.physics.add.existing(this.aim);

    // this.physics.add.collider(this.vehicle, this.goal);
}
