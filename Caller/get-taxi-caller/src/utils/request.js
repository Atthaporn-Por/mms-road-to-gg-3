import defaults from 'superagent-defaults'
import prefix from 'superagent-prefix'

import { normalize, updateEntities } from 'stores/entities'

import { BASE_API } from 'react-native-dotenv'

const superagent = defaults()

// Setup Request defaults
superagent.use(prefix(BASE_API))
          .on('error', error => console.warn(error))
          // .auth(process.env.CLIENT_ID, process.env.CLIENT_PASSWORD)

// Create helper method for attaching Access Tokens
superagent.request.Request.prototype.accessToken = function (accessToken) {
  return this.set('X-Access-Token', accessToken)
}

// Create helper method for setting locale
superagent.request.Request.prototype.locale = function (locale) {
  return this.query({ locale })
}

// Create helper method for normalizing data
superagent.request.Request.prototype.normalize = function (schema, dispatch) {
  if (!schema) {
    return this.then(response => response)
  }

  return this.then(function (response) {
    const normalizedData = normalize(response.body, schema)

    dispatch && dispatch(updateEntities(normalizedData.entities))

    return normalizedData
  })
}

export default superagent
