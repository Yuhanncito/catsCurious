/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next')
const sprintf = require('i18next-sprintf-postprocessor')

const languageStrings = {  
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hello! To get started just say, "Tell me about cats." "Fun facts about cats." "Tell me a fun fact about cats." Or if you want to cancel just say Cancel',
            HELLO_MESSAGE: 'Hello World! Yuhann',
            HELP_MESSAGE: 'Can you say hello to me. How can I help you Yuhann?',
            GOODBYE_MESSAGE: 'Goodbye! Yuhann',
            REFLECTOR_MESSAGE: 'You just activated %s',
            FALLBACK_MESSAGE: 'Sorry, I dont know anything about that. Please try again Yuhann.',
            ERROR_MESSAGE: 'Sorry, there was a problem. Please try again Yuhann.',
            FACTS: [
                'Cats sleep a lot: They spend about 70% of their lives sleeping, approximately 14 hours a day.',
                'Excellent feline hearing: Cats have amazing hearing abilities. They can hear sounds at 64 kHz, while humans can only hear up to 20 kHz.',
                'Multifunctional whiskers: Cats\' whiskers serve as space indicators and to orient themselves. They can also move them separately.',
                'Left-handed and right-handed cats: Female cats are usually right-handed, while male cats are left-handed.',
                'No sweet taste buds: Cats can\'t taste sweet.',
                'Strategic meow change: Cats can change their meow to get what they want, even imitating a baby\'s cry to get food.',
                'More bones than humans: Cats have more bones than us. They are flexible and can jump up to 6 times their length.',
                'Human-like brain: A cat\'s brain is 90% similar to that of a human.',
                'They sweat through their paws: Cats sweat through their paws.',
                'Ear turners: Cats can turn their ears 180 degrees and move them separately.'
            ]
        }
    },  
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Hola! Para poder empezar solo di: "Dime sobre gatos". "Datos curiosos de gatos"."Dime un dato curioso de los gatos". O si deseas cancelar solo di Cancelar',
            HELLO_MESSAGE: '¡Hola Mundo! Yuhann',
            HELP_MESSAGE: 'Puedes decirme hola. ¿Cómo te puedo ayudar Yuhann?',
            GOODBYE_MESSAGE: '¡Adiós! Yuhann',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé nada sobre eso. Por favor inténtalo otra vez Yuhann.',
            ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez Yuhann.',
            GET_FACT_MSG: 'Un dato curioso es ...',
            FACTS: [
                'Los gatos duermen mucho: Pasan alrededor del 70 % de sus vidas durmiendo, aproximadamente 14 horas al día.',
                'Excelente oído felino: Los gatos tienen habilidades auditivas asombrosas. Pueden oír sonidos a 64 kHz, mientras que los humanos solo pueden oír hasta 20 kHz.',
                'Bigotes multifuncionales: Los bigotes de los gatos les sirven como indicadores de espacio y para orientarse. También pueden moverlos por separado.',
                'Gatos zurdos y diestros: Las gatas suelen ser diestras, mientras que los gatos son zurdos.',
                'Sin papilas gustativas para lo dulce: Los gatos no pueden saborear lo dulce.',
                'Cambio de maullido estratégico: Los gatos pueden cambiar su maullido para conseguir lo que quieren, incluso imitando el llanto de un bebé para obtener comida.',
                'Más huesos que los humanos: Los gatos tienen más huesos que nosotros. ¡Son flexibles y pueden saltar hasta 6 veces su longitud!',
                'Cerebro similar al humano: El cerebro de un gato se parece en un 90 % al de un ser humano.',
                'Sudan por las patas: Los gatos sudan a través de sus patas.',
                'Giradores de orejas: Los gatos pueden girar sus orejas 180 grados y moverlas por separado.'
            ]
        }
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const getData = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'getData';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const frases = requestAttributes.t('FACTS');
        const frasesIndice = Math.floor(Math.random() * frases.length);
        const randomFrase = frases[frasesIndice];
        const speakOutput = randomFrase; // Usar la frase aleatoria en el mensaje de salida


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        getData,
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();