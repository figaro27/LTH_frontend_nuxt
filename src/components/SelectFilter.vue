<template>
  <select class="search-filter" :id="id" :name="name" v-model="selectedVal">
    <option
      v-for="(option, index) of options"
      :key="`${name}-${index}`"
      :value="option.id"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'select-filter'
})
export default class SelectFilter extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) value!: string
  @Prop({ required: true }) options!: any[]

  get selectedVal () {
    return this.value
  }

  set selectedVal (value: string) {
    this.$emit('input', value)
    this.$emit('change', {
      id: this.id,
      value: this.options.find(o => `${o.id}` === `${value}`)
    })
  }
}
</script>

<style lang="scss" scoped>
.search-filter {
  padding: 5px;
  font-size: 14px;
}
</style>
