<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const img = useTemplateRef('img')

onMounted(() => {
  if (!img.value) return
  if (useNuxtApp().isHydrating) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (img.value.complete && img.value.naturalWidth > 0) return

  img.value.style.opacity = '0'

  img.value.addEventListener(
    'load',
    async () => {
      const animation = img.value!.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 400,
        easing: 'ease',
        fill: 'forwards',
      })
      await animation.finished
      img.value!.style.opacity = ''
    },
    { once: true },
  )

  img.value.addEventListener(
    'error',
    () => {
      img.value!.style.opacity = ''
    },
    { once: true },
  )
})
</script>

<template>
  <img ref="img" v-bind="$attrs" />
</template>
