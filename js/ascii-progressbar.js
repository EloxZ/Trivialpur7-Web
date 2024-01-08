export default class AsciiBar {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.status = "paused";

        if (this.options.max == undefined || this.options.max < 1) this.options.max = 10;
        if (this.options.time == undefined || this.options.time < 1) this.options.time = 10;
        if (this.options.currentTime == undefined || this.options.currentTime < 0) this.options.currentTime = 0;
        if (this.options.currentTime > this.options.time) this.options.currentTime = this.options.time;
    }

    getString() {
        let per = this.options.currentTime / this.options.time;
        let completeBlocks = Math.floor(per * this.options.max);
        let incompleteBlocks = this.options.max - completeBlocks;

        return "[" + "#".repeat(completeBlocks) + "=".repeat(incompleteBlocks) + "] " + this.options.currentTime + "/" + this.options.time + "s";
    }

    changeTime(time) {
        if (time != undefined && time > 0) this.options.time = time;
    }

    play() {
        if (this.status == "paused") {
            this.status = "playing";
            this.animationHandler = setInterval(() => {this.#updateBar()}, 1000);
        }
    }

    pause() {
        if (this.status == "playing") {
            clearInterval(this.animationHandler);
            this.status = "paused";
        }
    }

    reset() {
        if (this.animationHandler != undefined) clearInterval(this.animationHandler);
        this.status = "paused";
        this.options.currentTime = 0;
    }

    #updateBar() {
        if (this.options.currentTime < this.options.time) {
            this.options.currentTime++;
            this.element.innerHTML = this.getString();
        } else {
            this.status = "done";
            clearInterval(this.animationHandler);
        }
    }
}

