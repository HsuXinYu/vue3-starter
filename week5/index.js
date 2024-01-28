import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let detailModal = "";

const app = createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "lucky_herb_spices",
      pagination: {},
      products: [],
      productDetail: {},
      cart: { qty: 1 },
    };
  },
  methods: {
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/products`)
        .then((res) => {
          // console.log(res.data);
          this.pagination = res.data.pagination;
          this.products = res.data.products;
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
    getProductDetail(id) {
      // console.log(id);
      axios
        .get(`${this.url}/api/${this.path}/product/${id}`)
        .then((res) => {
          // console.log(res.data);
          detailModal.show();
          this.productDetail = res.data.product;
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
    addToCart(product_id) {
      // 傳入資料格式
      // "data": {
      //   "product_id": "-L9tH8jxVb2Ka_DYPwng",
      //   "qty": 1
      // }
      // console.log(product_id, this.cart.qty);
      this.cart = { product_id, ...this.cart };

      axios
        .post(`${this.url}/api/${this.path}/cart`, { data: this.cart })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProduct();
    detailModal = new bootstrap.Modal(this.$refs.modal);
  },
}).mount("#app");
