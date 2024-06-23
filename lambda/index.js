const Alexa = require('ask-sdk-core');

const curiosidades = {
    'es': [
        "Sabías que la canción más tocada de todos los tiempos es 'Yesterday' de The Beatles.",
        "El piano tiene 88 teclas.",
        "La guitarra eléctrica fue inventada en 1931."
    ],
    'en': [
        "Did you know that the most covered song of all time is 'Yesterday' by The Beatles.",
        "The piano has 88 keys.",
        "The electric guitar was invented in 1931."
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.requestEnvelope.request.locale.startsWith('es') ? 
            'Bienvenido isai a Curiosidades sobre la música. Pídeme una curiosidad musical.' :
            'Welcome isai to Music Trivia. Ask me for a music trivia.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CuriosidadesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'curiosidadIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriosityIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const triviaList = curiosidades[locale.startsWith('es') ? 'es' : 'en'];
        const trivia = triviaList[Math.floor(Math.random() * triviaList.length)];

        return handlerInput.responseBuilder
            .speak(trivia)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.requestEnvelope.request.locale.startsWith('es') ? 
            'Puedes pedirme una curiosidad sobre la música.' :
            'You can ask me for a music trivia.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.requestEnvelope.request.locale.startsWith('es') ? 
            '¡Adiós!' :
            'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const speakOutput = handlerInput.requestEnvelope.request.locale.startsWith('es') ? 
            'Lo siento, no pude entender lo que dijiste. Por favor inténtalo de nuevo.' :
            'Sorry, I couldn\'t understand what you said. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CuriosidadesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
