<template>
  <main id="items">
    <div class="container">
      <!-- <a href=""><router-link to="/spends">Voltar</router-link></a>
      <br/>
      <br/> -->

      <items
      type="Receita"
      ></items>
    </div>
  </main>
</template>

<script>
import Items from "./Items";
export default {
  name: "Receita",
  components: { Items }
}
</script>

<style>
</style>