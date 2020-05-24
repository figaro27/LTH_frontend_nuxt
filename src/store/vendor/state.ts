
import { Vendor } from '@/models'

export type VendorState = {
  currentVendor: Vendor | null;
}

const state: VendorState = {
  currentVendor: null
}

export default state
