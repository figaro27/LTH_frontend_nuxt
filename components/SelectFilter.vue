<template>
  <div class="search-filter">
    <label v-if="label" class="search-filter__label" :for="id"> {{ label }}: </label>
    <multiselect
      v-model="selectedVal"
      class="search-filter__select"
      label="name"
      hide-selected
      multiple
      placeholder="*"
      taggable
      :tag-placeholder="`Select ${label}`"
      track-by="id"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type Option = {
  id: string | number
  name: string
  [key: string]: any
}

@Component({
  name: 'select-filter'
})
export default class SelectFilter extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) value!: Option[]
  @Prop({ required: true }) options!: Option[]
  @Prop({ required: false }) label!: string

  get selectedVal() {
    return this.value
  }

  set selectedVal(newVal: Option[]) {
    this.$emit('input', newVal)
    this.$emit('change', { id: this.id, value: newVal })
  }
}
</script>

<style lang="scss" scoped>
.search-filter {
  display: flex;
  flex-direction: column;
}

.search-filter__label {
  @include typography(md-1, default, bold);
  color: $colorNavy;
  margin-bottom: 5px;
  text-align: left;
}

.search-filter__select {
  @include typography(md, default, bold);
  padding: 5px;
}
</style>

<style lang="scss">
.search-filter {
  .multiselect__select::before {
    border-color: $colorNavy transparent transparent;
  }
  .multiselect__tag {
    background: $colorLightGreen;
    color: $colorDarkGrey;

    span {
      color: $colorDarkGrey;
    }
  }

  .multiselect__tag-icon:hover {
    background: $colorLightGreen;
  }

  .multiselect__option.multiselect__option--highlight {
    background: $colorLightGreen;

    span {
      color: $colorDarkGrey;
    }

    &::after {
      background: $colorLightGreen;
    }
  }
}
</style>
