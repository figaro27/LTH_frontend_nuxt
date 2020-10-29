export type TaxonomyInput = { id?: number; name: string }

export type VendorRequest = {
  name: string
  tool: string
  email: string
  type: 'create' | 'update'
  description: string
  demographics?: Array<TaxonomyInput>
  existingCustomers?: Array<TaxonomyInput>
  features?: Array<TaxonomyInput>
  functionalities?: Array<TaxonomyInput>
  hqs?: Array<TaxonomyInput>
  installations?: Array<TaxonomyInput>
  integrations?: Array<TaxonomyInput>
  linguisticFunctionalities?: Array<TaxonomyInput>
  offices?: Array<TaxonomyInput>
  platformLanguages?: Array<TaxonomyInput>
  practiceAreas?: Array<TaxonomyInput>
  subFunctionalities?: Array<TaxonomyInput>
  website: string
  token?: string
}

export const getEmptyVendorRequest = (): VendorRequest => ({
  name: '',
  tool: '',
  email: '',
  type: 'create',
  description: '',
  demographics: [],
  existingCustomers: [],
  features: [],
  functionalities: [],
  hqs: [],
  installations: [],
  integrations: [],
  linguisticFunctionalities: [],
  offices: [],
  platformLanguages: [],
  practiceAreas: [],
  subFunctionalities: [],
  website: ''
})
