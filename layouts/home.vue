<template>
  <div class="relative overflow-y-hidden">
    <AppHeader />

    <main>
      <slot />
    </main>

    <AppFooter />

    <div
      class="absolute bottom-0 left-4 translate-y-[40%] rotate-20 transition-transform-300 hover:translate-y-[30%] hover:rotate-25 md:left-10"
    >
      <img
        class="h-[10rem] md:h-[20rem]"
        src="~/assets/img/frechdachs-1024.png"
        alt=""
      />
    </div>
  </div>
</template>
