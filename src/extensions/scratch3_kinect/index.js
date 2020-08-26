const Runtime = require('../../engine/runtime');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const cast = require('../../util/cast');

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

const DEVICES = {
    kinect: {
        peripheralId: 'kinect',
        name: 'Kinect 2.0',
        url: 'ws://localhost:8181/',
        rssi: -19
    }
};

const JOINT_DATA = {
    rightHandState: 'Unknown',
    leftHandState: 'Unknown',
    SpineBase: null,
    SpineMid: null,
    Neck: null,
    Head: null,
    ShoulderLeft: null,
    ElbowLeft: null,
    WristLeft: null,
    HandLeft: null,
    ShoulderRight: null,
    ElbowRight: null,
    WristRight: null,
    HandRight: null,
    HipLeft: null,
    KneeLeft: null,
    AnkleLeft: null,
    FootLeft: null,
    HipRight: null,
    KneeRight: null,
    AnkleRight: null,
    FootRight: null,
    SpineShoulder: null,
    HandTipLeft: null,
    ThumbLeft: null,
    HandTipRight: null,
    ThumbRight: null
};

class Kinect2Scratch3 {

    constructor (runtime, extensionId) {

        this._runtime = runtime;

        this._runtime.registerPeripheralExtension(extensionId, this);

        this._connection = null;

        this._extensionId = extensionId;

        this._bodies = [
            JOINT_DATA,
            JOINT_DATA,
            JOINT_DATA,
            JOINT_DATA,
            JOINT_DATA,
            JOINT_DATA,
            JOINT_DATA
        ];

        this._numTracked = 0;

        this._entry = false;
        this._exit = false;

        this._face = null;

        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._onClose = this._onClose.bind(this);
        this._onError = this._onError.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    scan () {
        if (this.isConnected()) {
            this.disconnect();
        }
        const promises = Object.keys(DEVICES).map(key => new Promise(resolve => {
            const dummyConnection = new WebSocket(DEVICES[key].url);
            dummyConnection.onopen = () => {
                dummyConnection.close();
                resolve(key);
            };
            dummyConnection.onerror = () => {
                resolve(false);
            };
        }));
        Promise.all(promises)
            .then(results => results.filter(r => r))
            .then(keys => {
                if (keys.length === 0) {
                    this._runtime.emit(Runtime.PERIPHERAL_SCAN_TIMEOUT);
                    return;
                }
                const availableDevices = keys.reduce((obj, key) => {
                    obj[key] = DEVICES[key];
                    return obj;
                }, {});
                this._runtime.emit(
                    Runtime.PERIPHERAL_LIST_UPDATE,
                    availableDevices
                );
            });
    }

    connect (id) {
        this._connection = new WebSocket(DEVICES[id].url);
        this._connection.onopen = this._onConnect;
        this._connection.onclose = this._onClose;
        this._connection.onmessage = this._onMessage;
        this._connection.onerror = this._onError;
    }

    disconnect () {
        if (this.isConnected()) {
            this._connection.close();
        }
        this._runtime.emit(Runtime.PERIPHERAL_DISCONNECTED);
    }

    reset () {}

    isConnected () {
        return this._connection && (this._connection.readyState === 1);
    }

    _onConnect () {
        this._runtime.emit(Runtime.PERIPHERAL_CONNECTED);
    }

    _onClose (e) {
        if (!e.wasClean) {
            this.disconnect();
            this._runtime.emit(Runtime.PERIPHERAL_CONNECTION_LOST_ERROR, {
                message: 'Scratch ile baglanti koptu: ',
                extensionId: this._extensionId
            });
        }
    }

    _onError () {
        this._runtime.emit(Runtime.PERIPHERAL_REQUEST_ERROR, {
            message: 'Scratch ile baglanti koptu: ',
            extensionId: this._extensionId
        });
    }

    _onMessage (e) {
        const kdata = JSON.parse(e.data);

        // Check if it's a body (could be a face etc.)
        if (kdata.type === 'body') {
            this._bodies[kdata.bodyIndex] = kdata.joints;
            this._bodies[kdata.bodyIndex].rightHandState =
                kdata.rightHandState;
            this._bodies[kdata.bodyIndex].leftHandState = kdata.leftHandState;
        } else if (kdata.type === 'event') {
            if (kdata.eventType === 'entry') {
                this._entry = true;
            } else if (kdata.eventType === 'exit') {
                this._exit = true;
            }
        } else if (kdata.type === 'scene') {
            this._numTracked = kdata.numTracked;
        } else if (kdata.type === 'face') {
            this._face = kdata;
        }
    }

    get personEntry () {
        const result = this._entry;
        this._entry = false;
        return result;
    }

    get personExit () {
        const result = this._exit;
        this._exit = false;
        return result;
    }

    get trackedUsers () {
        return this._numTracked;
    }

    get bodies () {
        return this._bodies;
    }
}


class Scratch3Kinect {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Kinect';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'kinect';
    }


