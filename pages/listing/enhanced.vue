<template>
  <enhanced-listing />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { buildMeta } from '~/utils'

@Component({
  name: 'listing-enhance',
  head() {
    return buildMeta({
      title: 'Add/Update Listings - Legaltech Hub',
      description: 'Add/Update Listings - Legaltech Hub'
    })
  }
})
export default class ListingEnhance extends Vue {}
</script>
