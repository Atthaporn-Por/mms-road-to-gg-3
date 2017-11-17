import constants from '../constants'

import ADV_SEARCH_FORM from 'components/AdvancedSearch/utils/filterOptions'

export default (schema) => {
  const CONSTANTS = constants(schema)

  return {
    [CONSTANTS.UPDATE_ALL_FIELDS_LIST]: (state, { payload }) => {
      return state.merge({
        allFieldsList: payload
      })
    },

    [CONSTANTS.UPDATE_FIELD]: (state, { payload }) => {
      const { field, doShow } = payload
      let _fields = state.get('fields')
      const isInclude = _fields.includes(field)
      if (doShow && !isInclude) {
        _fields = _fields.push(field)
      }
      else if (!doShow && isInclude) {
        _fields = _fields.remove(_fields.indexOf(field))
      }
      return state.merge({
        fields: _fields
      })
    },

    [CONSTANTS.UPDATE_FIELDS]: (state, { payload }) => {
      return state.merge({
        fields: payload
      })
    },

    [CONSTANTS.TOGGLE_ADV_SEARCH]: (state) => {
      return state.update('advSearchOn', val => !val)
    },

    [CONSTANTS.ADD_ADV_SEARCH_OPTION]: (state, { payload: { path } }) => {
      const initialLine = this.initialState().getIn(['advSearchForm', 'unionGroup', 0])
      return state.updateIn(['advSearchForm', path.group], (group) => group.push(initialLine))
    },

    [CONSTANTS.REMOVE_ADV_SEARCH_OPTION]: (state, { payload: { path } }) => {
      return state.updateIn(['advSearchForm', path.group], (lines) => lines.remove(path.line))
    },

    [CONSTANTS.CLEAR_ADV_SEARCH_OPTION]: (state) => {
      const initialForm = this.initialState().get('advSearchForm')
      return state.set('advSearchForm', initialForm)
    },

    [CONSTANTS.UPDATE_ADV_SEARCH_OPTION]: (state, { payload: { path, value } }) => {
      const { group, line, position, valIndex } = path
      const immLinePath = [ 'advSearchForm', group, line ]
      const oldLine = state.getIn(immLinePath)

      const switching = {
        field: (val) => ({
          field: val,
          operation: '',
          value: []
        }),
        operation: (val) => {
          const valueField = ADV_SEARCH_FORM.getSelectedFieldProps('value', oldLine.get('field'), val)
          const length = valueField && valueField.length || 0
          return {
            operation: val,
            value: Array(length).fill('')
          }
        },
        value: (val, valIndex) => ({
          value: state.getIn(immLinePath.concat('value'))
            .set(valIndex, val)
        })
      }

      return state.mergeIn(immLinePath, switching[position](value, valIndex))
    }
  }
}
