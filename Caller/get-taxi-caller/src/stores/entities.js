import { fromJS, Map } from 'immutable'

export { normalize, denormalize } from 'normalizr'

export {
  inquirySchema, serviceSchema, categorySchema, customerSchema,
  providerSchema, quotationSchema, adminSchema, reviewSchema,
  provinceSchema, districtSchema, subDistrictSchema, promoCodeSchema,
  paymentMethodSchema, accountSchema, clientSchema, addressSchema, walletSchema,
  bankAccountSchema, transactionSchema, bundleSchema, packageSchema,
  deviceSchema, chargeSchema, transferSlipSchema, paymentSchema, invoiceSchema,
  cardSchema
} from './schemas'

export const UPDATE_ENTITIES = 'entities/UPDATE_ENTITIES'
export const UPDATE_ENTITY = 'entities/UPDATE_ENTITY'

// ------------------------------------
// Actions
// ------------------------------------
export function updateEntities (entities) {
  return {
    type    : UPDATE_ENTITIES,
    payload : entities
  }
}

export function updateEntity (schema, id, func) {
  return {
    type    : UPDATE_ENTITY,
    payload : { schema, id, func }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_ENTITIES]: (state, { payload }) => {
    return state.mergeDeep(payload)
  },
  [UPDATE_ENTITY]: (state, { payload }) => {
    return state.updateIn([payload.schema.key, payload.id.toString()], item => payload.func(item || Map()))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  addresses: {},
  customers: {},
  devices: {},
  inquiries: {},
  services: {}
})

export default function entitiesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
