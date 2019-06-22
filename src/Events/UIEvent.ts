import {Event} from "@robotlegsjs/core";

export class UIEvent extends Event {
    static BUTTON_CLICK: string = 'button-clicked';

    constructor(type: string, data?: UIEvents) {
        super(type, false, false, data);
    }
}

export enum UIEvents {
    BUTTON_PREVIOUS = 'button-previous',
    BUTTON_NEXT = 'button-next'
}
