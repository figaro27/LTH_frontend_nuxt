<template>
  <div class="regions">
    <regions-hero class="regions__hero" is-main :data="heroData" />
    <div class="regions__saved-searchs-container">
      <saved-searchs class="regions__saved-searchs" colorized />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import RegionsHero from '@/components/Regions/RegionsHero.vue'
import SavedSearchs from '@/components/SavedSearchs.vue'

@Component({
  name: 'regional-snapshots',
  components: { RegionsHero, SavedSearchs }
})
export default class RegionalSnapshots extends Vue {
  get heroData() {
    return {
      name: 'Regional Snapshots',
      description:
        'Legaltech regional snapshots are an easy way to see what’s going on in a region at a glance. Click on one of these saved search buttons to see the full list of tools for the commercial legal space headquartered in any one region, and drill down into the data from there. Want to know how many document automation tools have been developed in Asia? Or how broad the legal AI market is in Latin America? Regional snapshots are a shortcut to that information. Bonus: some of our regional snapshots contain sub-regional breakdowns for notable ecosystems. Examples include the Nordics and Brazil.',
      titleColor: '#011d58',
      map: 'https://legal-uploads.s3.us-east-2.amazonaws.com/regions-map/main.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.regions {
  width: 100%;
  background: $colorBg2;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
}

.regions__hero {
  width: 100vw;
}

.regions__saved-searchs-container {
  width: 100%;
  @include col--center;
}

.regions__saved-searchs {
  width: 640px;
  margin: 40px 0 0;
}
</style>
