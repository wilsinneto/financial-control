<template>
  <main id="capitals">
    <div class="container">
      <!-- <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/> -->

      <elements
      type="Receita"
      ></elements>
    </div>
  </main>
</template>

<script>
import Elements from "./Elements";
export default {
  name: "Capitals",
  components: { Elements }
}
</script>

<style>
</style>