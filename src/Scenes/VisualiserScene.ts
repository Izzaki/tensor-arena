import {Assets, AssetsPaths} from "../Assets/Assets";
import {DefaultScene} from "./DefaultScene";
import {generate} from "../Utilities/Generate";

export class VisualiserScene extends DefaultScene {

    @generate
    static readonly KEY: string;

    preload(): void {
        this.load.audio(Assets.MUSIC_1, AssetsPaths.MUSIC_1);
    }

    create(): void {
        super.create('Audio Visualiser');
        this.hideLoader();
        const music = this.sound.add(Assets.MUSIC_1);
        console.log("%c @ music: ", "color: white; background: grey", music);
        music.play();
    }
}
