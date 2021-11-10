import {VisualiserScene} from "../Scenes/Scenes/VisualiserScene";
import {RocketToBouncingAimScene} from "../Scenes/Scenes/RocketToBouncingAimScene";
import {IClass} from "@robotlegsjs/core";
import {ImageTextGuesser} from "../Scenes/Scenes/ImageTextGuesser";

const scenes: Array<IClass<Phaser.Scene>> = [
    ImageTextGuesser,
    RocketToBouncingAimScene,
    VisualiserScene,
];

export abstract class ScenesConfig {
    static readonly scenes = scenes;
}
