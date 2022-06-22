<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { useDraggable, useElementBounding } from '@vueuse/core'

const dachs = ref<HTMLElement | undefined>()
const biene = ref<HTMLElement | undefined>()

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})

const intersects = computed(() => {
  return false
})

const items = [
  {
    label: 'Yogadachs',
    icon: '🧘‍♀️',
  },
  {
    label: 'Wunderdachs',
    icon: '🌻',
  },
  {
    label: 'Mamadachs',
    icon: '🤰',
  },
  {
    label: 'Überraschungsdachs',
    icon: '🎉',
  },
]
</script>

<template>
  <!-- <div class="space-y-8">
    <div class="flex gap-lg">
      <div
        v-for="({ label, icon }, index) in items"
        :key="index"
        class="bg-sky-200 rounded-xl p-xl text-center"
      >
        {{ icon }}

        <p class="text-sky-600 font-medium">{{ label }}</p>
      </div>
    </div>
  </div> -->

  <div ref="el" :style="style" style="position: fixed">
    Drag me! I am at {{ x }}, {{ y }}
  </div>

  <div
    ref="dachs"
    class="fixed bottom-$bottom left-0 text-8xl select-none transition-bottom"
    :style="`--bottom: ${intersects ? '0' : '-2rem'}`"
  >
    🦡
  </div>
</template>
