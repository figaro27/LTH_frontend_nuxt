<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <search-box />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import SearchBox from '@/components/SearchBox.vue'

@Component({
  name: 'home',
  components: { SearchBox }
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
