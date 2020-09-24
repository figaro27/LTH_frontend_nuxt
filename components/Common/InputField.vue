<template>
  <div class="inputfield">
    <div v-if="label" class="inputfield__label" :class="{ 'inputfield__label--focus': focus }">{{ label }}</div>
    <div class="inputfield__wrapper">
      <input
        :id="id"
        ref="inputfield"
        v-model="inputText"
        class="inputfield__input"
        :class="{
          'inputfield__component--error': !!internalError,
          'inputfield__component--non-empty': !isEmpty
        }"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :name="name"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :maxlength="maxlength"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.stop
        @keyup.stop
        @keypress.stop
        @keydown.enter.stop="onEnter"
      />
      <div v-if="internalError" class="inputfield__error">{{ internalError }}</div>
      <template v-else>
        <div v-if="hint" class="inputfield__hint">{{ hint }}</div>
        <div class="inputfield__modifier">
          <slot name="modifier" />
        </div>
        <div class="inputfield__advisor">
          <slot name="advisor" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import validator from 'validator'

@Component({ name: 'input-field' })
export default class InputField extends Vue {
  @Prop({ required: true }) value!: string | number
  @Prop({ default: null }) label!: string | null
  @Prop() id?: string | number
  @Prop() name?: string
  @Prop({ default: '' }) placeholder!: string
  @Prop() hint?: string
  @Prop() autocomplete?: string
  @Prop() min?: number
  @Prop() max?: number
  @Prop() required?: string
  @Prop() maxlength?: number
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: false, type: Boolean }) autoFocus!: boolean
  @Prop({ default: false, type: Boolean }) readonly!: boolean
  @Prop({ default: false, type: Boolean }) disabled!: boolean

  // validation error logic

  /**
   * Allows setting error the conventional way, as a prop
   */
  @Prop({ required: false, default: null }) error!: string | null

  /**
   * For usage with old, unconventional and difficult to test `setError`
   */
  internalError: string | null = null

  /** Used to stop rendering validation error when user starts typing */
  dirty: boolean = false
  @Watch('error') onError(value: string) {
    this.internalError = value
  }

  @Watch('inputText') onInputText() {
    this.internalError = null
  }

  focus: boolean = false

  get inputText(): string | number {
    return this.value
  }

  set inputText(val: string | number) {
    this.$emit('input', val)
    this.$emit('change', val)
  }

  get isEmpty(): boolean {
    return !this.inputText || validator.isEmpty(`${this.inputText}`)
  }

  mounted() {
    if (this.autoFocus) {
      this.$nextTick(() => {
        this.setFocus()
      })
    }
  }

  public setFocus(focus: boolean = true) {
    const inputfield = this.$refs.inputfield as HTMLInputElement
    if (!inputfield) {
      return
    }
    setTimeout(() => {
      focus ? inputfield.focus() : inputfield.blur()
    }, 500)
  }

  onFocus() {
    this.focus = true
  }

  onBlur() {
    setTimeout(() => {
      this.focus = false
    }, 300)
  }

  onEnter(e: KeyboardEvent) {
    this.$emit('enter', e)
  }
}
</script>

<style lang="scss" scoped>
$input-height: 36px;

.inputfield {
  position: relative;
  @include col;
  width: 100%;
}

.inputfield__label {
  @include typography(md-1, default);
  color: $colorNavy;
  margin-bottom: 7px;
  text-align: left;
  &--focus {
    color: $colorNavy;
  }
}

.inputfield__wrapper {
  @include row--center;
  width: 100%;
  position: relative;
}

.inputfield__input {
  width: 100%;
  height: $input-height;
  border: 1px solid $colorDarkGrey;
  border-radius: 5px;
  @include typography(lg, default);
  color: $colorNavy;
  padding: 6px 9px;

  &:focus,
  &:active {
    border: 1px solid $colorGreen;
    outline: none !important;
  }

  &::placeholder {
    @include typography(lg, default);
    color: $colorLighterDarkGrey;
  }
}

.inputfield__component--error {
  margin-top: 0;
  color: $colorRed;
}

.inputfield__hint {
  position: absolute;
  left: 0;
  bottom: -19px;
  @include typography(sm, default);
  color: $colorNavy;
}

.inputfield__modifier {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 120px;
  height: 100%;
  align-items: center;
  @include row;
  justify-content: flex-end;
}

.inputfield__advisor {
  position: absolute;
  right: 0;
  bottom: -17px;
  @include row;
  justify-content: flex-end;
}

.inputfield__error {
  position: absolute;
  left: 0;
  bottom: -19px;
  @include typography(sm, default, bold);
  color: $colorRed;
}
</style>
