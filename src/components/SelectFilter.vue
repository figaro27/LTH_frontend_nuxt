<template>
  <div class="search-filter">
    <label v-if="label" class="search-filter__label" :for="id">{{label}}:</label>
    <select class="search-filter__select" :id="id" :name="name" v-model="selectedVal">
      <option
        v-for="(option, index) of options"
        :key="`${name}-${index}`"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export type Option = {
  id: string | number;
  name: string;
  [key: string]: any;
}

@Component({
  name: 'select-filter'
})
export default class SelectFilter extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) value!: string
  @Prop({ required: true }) options!: Option[]
  @Prop({ required: false }) label!: string

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
  display: flex;
  flex-direction: column;
}

.search-filter__label {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
}

.search-filter__select {
  padding: 5px;
  font-size: 14px;
}
</style>
