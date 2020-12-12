<template>
  <main id="capitals">
    <div class="container">
      <section id="link">
        <a class="routerLink"><router-link to="/">Home</router-link></a>
        <a class="routerLink"><router-link to="/spends">Despesas</router-link></a>
      </section>

      <elements
      type="Receita"
      link="recipes"
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
#capitals {
  margin: 60px;
}
#link {
  margin-left: 75px;
}
.routerLink{
  margin-right: 8px;
}
</style>