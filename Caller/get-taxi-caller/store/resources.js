import Immutable from 'immutable'
import pluralize from 'pluralize'
import _, { merge, isFunction } from 'lodash'
// import { push } from 'react-router-redux'

import request from 'utils/request'

// import ADV_SEARCH_FORM from 'components/AdvancedSearch/utils/filterOptions'

export default function Boilerplate (resource, schema) {
  const RESOURCE = resource.toUpperCase()
  const collection = pluralize(resource)
  const COLLECTION = collection.toUpperCase()

  const CONSTANTS = _.mapValues({
    UPDATE_COLLECTION: 'UPDATE_COLLECTION',
    UPDATE_RESOURCE: 'UPDATE_RESOURCE',
    UPDATE_BUCKET_RESOURCE: `UPDATE_BUCKET`,
    UPDATE_BUCKET_RESOURCE_IN: `UPDATE_BUCKET_IN`,
    RESET_BUCKET_RESOURCE: `RESET_BUCKET`,
    UPDATE_ALL_FIELDS_LIST: `UPDATE_ALL_FIELDS_LIST`,
    UPDATE_FIELDS: `UPDATE_FIELDS`,
    UPDATE_FIELD: `UPDATE_FIELD`,
    TOGGLE_ADV_SEARCH: `TOGGLE_ADV_SEARCH`,
    ADD_ADV_SEARCH_OPTION: `ADD_ADV_SEARCH_OPTION`,
    REMOVE_ADV_SEARCH_OPTION: `REMOVE_ADV_SEARCH_OPTION`,
    UPDATE_ADV_SEARCH_OPTION: `UPDATE_ADV_SEARCH_OPTION`,
    SUBMIT_ADV_SEARCH_OPTION: `SUBMIT_ADV_SEARCH_OPTION`,
    CLEAR_ADV_SEARCH_OPTION: `CLEAR_ADV_SEARCH_OPTION`,
    UPDATE_PAGE: `UPDATE_PAGE`,
    UPDATE_IS_LOADING: `UPDATE_IS_LOADING`
  }, constant => (collection + '/' + constant))

  const actions = {
    updateCollection: (collection) => ({
      type: CONSTANTS.UPDATE_COLLECTION,
      payload: collection
    }),
    updateResource: (resource) => ({
      type: CONSTANTS.UPDATE_RESOURCE,
      payload: resource
    }),
    updateBucketResource: (bucket, resource) => ({
      type: CONSTANTS.UPDATE_BUCKET_RESOURCE,
      payload: { bucket, resource }
    }),
    updateBucketResourceIn: (bucket, path, func) => ({
      type: CONSTANTS.UPDATE_BUCKET_RESOURCE_IN,
      payload: { bucket, path, func }
    }),
    resetBucketResource: (bucket) => ({
      type: CONSTANTS.RESET_BUCKET_RESOURCE,
      payload: { bucket }
    }),
    updateAllFieldsList: (fields) => ({
      type: CONSTANTS.UPDATE_ALL_FIELDS_LIST,
      payload: fields
    }),
    updateField: ({ field, doShow }) => ({
      type: CONSTANTS.UPDATE_FIELD,
      payload: { field, doShow }
    }),
    updateFields: (fields) => ({
      type: CONSTANTS.UPDATE_FIELDS,
      payload: fields
    }),
    toggleAdvSearch: () => ({
      type: CONSTANTS.TOGGLE_ADV_SEARCH
    }),
    addAdvSearchOption: (path) => ({
      type: CONSTANTS.ADD_ADV_SEARCH_OPTION,
      payload: { path }
    }),
    removeAdvSearchOption: (path) => ({
      type: CONSTANTS.REMOVE_ADV_SEARCH_OPTION,
      payload: { path }
    }),
    updateAdvSearchOption: (value, path) => ({
      type: CONSTANTS.UPDATE_ADV_SEARCH_OPTION,
      payload: { value, path }
    }),
    clearAdvSearchOption: () => ({
      type: CONSTANTS.CLEAR_ADV_SEARCH_OPTION
    }),
    updatePage: (page) => ({
      type: CONSTANTS.UPDATE_PAGE,
      payload: page
    }),
    updateIsLoading: (value) => ({
      type: CONSTANTS.UPDATE_IS_LOADING,
      payload: value
    })
  }

  const draftRequestThunkAction = function ({ method = 'GET', url, query = '', schema, body = '', cb = () => {}, attachments }) {
    return (dispatch, getState) => {
      const locale = getState().get('i18n').get('locale')
      const accessToken = getState().get('authentication').get('accessToken')
      const _url = isFunction(url) ? url(getState) : url
      const _body = isFunction(body) ? body(getState) : body
      const _attachments = isFunction(attachments) ? attachments(getState) : attachments

      dispatch(actions.updateIsLoading(true))

      request[method.toLowerCase()](_url).query({ ...query })
        .send(_body)
        .locale(locale).normalize(schema, dispatch)
        .then(normalizedResponse => {
          console.log('normalizedResponse:', normalizedResponse)
          cb(dispatch, getState, normalizedResponse)
          return normalizedResponse
        })
        .catch(error => {
          console.warn({ method, _url, query, _body, schema, cb })
          console.warn(error.message)
        })
        .then((normalizedResponse) => {
          if (_attachments) {
            const attachmentRequest = request
              .put(`${_url}/${method === 'POST' ? normalizedResponse.result : ''}`)
              .accessToken(accessToken)
            _attachments.map((file, key) => {
              attachmentRequest.attach(key, file)
            })
            attachmentRequest.end()
          }
        })
        .then(() => {
          dispatch(actions.updateIsLoading(false))
        })
    }
  }

  return {
    CONSTANTS,
    actions: function (additionalActions = {}) {
      return merge(actions, additionalActions)
    },
    draftRequestThunkAction,
    thunkActions: {
      getCollection: ({ target = collection, page = 0, query } = {}, extendsArgs) => {
        return draftRequestThunkAction({
          url: `/admin/${target || collection}`,
          query: { page: Number.isInteger(page) ? page + 1 : undefined, ...query },
          schema: [schema],
          cb (dispatch, getState, normalizedCollection) {
            dispatch(actions.updateCollection({ [page]: normalizedCollection.result }))
          },
          ...extendsArgs
        })
      },
      updateResourceInBucket: (bucket) => {
        return (resource, func) => {
          return (dispatch, getState) => {
            const action =
              `${_.isEmpty(resource) || resource === undefined ? 'reset' : 'update'}BucketResource${func ? 'In' : ''}`
            dispatch(actions[action](_.toLower(bucket), resource, func))
          }
        }
      },
      resetResourceInBucket: (bucket) => {
        return () => {
          return (dispatch, getState) => {
            dispatch(actions[`resetBucketResource`](_.toLower(bucket)))
          }
        }
      },
      updateAllFieldsList: (fields) => {
        return (dispatch, getState) => {
          dispatch(actions.updateAllFieldsList(fields))
        }
      },
      updateField: ({ field, doShow }) => {
        return (dispatch, getState) => {
          dispatch(actions.updateField({
            field,
            doShow
          }))
        }
      },
      toggleAdvSearch: () => {
        return (dispatch, getState) => {
          dispatch(actions.toggleAdvSearch())
        }
      },
      addAdvSearchOption: (path) => {
        return (dispatch, getState) => {
          dispatch(actions.addAdvSearchOption(path))
        }
      },
      removeAdvSearchOption: (path) => {
        return (dispatch, getState) => {
          dispatch(actions.removeAdvSearchOption(path))
        }
      },
      updateAdvSearchOption: (value, path) => {
        return (dispatch, getState) => {
          dispatch(actions.updateAdvSearchOption(value, path))
        }
      },
      clearAdvSearchOption: () => {
        return (dispatch, getState) => {
          dispatch(actions.clearAdvSearchOption())
        }
      },
      submitAdvSearchOption: () => {
        return (dispatch, getState) => {
          // dispatch(actions.clearAdvSearchOption())
        }
      },
      getResource: ({ target = collection, id }, extendsArgs) => {
        return draftRequestThunkAction({
          method: 'GET',
          url: `/admin/${target}/${id}`,
          schema: schema,
          cb (dispatch, getState, normalizedCollection) {
            dispatch(actions.updateResource(normalizedCollection.result))
          },
          ...extendsArgs
        })
      },
      createResource: ({ target = collection, attachments }, extendsArgs) => {
        return draftRequestThunkAction({
          method: 'POST',
          url: `/admin/${target}`,
          schema: schema,
          body: (getState) => getState().get(collection).get('newResource'),
          attachments,
          // attachments: (getState) => getState().get(collection).get('newResource').get('attachments_attributes'),
          cb (dispatch, getState, normalizedResource) {
            dispatch(actions.updateResource(normalizedResource.result))
            // dispatch(push(`/${collection}/${normalizedResource.result}`))
            dispatch(actions.resetBucketResource('new'))
          },
          ...extendsArgs
        })
      },
      submitEditResource: ({ target = collection, id, attachments }, extendsArgs) => {
        return draftRequestThunkAction({
          method: 'PUT',
          url: `/admin/${target}/${id}`,
          schema: schema,
          body: (getState) => getState().get(collection).get('editResource'),
          attachments,
          // attachments: (getState) => getState().get(collection).get('editResource').get('attachments_attributes'),
          cb (dispatch, getState, normalizedResource) {
            dispatch(actions.updateResource(normalizedResource.result))
            // dispatch(push(`/${collection}/${normalizedResource.result}`))
            dispatch(actions.resetBucketResource('edit'))
          },
          ...extendsArgs
        })
      },
      destroyResource: ({ target = collection, id }, extendsArgs) => {
        return draftRequestThunkAction({
          method: 'DELETE',
          url: `/admin/${target}/${id}`,
          schema: schema,
          body: (getState) => getState().get(collection).get('editResource'),
          cb (dispatch, getState, normalizedResource) {
            dispatch(actions.updateResource(normalizedResource.result))
            // dispatch(push(`/${collection}`))
          },
          ...extendsArgs
        })
      }
    },
    initialState: function (initialState = {}) {
      return Immutable.fromJS({
        collection: {},
        newResource: {},
        editResource: {},
        fields: [],
        advSearchOn: false,
        advSearchForm: {
          unionGroup:[
            {
              field: 'phone',
              operation: 'contains',
              value: ['']
            }
          ],
          intersectGroup: [],
          subtractGroup: []
        },
        page: 0,
        isLoading: false
      }).mergeDeep(Immutable.fromJS(initialState))
    },
    actionHandlers: function (actionHandlers = {}) {
      return merge({
        [CONSTANTS.UPDATE_COLLECTION]: (state, { payload }) => {
          return state.update('collection', (collection) => {
            return collection.merge(payload)
          })
        },
        [CONSTANTS.UPDATE_RESOURCE]: (state, { payload }) => {
          return state.merge({
            resource: payload
          })
        },
        [CONSTANTS.UPDATE_BUCKET_RESOURCE]: (state, { payload: { bucket, resource } }) => {
          return state.mergeDeep({
            [`${bucket}Resource`]: resource
          })
        },
        [CONSTANTS.UPDATE_BUCKET_RESOURCE_IN]: (state, { payload: { bucket, path, func } }) => {
          return state.updateIn([`${bucket}Resource`, ...path], func)
        },
        [CONSTANTS.RESET_BUCKET_RESOURCE]: (state, { payload: { bucket } }) => {
          return state.merge({
            [`${bucket}Resource`]: Immutable.Map()
          })
        },
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
            // _fields = _fields.push(field)
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
          // return state.updateIn(['advSearchForm', path.group], (group) => group.push(initialLine))
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
        },
        [CONSTANTS.UPDATE_PAGE]: (state, { payload }) => {
          return state.merge({
            page: payload
          })
        },
        [CONSTANTS.UPDATE_IS_LOADING]: (state, { payload }) => {
          return state.merge({
            isLoading: payload
          })
        }
      }, actionHandlers)
    }
  }
}
