import Home from "@/components/Home.vue";
import Recipes from "@/components/Recipes.vue";
import Capitals from "@/components/Capitals.vue";
import Expenses from "@/components/Expenses.vue";
import Spends from "@/components/Spends.vue";
import FilteringByPeriod from "@/components/FilteringByPeriod.vue";
import Login from "@/components/authenticate/Login.vue";

export default [
  { path: '/', component: Home },
  { path: '/recipes', component: Recipes },
  { path: '/capitals', component: Capitals },
  { path: '/expenses', component: Expenses },
  { path: '/spends', component: Spends },
  { path: "/period", component: FilteringByPeriod },
  { path: "/login", component: Login },
  { path: "*", redirect: "/" }
]
