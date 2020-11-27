<template>
  <main id="Error">
    <div class="alert alert-danger" role="alert" v-if="error.length">
      <b>{{ error }}</b>
    </div>
  </main>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
}
</script>
