<template>
  <main id="expenses">
    <div class="container">
      <section id="link">
        <a class="routerLink"><router-link to="/spends">Voltar</router-link></a>
      </section>

      <items
      type="Despesa"
      link="spends"
      ></items>
    </div>
  </main>
</template>

<script>
import Items from "./Items";
export default {
  name: "Expenses",
  components: { Items }
}
</script>

<style>
#expenses {
  margin: 60px;
}
#link {
  margin-left: 75px;
}
</style>