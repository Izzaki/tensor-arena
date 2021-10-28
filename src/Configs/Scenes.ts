import {VisualiserScene} from "../Scenes/Scenes/VisualiserScene";
import {RocketToBouncingAim} from "../Scenes/Scenes/RocketToBouncingAim";
import {IClass} from "@robotlegsjs/core";

const scenes: Array<IClass<Phaser.Scene>> = [
    RocketToBouncingAim,
    VisualiserScene,
];

export abstract class ScenesConfig {
    static readonly scenes = scenes;
}
