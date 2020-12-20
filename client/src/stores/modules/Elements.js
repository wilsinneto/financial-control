import ElementsController from "@/controllers/Elements";

export default {
	state: {
		elements: [],
    elementsController: {},
	},
	mutations: {},
	actions: {
		async saveElement(context, payload) {
			const item = payload;
			console.log("Elements - save");
      if (item.id) {
        console.log("update");
        const response = await context.state.elementsController.update(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateElements");
      } else {
        console.log("create");
        const response = await context.state.elementsController.create(item);
        context.dispatch("responseIsError", response);
        context.dispatch("generateElements");
      }
		},
		async removeElement(context, payload) {
			console.log("removeElement");
			const item = payload;
      const response = await context.state.elementsController.remove(item);
      context.dispatch("responseIsError", response);
      context.dispatch("generateElements");
		},
		async generateElements(context, payload) {
			console.log("generateItems");
			const type = payload;
      context.state.elementsController = new ElementsController();
      const response = await context.state.elementsController.getAll();
      context.dispatch("responseIsError", response);
      context.state.elements = response.filter(element => element.items.type === type);
		},
    responseIsError(context, payload) {
      const response = payload;
      if (response.error) context.state.errors.push(response.error);
    }
	}
}
