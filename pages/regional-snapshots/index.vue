<template>
  <div class="regions">
    <regions-hero class="regions__hero" :data="heroData" />
    <saved-searchs class="regions__saved-searchs" />
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
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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

.regions__saved-searchs {
  width: 640px;
  margin: 40px 0 0;
}
</style>
