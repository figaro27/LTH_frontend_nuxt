export type Jurisdiction = { id: string; name: string }
export type Functionality = { id: string; name: string }
export type PracticeArea = { id: string; name: string }
export type PlatformLanguage = { id: string; name: string }
export type Demographic = { id: string; name: string }
export type Installation = { id: string; name: string }
export type Vendor = {
  id: string | number
  name: string
  logo: string | null
  tool: string | null
  description: string | null
  website: string | null
  jurisdictions: Jurisdiction[]
  functionalities: Functionality[]
  subFunctionalities: Functionality[]
  practiceAreas: PracticeArea[]
  platformLanguages: PlatformLanguage[]
  linguisticFunctionalities: PlatformLanguage[]
  demographics: Demographic[]
  installations: Installation[]
  createdAt: string
  updatedAt: string
}
