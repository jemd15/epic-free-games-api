require('ask-sdk-model')
const express = require('express')
const { ExpressAdapter } = require('ask-sdk-express-adapter')
const Alexa = require('ask-sdk-core')
const app = express()
const skillBuilder = Alexa.SkillBuilders.custom()

app.set('port', process.env.PORT || 3000);

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

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'get de skill de alexa'
  })
})

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});