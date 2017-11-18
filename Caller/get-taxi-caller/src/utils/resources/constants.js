import { mapValues } from 'lodash'

export default (schema) => mapValues({
  REQUEST_COLLECTION:        'REQUEST_COLLECTION',
  UPDATE_COLLECTION:         'UPDATE_COLLECTION',

  REQUEST_SEARCH:            'REQUEST_SEARCH',
  UPDATE_SEARCH:             'UPDATE_SEARCH',

  UPDATE_PAGE:               'UPDATE_PAGE',

  REQUEST_RESOURCE:          'REQUEST_RESOURCE',
  UPDATE_RESOURCE:           'UPDATE_RESOURCE',

  UPDATE_NEW_RESOURCE:       'UPDATE_NEW_RESOURCE',
  CREATING_RESOURCE:         'CREATING_RESOURCE',
  RESET_NEW_RESOURCE:        'RESET_NEW_RESOURCE',

  UPDATE_EDIT_RESOURCE:      'UPDATE_EDIT_RESOURCE',
  EDITING_RESOURCE:          'EDITING_RESOURCE',
  RESET_EDIT_RESOURCE:       'RESET_EDIT_RESOURCE',

  UPDATE_DUPLICATE_RESOURCE: 'UPDATE_DUPLICATE_RESOURCE',
  RESET_DUPLICATE_RESOURCE:  'RESET_DUPLICATE_RESOURCE',

  REQUEST_PREPARE_RESOURCE:  'REQUEST_PREPARE_RESOURCE',

  REQUEST_ADDRESSES:         'REQUEST_ADDRESSES',
  UPDATE_ADDRESSES:          'UPDATE_ADDRESSES',

  SET_ERROR:                 'SET_ERROR',

  UPDATE_ALL_FIELDS_LIST:    'UPDATE_ALL_FIELDS_LIST',
  UPDATE_FIELDS:             'UPDATE_FIELDS',
  UPDATE_FIELD:              'UPDATE_FIELD',
  TOGGLE_ADV_SEARCH:         'TOGGLE_ADV_SEARCH',
  ADD_ADV_SEARCH_OPTION:     'ADD_ADV_SEARCH_OPTION',
  REMOVE_ADV_SEARCH_OPTION:  'REMOVE_ADV_SEARCH_OPTION',
  UPDATE_ADV_SEARCH_OPTION:  'UPDATE_ADV_SEARCH_OPTION',
  SUBMIT_ADV_SEARCH_OPTION:  'SUBMIT_ADV_SEARCH_OPTION',
  CLEAR_ADV_SEARCH_OPTION:   'CLEAR_ADV_SEARCH_OPTION'

}, constant => (schema.key + '/' + constant))