<template>
  <div class="editable-filter">
    <label v-if="label" class="editable-filter__label" :for="id"> {{ label }} </label>
    <multiselect
      v-model="selectedVal"
      class="editable-filter__select"
      label="name"
      hide-selected
      multiple
      placeholder="*"
      taggable
      :tag-placeholder="`Select ${label}`"
      track-by="id"
      :options="options"
      @tag="addTag"
    />
    <label v-if="error" class="editable-filter__error"> {{ error }}</label>
    <label v-else-if="belowText" class="editable-filter__below"> {{ belowText }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type Option = {
  id: number
  name: string
  [key: string]: any
}

@Component({
  name: 'editable-filter'
})
export default class EditableFilter extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) value!: Option[]
  @Prop({ default: null }) error!: string | null
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) belowText!: string

  options: Option[] = []

  get selectedVal() {
    return this.value
  }

  set selectedVal(newVal: Option[]) {
    this.$emit('input', newVal)
    this.$emit('change', { id: this.id, value: newVal })
  }

  addTag(newTag: string) {
    const newId = Math.min(...this.options.map((op) => op.id), 0)
    const newOption = {
      id: newId - 1,
      name: newTag
    }
    this.options.push(newOption)
    this.$emit('input', [...this.value, newOption])
  }
}
</script>

<style lang="scss" scoped>
.editable-filter {
  display: flex;
  flex-direction: column;
}

.editable-filter__label {
  @include typography(md-1, default, bold);
  color: $colorNavy;
  margin-bottom: 5px;
  text-align: left;
  padding: 5px;
}

.editable-filter__select {
  @include typography(md, default, bold);
  padding: 5px;
}

.editable-filter__error {
  @include typography(md-1);
  color: $colorRed;
  margin-top: 5px;
  text-align: left;
}

.editable-filter__below {
  @include typography(md-1);
  color: $colorNavy;
  margin-top: 5px;
  text-align: left;
}
</style>

<style lang="scss">
.editable-filter {
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
