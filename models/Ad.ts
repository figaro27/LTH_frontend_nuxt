export type AdPosition = {
  image: string
  redirectUrl: string
}

export type Ad = {
  id: number
  name: string

  adPositions: {
    desktopHomeHorizontalAd: AdPosition
    desktopCommonHorizontalAd: AdPosition
    mobileCommonHorizontalAd: AdPosition

    desktopHomeLeftVerticalAd: AdPosition
    desktopCommonLeftVerticalAd: AdPosition
    mobileCommonLeftVerticalAd: AdPosition

    desktopHomeRightVerticalAd: AdPosition
    desktopCommonRightVerticalAd: AdPosition
    mobileCommonRightVerticalAd: AdPosition
  }

  createdAt: string
  updatedAt: string
}
