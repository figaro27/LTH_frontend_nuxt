import { Vendor } from '@/models'

export type VendorState = {
  currentVendor: Vendor | null
}

const state = () =>
  ({
    currentVendor: null
  } as VendorState)

export default state
