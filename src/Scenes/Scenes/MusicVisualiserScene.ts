import {Assets, AssetsPaths} from "../../Assets/Assets";
import {DefaultScene} from "../DefaultScene";
import {Config} from "../../Configs/Config";
import {Equaliser} from "../../Views/Equaliser";
import WebAudioSoundManager = Phaser.Sound.WebAudioSoundManager;

export class MusicVisualiserScene extends DefaultScene {

    protected _analyser: AnalyserNode;
    protected _frequencyData: Uint8Array;
    protected _equaliser: Equaliser;

    preload(): void {
        this.load.audio(Assets.MUSIC_1, AssetsPaths.MUSIC_1);
    }

    create(): void {
        super.create('Audio Visualiser');
        this.hideLoader();

        // console.log("%c @ SC: ", "color: white; background: grey", SC);

        const music = this.sound.add(Assets.MUSIC_1) as Phaser.Sound.WebAudioSound;
        (music['manager'] as WebAudioSoundManager).pauseOnBlur = false;

        const context = music.volumeNode.context;

        const analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.7;
        analyser.fftSize = 128;
        this._analyser = analyser;

        // music.volumeNode.disconnect();

        music.volumeNode.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        this._frequencyData = new Uint8Array(bufferLength);

        music.play();
        music.volume = 0.1;

        this._equaliser = new Equaliser(this, Config.WIDTH / 4, Config.HEIGHT / 2, bufferLength);
        this.add.existing(this._equaliser);
        this._equaliser.setPosition(30, Config.HEIGHT - 80)
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
        this._analyser.getByteFrequencyData(this._frequencyData); // writes to _frequencyData
        this._equaliser.drawFrequencies(this._frequencyData);
    }
}