    /**
     * Construct a set of Kinect blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Kinect peripheral instance
        this._peripheral = new Kinect2Scratch3(this.runtime, Scratch3Kinect.EXTENSION_ID);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: Scratch3Kinect.EXTENSION_ID,
            name: Scratch3Kinect.EXTENSION_NAME,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'whenPersonEntered',
                    text: 'ekrana bir kisi girdiginde',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'whenPersonExit',
                    text: 'ekrandan bir kisi cikti',
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'getTrackedUsers',
                    text: 'takip edilen kisi sayisi',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getLimbValue',
                    text: "[PERSON]'nin [SIDE] [LIMB] [COORDINATE] degeri",
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PERSON: {
                            type: ArgumentType.NUMBER,
                            menu: 'persons',
                            defaultValue: 0
                        },
                        SIDE: {
                            type: ArgumentType.STRING,
                            menu: 'sides',
                            defaultValue: 'Right'
                        },
                        LIMB: {
                            type: ArgumentType.STRING,
                            menu: 'limbs',
                            defaultValue: 'Hand'
                        },
                        COORDINATE: {
                            type: ArgumentType.STRING,
                            menu: 'coordinates',
                            defaultValue: 'X'
                        }
                    }
                },
                {
                    opcode: 'getTorsoValue',
                    text: "[PERSON]'nin [TORSO] [COORDINATE] degeri",
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PERSON: {
                            type: ArgumentType.NUMBER,
                            menu: 'persons',
                            defaultValue: 0
                        },
                        TORSO: {
                            type: ArgumentType.STRING,
                            menu: 'torsos',
                            defaultValue: 'Head'
                        },
                        COORDINATE: {
                            type: ArgumentType.STRING,
                            menu: 'coordinates',
                            defaultValue: 'X'
                        }
                    }
                },
                {
                    opcode: 'isHandStateEquals',
                    text: "[PERSON]'nin [SIDE] El [STATE] mi?",
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PERSON: {
                            type: ArgumentType.NUMBER,
                            menu: 'persons',
                            defaultValue: 0
                        },
                        SIDE: {
                            type: ArgumentType.STRING,
                            menu: 'sides',
                            defaultValue: 'Right'
                        },
                        STATE: {
                            type: ArgumentType.STRING,
                            menu: 'states',
                            defaultValue: 'Open'
                        }
                    }
                }
            ],
            menus: {
                persons: {
                    items: [
                        {
                            text: 'En ondeki kisi',
                            value: 0
                        },
                        {
                            text: '1. kisi',
                            value: 1
                        },
                        {
                            text: '2. kisi',
                            value: 2
                        },
                        {
                            text: '3. kisi',
                            value: 3
                        },
                        {
                            text: '4. kisi',
                            value: 4
                        },
                        {
                            text: '5. kisi',
                            value: 5
                        },
                        {
                            text: '6. kisi',
                            value: 6
                        }
                    ]
                },
                coordinates: {
                    items: [
                        {
                            text: 'X',
                            value: 'X'
                        },
                        {
                            text: 'Y',
                            value: 'Y'
                        },
                        {
                            text: 'Z',
                            value: 'Z'
                        }
                    ]
                },
                sides: {
                    items: [
                        {
                            text: 'Sag',
                            value: 'Right'
                        },
                        {
                            text: 'Sol',
                            value: 'Left'
                        }
                    ]
                },
                eyeStates: {
                    items: [
                        {
                            text: 'Acik',
                            value: 'Open'
                        },
                        {
                            text: 'Kapali',
                            value: 'Closed'
                        }
                    ]
                },
                swipeDirections: {
                    items: [
                        {
                            text: 'Sag',
                            value: 'Right'
                        },
                        {
                            text: 'Sol',
                            value: 'Left'
                        },
                        {
                            text: 'Yukari',
                            value: 'Up'
                        },
                        {
                            text: 'Asagi',
                            value: 'Down'
                        }
                    ]
                },
                states: {
                    items: [
                        {
                            text: 'Acik',
                            value: 'Open'
                        },
                        {
                            text: 'Kapali',
                            value: 'Closed'
                        },
                        {
                            text: 'Lasso',
                            value: 'Lasso'
                        },
                        {
                            text: 'Belirsiz',
                            value: 'Unknown'
                        }
                    ]
                },
                torsos: {
                    items: [
                        {
                            text: 'Bas',
                            value: 'Head'
                        },
                        {
                            text: 'Boyun',
                            value: 'Neck'
                        },
                        {
                            text: 'Omuz',
                            value: 'SpineShoulder'
                        },
                        {
                            text: 'Govde',
                            value: 'SpineMid'
                        },
                        {
                            text: 'Alt',
                            value: 'SpineBase'
                        }
                    ]
                },
                limbs: {
                    items: [
                        {
                            text: 'Omuz',
                            value: 'Shoulder'
                        },
                        {
                            text: 'Dirsek',
                            value: 'Elbow'
                        },
                        {
                            text: 'Bilek',
                            value: 'Wrist'
                        },
                        {
                            text: 'El',
                            value: 'Hand'
                        },
                        {
                            text: 'El ucu',
                            value: 'HandTip'
                        },
                        {
                            text: 'Basparmak',
                            value: 'Thumb'
                        },
                        {
                            text: 'Kalca',
                            value: 'Hip'
                        },
                        {
                            text: 'Diz',
                            value: 'Knee'
                        },
                        {
                            text: 'Ayak bilegi',
                            value: 'Ankle'
                        },
                        {
                            text: 'Ayak',
                            value: 'Foot'
                        }
                    ]
                }
            }
        };
    }

    whenPersonEntered () {
        return this._peripheral.personEntry;
    }

    whenPersonExit () {
        return this._peripheral.personExit;
    }

    getTrackedUsers () {
        return this._peripheral.trackedUsers;
    }

    getLimbValue (args) {
        const index = cast.toNumber(args.PERSON);
        const joint = this._peripheral.bodies[index][args.LIMB + args.SIDE];
        switch (args.COORDINATE) {
        case 'X':
            return joint[0];
        case 'Y':
            return joint[1];
        case 'Z':
            return joint[2];
        default:
            return 0;
        }
    }

    getTorsoValue (args) {
        const index = cast.toNumber(args.PERSON);
        const joint = this._peripheral.bodies[index][args.TORSO];
        switch (args.COORDINATE) {
        case 'X':
            return joint[0];
        case 'Y':
            return joint[1];
        case 'Z':
            return joint[2];
        default:
            return 0;
        }
    }

    isHandStateEquals (args) {
        const index = cast.toNumber(args.PERSON);
        const body = this._peripheral.bodies[index];
        if (args.SIDE === 'Right') {
            return body.rightHandState === args.STATE;
        } else if (args.SIDE === 'Left') {
            return body.leftHandState === args.STATE;
        }
        return false;
    }
}

module.exports = Scratch3Kinect;
