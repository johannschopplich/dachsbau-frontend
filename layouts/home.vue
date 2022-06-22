<template>
  <div>
    <AppHeader />

    <main>
      <slot />
    </main>

    <AppFooter />

    <div
      class="fixed bottom-0 left-15 translate-y-[30%] rotate-20 transition-transform-300 hover:translate-y-[20%] hover:rotate-25"
    >
      <img class="h-[25rem]" src="~/assets/frechdachs-1024.png" alt="" />
    </div>
  </div>
</template>
