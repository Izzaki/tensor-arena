import {DefaultScene} from '../DefaultScene';
import {Assets, AssetsPaths} from "../../Assets/Assets";
import {RocketAndAimView} from "../../RootViews/RocketAndAimView";
import {delayPromise} from "../../Utilities/DelayPromise";

export class RocketToBouncingAimScene extends DefaultScene {

    vehicle: Phaser.GameObjects.Container;
    aim: Phaser.GameObjects.Container;

    public preload(): void {
        this.load.image(Assets.ROCKET, AssetsPaths.ROCKET);
        this.load.image(Assets.AIM, AssetsPaths.AIM);
        this.load.image(Assets.SKY, AssetsPaths.SKY);
    }

    public async create(): Promise<void> {
        super.create('Rocket To Bouncing Aim');

        RocketAndAimView.call(this);

        const aimBody = this.aim.body as Phaser.Physics.Arcade.Body;
        aimBody.setGravityY(100);
        aimBody.setBounceY(1);
        aimBody.collideWorldBounds = true;

        this.add.tween({
            duration: 2000,
            repeat: Infinity,
            targets: [this.aim],
            yoyo: true,
            ease: Phaser.Math.Easing.Sine,
            props: {
                x: this.aim.x + 300
            }
        });

        await this.aiComponent.teach({
            epochs: 50,
        }, [
            [359],
            [0],
            [-359],
        ], [
            [0.1],
            [0.5],
            [0.9],
        ]);
        this.hideLoader();

        this.start();
    }

    async start(): Promise<any> {
        const vehicleBody = this.vehicle.body as Phaser.Physics.Arcade.Body;

        let stopSignal: boolean = false;
        while(!stopSignal) {
            const angleOffset = this.vehicle.angle - Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(this.vehicle, this.aim));

            const outputs = await this.aiComponent.predict([[angleOffset]]);
            const predictedAngle = (outputs[0] * 360) - 180;

            const angle = this.vehicle.angle + predictedAngle / 20;
            this.physics.velocityFromAngle(angle, 300, vehicleBody.velocity);
            this.vehicle.angle = angle;

            this.infoText.setText([
                // `loss: ${history.history.loss[0]}`,
                // `inputs: ${inputs}`,
                `outputs: ${outputs}`,
                `angle: ${this.vehicle.angle}`
            ]);
            await delayPromise(30);
        }
    }
}
