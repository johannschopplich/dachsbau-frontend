import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  /**
   * Directive to replace the current element with its raw HTML content
   * Especially useful with `<div v-hoist v-html="html" />` to replace the
   * wrapping `<div>` element with its raw inner HTML
   */
  vueApp.directive('hoist', {
    created(el) {
      // Return if no child elements of type element nodes are found
      if (![...el.childNodes].some((i) => i.nodeType === 1)) return

      if (el.tagName === 'TEMPLATE') {
        el.replaceWith(el.content)
      } else {
        el.replaceWith(...el.children)
      }
    },
  })
})
