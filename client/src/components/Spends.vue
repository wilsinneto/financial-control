<template>
  <main id="spends">
    <div class="container">
      <section id="link">
        <a class="routerLink"><router-link to="/">Home</router-link></a>
        <a class="routerLink"><router-link to="/capitals">Capitals</router-link></a>
        <a class="period"><router-link to="/period">Buscar por data</router-link></a>
      </section>

      <elements
      type="Despesa"
      link="expenses"
      ></elements>
    </div>
  </main>
</template>

<script>
import Elements from "./Elements";
export default {
  name: "Spends",
  components: { Elements }
}
</script>

<style>
#spends {
  margin: 60px;
}
#link {
  margin-left: 75px;
}
.routerLink{
  margin-right: 8px;
}
</style>