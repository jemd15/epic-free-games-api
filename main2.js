require('ask-sdk-model')
const express = require('express')
const { ExpressAdapter } = require('ask-sdk-express-adapter')
const Alexa = require('ask-sdk-core')
const app = express()
const port = 3000 || process.env.PORT
const skillBuilder = Alexa.SkillBuilders.custom()

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requesEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechText = 'Hola desde Express corriendo en heroku'

    return handlerInput.resposeBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hola mundo', speechText)
      .getResponse()
  }
}

skillBuilder.addRequestHandlers(
  LaunchRequestHandler
)

const skill = skillBuilder.create()
const adapter = new ExpressAdapter(skill, false, false)

app.post('/', adapter.getRequestHandlers())

app.listen(port)