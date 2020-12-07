<template>
  <div>
    <mobile-how-lth-works class="lth__mobile" :functionalities="functionalities" />
    <desktop-how-lth-works class="lth__desktop" :functionalities="functionalities" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { api, buildMeta } from '@/utils'
import { Functionality } from '~/models'

@Component({
  name: 'how-lth-works',
  async asyncData() {
    const res = await api.get('functionalities')
    return {
      functionalities: res.data
    }
  },
  head() {
    return buildMeta({
      title: 'How LTH Works - Legaltech Hub',
      description: 'How LTH Works - Legaltech Hub'
    })
  }
})
export default class HowLthWorks extends Vue {
  functionalities: Functionality[] = []

  async mounted() {
    if (this.functionalities.length > 0) return
    const res = await api.get('functionalities')
    this.functionalities = res.data
  }
}
</script>

<style lang="scss" scoped>
.lth__desktop {
  @include desktop-max-width-layout;
  @include col--center;
  margin-top: 70px;
  padding-bottom: 60px;
  text-align: left;

  @include respondTo(lg) {
    display: none !important;
  }
}

.lth__mobile {
  @include desktop-max-width-layout;
  margin-top: 70px;
  padding-bottom: 60px;
  @include col--center;
  text-align: left;
  @media (min-width: 1024px) {
    display: none !important;
  }
}
</style>
