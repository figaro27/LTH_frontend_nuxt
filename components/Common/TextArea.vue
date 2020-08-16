<template>
  <component :is="label ? 'label' : 'div'" class="text-area">
    <div v-if="label" class="text-area__label">{{ label }}</div>
    <textarea
      :id="id"
      v-model="inputText"
      class="text-area__input"
      type="textarea"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      @change="update"
      @keydown.stop="onKeyDown"
      @keyup.stop
      @keypress.stop
    />
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component({ name: 'text-area' })
export default class TextArea extends Vue {
  @Prop({ required: false, default: false }) disabled!: boolean
  @Prop({ required: true }) value!: string
  @Prop({ required: false, default: null }) label!: string | null
  @Prop({ required: false }) id?: string | number
  @Prop({ required: false }) placeholder?: string
  @Prop({ required: false }) name?: string

  get inputText() {
    return this.value
  }

  set inputText(val: string) {
    this.$emit('input', val)
    this.$emit('change', val)
  }

  @Watch('inputText')
  onInputText() {
    this.$emit('change', this.inputText)
  }

  update(e: any) {
    this.inputText = e.target.value
  }

  onKeyDown(e: KeyboardEvent) {
    if (
      !this.$listeners.enter || // If the enter listener is not defined, no need to catch shift-enter and add new line in that case
      e.key !== 'Enter' || // If the pressed key is not enter, just do the default behavior
      e.shiftKey // If the shift key is not pressed, just do the default behavior what enter does
    ) {
      return
    }

    e.preventDefault()
    this.$emit('enter', e)
  }
}
</script>

<style lang="scss" scoped>
$input-height: 33px;

.text-area {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: $colorBg1;
}

.text-area__label {
  @include typography(md-1, default);
  color: $colorNavy;
  margin-bottom: 7px;

  &--focus {
    font-weight: bold;
  }
}

.text-area__input {
  @include typography(lg, default);
  width: 100%;
  height: 100%;
  border: none;
  color: $colorNavy;
  padding: 15px 20px;
  background: $colorBg1;
  resize: none;

  &:valid,
  &:focus,
  &:active {
    border: none;
    outline: none !important;
  }

  &::placeholder {
    @include typography(lg, default);
    color: $colorLighterDarkGrey;
  }
}
</style>
