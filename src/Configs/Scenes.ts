import {MusicVisualiserScene} from "../Scenes/Scenes/MusicVisualiserScene";
import {RocketToBouncingAimScene} from "../Scenes/Scenes/RocketToBouncingAimScene";
import {IClass} from "@robotlegsjs/core";
import {ImageTextRecognizer} from "../Scenes/Scenes/ImageTextRecognizer";

const scenes: Array<IClass<Phaser.Scene>> = [
    RocketToBouncingAimScene,
    // MusicVisualiserScene,
    // ImageTextRecognizer,
];

export abstract class ScenesConfig {
    static readonly scenes = scenes;
}
