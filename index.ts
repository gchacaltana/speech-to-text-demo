const { SpeechClient } = require('@google-cloud/speech');
const fs = require('fs');

// Ruta al archivo de audio que deseas convertir a Base64
const audioFilePath = 'audio-files/audio.wav';

// Creamos cliente Google Speech
const speechClient = new SpeechClient({
    keyFilename: 'credentials/service-account.json'
});

enum AudioEncoding {
    ENCODING_UNSPECIFIED = 0,
    LINEAR16 = 1,
    FLAC = 2,
    MULAW = 3,
    AMR = 4,
    AMR_WB = 5,
    OGG_OPUS = 6,
    SPEEX_WITH_HEADER_BYTE = 7,
    MP3 = 8,
    WEBM_OPUS = 9
}

const config = {
    encoding: AudioEncoding.WEBM_OPUS,
    sampleRateHertz: 48000,
    languageCode: 'es-ES'
};

const audio = {
    content: fs.readFileSync(audioFilePath).toString('base64'),
};

const request = {
    audio: audio,
    config: config
};


async function recognizeSpeech() {
    try {
        const [response] = await speechClient.recognize({
            config: {
                encoding: AudioEncoding.WEBM_OPUS,
                sampleRateHertz: 48000,
                languageCode: 'es-LA',
            },
            audio: {
                content: fs.readFileSync(audioFilePath).toString('base64')
            },
        });
        const transcription = response.results
            .map((result: any) => result.alternatives[0].transcript)
            .join('\n');

        console.log('Transcription:');
        console.log(transcription);
    } catch (error) {
        console.error('Error:', error);
    }
}

recognizeSpeech();