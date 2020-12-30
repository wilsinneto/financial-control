import Vue from "vue";
import Vuex from "vuex";
import ItemsService from "@/services/Items";
import ElementsService from "@/services/Elements";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: [],
    items: [],
    elements: [],
    itemsService: {},
    elementsService: {}
  },
  mutations: {
    setItems(state, payload) {
      console.log("setItems");
      const { response, type } = payload;
      state.items = response.filter(item => item.type === type);
    },
    setElements(state, payload) {
      console.log("setElements");
      const { response, type } = payload;
      state.elements = response.filter(element => element.items.type === type);
    }
  },
  actions: {
		async saveElement(context, payload) {
			const { item, type } = payload;
			console.log("Elements - save");
      if (item.id) {
        console.log("update");
        const response = await context.state.elementsService.update(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateElements", item.items.type);
      } else {
        console.log("create");
        const response = await context.state.elementsService.create(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateElements", type);
      }
		},
		async removeElement(context, payload) {
			const item = payload;
			console.log("removeElement");
      const response = await context.state.elementsService.remove(item);
      context.dispatch("responseIsError", response);
      context.dispatch("generateElements", item.items.type);
		},
    async generateElements(context, payload) {
			console.log("generateItems");
			const type = payload;
      context.state.elementsService = new ElementsService();
      const response = await context.state.elementsService.getAll();
      context.dispatch("responseIsError", response);
      context.commit("setElements", { response, type });
		},
    async removeItem(context, payload) {
      console.log("removeItem");
      const item = payload;
      const response = await context.state.itemsService.remove(item);
      context.dispatch("responseIsError", response);
      context.dispatch("generateItems", item.type);
    },
    async saveItem(context, payload) {
      console.log("Item - save");
      const item = payload;
      if (item.id) {
        console.log("update");
        const response = await context.state.itemsService.update(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateItems", item.type);
      } else {
        console.log("create");
        const response = await context.state.itemsService.create(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateItems", item.type);
      }
    },
    async generateItems(context, payload) {
      console.log("generatItems");
      const type = payload;
      context.state.itemsService = new ItemsService();
      const response = await context.state.itemsService.getAll();
      context.dispatch("responseIsError", response);
      context.commit("setItems", { response, type });
    },
    responseIsError(context, payload) {
      const response = payload;
      if (response.error) context.state.errors.push(response.error);
    }
  }
});
