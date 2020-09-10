/* eslint-disable no-invalid-this */
/* eslint-disable space-before-function-paren */

const Runtime = require('../../engine/runtime');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

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
    };

    onProjectStop = () => {
        log.log('project stoped');
    };

    getInfo = () => ({
        id: 'hareketlen',
        name: 'Hareketlen',
        blockIconURI,
        blocks: [
            {
                opcode: 'startSampling',
                blockType: BlockType.COMMAND,
                text: 'veri kaydetmeye basla'
            },
            {
                opcode: 'stopSamplingAndSave',
                blockType: BlockType.COMMAND,
                text: 'veri kaydetmeyi bitir'
            },
            {
                opcode: 'setSamplingFreq',
                blockType: BlockType.COMMAND,
                text: 'saniyede [FREQ] kez veri kaydet',
                arguments: {
                    FREQ: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1
                    }
                }
            },
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

    startSampling = () => {
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

    stopSamplingAndSave = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.session.endedAt = this.session.createdAt = new Date();
            this.session.labels = Array.from(this.labels.values());
            const userRef = this.firebase.db.doc(`users/${this.userId[1]}`);
            const gameRef = this.firebase.db.doc(`games/${this.gameId[1]}`);
            this.session.user = userRef;
            this.session.game = gameRef;
            this.firebase.db.collection('sessions').add(this.session);
        }
    };

    setSamplingFreq = args => {
        const freq = Cast.toNumber(args.FREQ);
        this.samplingFreq = freq;
    };

    sample = args => {
        if (!this.intervalId) {
            // eslint-disable-next-line no-alert
            alert(
                'Veri kaydetmek icin "veri kaydetmeye basla" ve "veri kaydetmeyi bitir" bloklarini kullanmalisiniz.'
            );
            return;
        }
        const label = args.LABEL;
        const value = Cast.toNumber(args.VALUE);
        this.lastSampling[label] = value;
    };
}

module.exports = Scratch3Hareketlen;
