<template>
  <main id="items">
    <div class="container">
      <section id="link">
        <a class="routerLink"><router-link to="/capitals">Voltar</router-link></a>
      </section>

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
#link {
  margin-left: 75px;
}
</style>