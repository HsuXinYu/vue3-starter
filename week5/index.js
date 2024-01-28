import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "lucky_herb_spices",
      pagination: {},
      products: [],
    };
  },
  methods: {
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/products`)
        .then((res) => {
          console.log(res.data);
          this.pagination = res.data.pagination;
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
}).mount("#app");
