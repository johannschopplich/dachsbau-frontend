<template>
  <div class="h-full">
    <AppHeader />

    <main class="max-w-screen-md mx-auto py-12 content">
      <slot />
    </main>

    <AppFooter class="sticky top-[calc(var(--vh,1vh)*100)]" />
  </div>
</template>
