import {DefaultScene} from '../DefaultScene';
import {Assets, AssetsPaths} from "../../Assets/Assets";
import {RocketAndAimView} from "../../RootViews/RocketAndAimView";

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
            epochs: 200,
        }, [
            [360],
            [270],
            [180],
            [90],
            [0],
            [-90],
            [-180],
            [-270],
            [-360],
        ], [
            [0.1],
            [0.2],
            [0.3],
            [0.4],
            [0.5],
            [0.6],
            [0.7],
            [0.8],
            [0.9],
        ]);
        this.hideLoader();

        this.start();
    }

    start(): void {
        const vehicleBody = this.vehicle.body as Phaser.Physics.Arcade.Body;
        this.time.addEvent({
            loop: true,
            delay: 30,
            callback: async () => {
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
            }
        });
    }
}
