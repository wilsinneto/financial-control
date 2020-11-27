<template>
  <main>
    <div class="alert alert-danger" role="alert" v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "Errors",
  props: ["errors"]
}
</script>
