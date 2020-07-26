/* eslint-disable no-invalid-this */
/* eslint-disable space-before-function-paren */

const Runtime = require('../../engine/runtime');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const FirebaseAPI = require('./FirebaseAPI');

class Scratch3Hareketlen {
    constructor(runtime) {
        log.log('constructor');
        this.runtime = runtime;

        this.runtime.on(Runtime.PROJECT_START, this.onProjectStart);
        this.runtime.on(Runtime.PROJECT_STOP_ALL, this.onProjectStop);

        this.firebase = new FirebaseAPI();
        this.samplingFreq = 1;
        this.userId = window.location.href.match(/[?&]userId=([^&]+)/);
        this.gameId = window.location.href.match(/[?&]gameId=([^&]+)/);
    }

    onProjectStart = () => {
        log.log('project started');
        this.lastSampling = {};
        this.labels = new Set();
        this.session = {
            startedAt: new Date(),
            data: [],
            labels: []
        };
        this.intervalId = setInterval(() => {
            const data = {...this.lastSampling, date: new Date()};
            this.session.data.push(data);
            Object.keys(this.lastSampling).forEach(label =>
                this.labels.add(label)
            );
        }, 1000 / this.samplingFreq);
    };

    onProjectStop = () => {
        log.log('project stoped');
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.session.endedAt = new Date();
            this.session.labels = Array.from(this.labels.values());
            const path = `users/${this.userId[1]}/playData/${this.gameId[1]}/sessions`;
            this.firebase.db.collection(path).add(this.session);
        }
    };

    getInfo = () => ({
        id: 'hareketlen',
        name: 'Hareketlen',
        blocks: [
            {
                opcode: 'sample',
                blockType: BlockType.COMMAND,
                text: '[VALUE] verisini [LABEL] adiyla kaydet',
                arguments: {
                    LABEL: {
                        type: ArgumentType.STRING,
                        defaultValue: 'veri'
                    },
                    VALUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 0
                    }
                }
            }
        ],
        menus: {}
    });

    sample = args => {
        const label = args.LABEL;
        const value = Cast.toNumber(args.VALUE);
        log.log(label, value);
        this.lastSampling[label] = value;
    };
}

module.exports = Scratch3Hareketlen;
