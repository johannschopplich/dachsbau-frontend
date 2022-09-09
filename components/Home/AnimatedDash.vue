<script setup lang="ts">
const props = defineProps<{
  isActive: boolean
}>()

const strokeDashBase = computed(() => (props.isActive ? 100 : 0))
const duration = computed(() => (props.isActive ? 500 : 0))

const output = useTransition(strokeDashBase, {
  duration,
  transition: [0.75, 0, 0.25, 1],
})
</script>

<template>
  <div
    class="absolute left-0 -top-1 h-full w-full scale-110 opacity-0 group-hover:opacity-100"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 400 200"
      fill="none"
      class="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <path
        class="stroke-secondary-400"
        d="M283.343 5C80 18.5 -0.959571 88.5336 3.14407 134.5C7.24771 180.466 87.4593 207.701 215.484 193C345.968 178.016 400.444 135.029 396.832 93.8304C393.22 52.6322 321.5 23.5 193.5 38"
        stroke-width="3%"
        stroke-linecap="square"
        opacity="1"
        pathLength="1"
        stroke-dashoffset="0px"
        :stroke-dasharray="`${output ? output * 0.01 : 0}px 1px`"
      />
    </svg>
  </div>
</template>
