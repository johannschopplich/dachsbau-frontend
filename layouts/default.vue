<template>
  <div class="relative h-full">
    <AppHeader />

    <main>
      <slot />
    </main>

    <ClientOnly>
      <AppFooter />
    </ClientOnly>
  </div>
</template>
