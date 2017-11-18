import { schema } from 'normalizr'

export const categorySchema = new schema.Entity('categories')
export const cardSchema = new schema.Entity('cards')

export const paymentMethodSchema = new schema.Entity('payment_methods')

export const chargeSchema = new schema.Entity('charges', {
  card: cardSchema
})

export const transferSlipSchema = new schema.Entity('transfer_slips')

const paymentSourceSchema = new schema.Union({
  charge: chargeSchema,
  transfer_slip: transferSlipSchema
}, 'type')

export const paymentSchema = new schema.Entity('payments', {
  payment_method: paymentMethodSchema,
  source: paymentSourceSchema
})

const invoiceOrderSchema = new schema.Union({
  inquiry: inquirySchema
}, 'order')

export const invoiceItemSchema = new schema.Entity('invoice_items', {
  order: invoiceOrderSchema
})

export const discountSchema = new schema.Entity('discounts')

export const invoiceSchema = new schema.Entity('invoices', {
  items: [invoiceItemSchema],
  discounts: [discountSchema],
  payments: [paymentSchema]
})

paymentSchema.define({
  invoice: invoiceSchema
})

export const packageSchema = new schema.Entity('packages')

export const questionSchema = new schema.Entity('questions')

export const serviceSchema = new schema.Entity('services', {
  category: categorySchema,
  packages: [packageSchema],
  questions: [questionSchema],
  payment_methods: [paymentMethodSchema]
})

categorySchema.define({
  services: [serviceSchema]
})

export const subDistrictSchema = new schema.Entity('sub_districts')

export const districtSchema = new schema.Entity('districts', {
  sub_districts: [subDistrictSchema]
})

subDistrictSchema.define({
  district: districtSchema
})

export const provinceSchema = new schema.Entity('provinces', {
  districts: [districtSchema]
})

districtSchema.define({
  province: provinceSchema
})

export const addressSchema = new schema.Entity('addresses', {
  province: provinceSchema,
  district: districtSchema,
  sub_district: subDistrictSchema
})

export const reviewSchema = new schema.Entity('reviews')

export const providerSchema = new schema.Entity('providers', {
  category: categorySchema,
  services: [serviceSchema]
})

export const customerSchema = new schema.Entity('customers', {
  addresses: [addressSchema],
  providers: [providerSchema]
})

export const quotationSchema = new schema.Entity('quotations', {
  provider: providerSchema
})

export const promoCodeSchema = new schema.Entity('promo_codes')

export const inquirySchema = new schema.Entity('inquiries', {
  service: serviceSchema,
  package: packageSchema,
  quotations: [quotationSchema],
  accepted_quotation: quotationSchema,
  customer: customerSchema,
  address: addressSchema,
  promo_code: promoCodeSchema,
  invoice: invoiceSchema
})

quotationSchema.define({
  inquiry: inquirySchema
})

export const adminSchema = new schema.Entity('admin_users')

export const accountSchema = new schema.Entity('accounts', {
  owner: customerSchema
})

export const clientSchema = new schema.Entity('clients', {
  issued_by: adminSchema
})

export const transactionSchema = new schema.Entity('transactions')

export const bankAccountSchema = new schema.Entity('bank_accounts')

export const walletSchema = new schema.Entity('wallets')

export const bundleSchema = new schema.Entity('bundles', {
  package: packageSchema
})

export const deviceSchema = new schema.Entity('devices')
