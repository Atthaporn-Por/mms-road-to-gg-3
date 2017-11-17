import I18n from 'i18n-js'
import _ from 'lodash'

import locales from '../locales/**/*.yml'

locales.forEach((locale) => {
  I18n.translations = _.merge(I18n.translations, locale.default)
})

export default I18n
