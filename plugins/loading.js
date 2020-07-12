import Vue from 'vue'

/**
 * Directive to show loading spinner on above any div element
 * Usage
 * <div v-loading="loadingFlag" :loading-options="{
 *    label: 'Loading...', // Label to show below the loading spinner
 *    size: 'medium', // large, medium, small
 *    theme: 'grey', // grey, dark
 *    backgroundColor: 'rgb(255, 255, 255)' // background Color of the overlay
 * ">
 * </div>
 */
const MIN_TIMEOUT = 200

const getSpinner = (element) => element.querySelector('.v-loading')

const options = (userOptions = {}) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  size: 'medium', // large, medium, small
  theme: 'grey', // grey, dark
  label: 'Loading...',
  ...userOptions
})

function addSpinner(el, options) {
  const box = document.createElement('div')
  box.className = `v-loading v-loading--${options.size} v-loading--${options.theme}`
  box.style.backgroundColor = options.backgroundColor
  const spinnerHtml = `
    <div class="mul5">
      <div class="mul5circle1"></div>
      <div class="mul5circle2"></div>
      <div class="mul5circle3"></div>
    </div>
  `
  if (options.label) {
    box.innerHTML = `
      ${spinnerHtml}
      <label>${options.label}</label>
    `
    box.className = `${box.className} v-loading--with-label`
  } else {
    box.innerHTML = spinnerHtml
  }

  el.appendChild(box)
}

function showSpinner(el, show) {
  const style = window.getComputedStyle(el)
  const position = style.getPropertyValue('position')
  if (position === 'static' || position === '') {
    el.dataset.static = true
    el.style.position = 'relative'
  }

  if (show) {
    const box = getSpinner(el)
    if (box) {
      box.classList.add('v-loading--active')
    }
    setTimeout(() => {
      el.dataset.timeout = true
      hideSpinner(el)
    }, MIN_TIMEOUT)
  } else {
    el.dataset.remove = true
    hideSpinner(el)
  }
}

function hideSpinner(el) {
  const box = getSpinner(el)
  if (el.dataset.timeout === 'true' && el.dataset.remove === 'true') {
    if (box) {
      box.classList.remove('v-loading--active')
    }
    el.dataset.timeout = false
    el.dataset.remove = false
  }
}

function removeSpinner(el) {
  const box = getSpinner(el)
  if (box) {
    box.remove()
  }
  if (el.dataset.static) {
    el.style.removeProperty('position')
  }
}

function bind(el, binding, vnode) {
  if (vnode.data.attrs) {
    addSpinner(el, options(vnode.data.attrs['loading-options']), vnode)
  } else {
    addSpinner(el, options(), vnode)
  }
  showSpinner(el, binding.value, vnode)
}

function update(el, binding, vnode) {
  showSpinner(el, binding.value, vnode)
}

function unbind(el, binding, vnode) {
  removeSpinner(el, vnode)
}

Vue.directive('loading', {
  bind,
  update,
  unbind
})
