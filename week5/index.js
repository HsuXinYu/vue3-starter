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
      carts: [],
      total: 0,
      final_total: 0,
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const loader = this.$loading.show();
      axios
        .get(`${this.url}/api/${this.path}/products`)
        .then((res) => {
          // console.log(res.data);
          this.pagination = res.data.pagination;
          this.products = res.data.products;
          loader.hide();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    getProductDetail(product_id) {
      // console.log(product_id);
      this.isLoading = true;

      axios
        .get(`${this.url}/api/${this.path}/product/${product_id}`)
        .then((res) => {
          // console.log(res.data);
          detailModal.show();
          this.productDetail = res.data.product;
          this.isLoading = false;
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    addToCart(product_id) {
      // 傳入資料格式
      // "data": {
      //   "product_id": "-L9tH8jxVb2Ka_DYPwng",
      //   "qty": 1
      // }

      // console.log(product_id, this.cart.qty);
      this.isLoading = true;
      const cart = { product_id, ...this.cart };
      axios
        .post(`${this.url}/api/${this.path}/cart`, { data: cart })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.isLoading = false;
          this.getCart();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    getCart() {
      axios
        .get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          // console.log(res.data.data);
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    removeFromCart(product_id) {
      // console.log(product_id);
      this.isLoading = true;
      if (product_id === "all") {
        axios
          .delete(`${this.url}/api/${this.path}/carts`)
          .then((res) => {
            alert(res.data.message);
            this.isLoading = false;
            this.getCart();
          })
          .catch((err) => {
            // console.dir(err);
            alert(err.data.message);
            this.isLoading = false;
          });
      } else {
        axios
          .delete(`${this.url}/api/${this.path}/cart/${product_id}`)
          .then((res) => {
            // console.log(res.data);
            alert(res.data.message);
            this.isLoading = false;
            this.getCart();
          })
          .catch((err) => {
            // console.dir(err);
          });
      }
    },
    updateCart(product_id, qty) {
      // console.log(product_id, qty);
      const cart = { product_id, qty };
      axios
        .put(`${this.url}/api/${this.path}/cart/${product_id}`, {
          data: cart,
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
  },

  mounted() {
    this.getProduct();
    this.getCart();

    detailModal = new bootstrap.Modal(this.$refs.modal);
  },
});

// console.log(VueLoading);
app.use(VueLoading.LoadingPlugin);
app.component("loading", VueLoading.Component);

app.mount("#app");
