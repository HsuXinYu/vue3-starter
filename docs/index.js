let detailModal = "";

// console.log(VueLoading);
// console.log(VeeValidate);

// // 載入VeeValidate 規則
VeeValidate.defineRule("required", VeeValidateRules["required"]);
VeeValidate.defineRule("email", VeeValidateRules["email"]);

// // 載入多國語系
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true,
});

const app = Vue.createApp({
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
      user: {
        email: "",
        name: "",
        tel: "",
        address: "",
      },
      message: "",
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
        })
        .finally(() => {
          this.isLoading = false;
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
        })
        .catch((err) => {
          console.dir(err);
        })
        .finally(() => {
          this.isLoading = false;
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
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        })
        .finally(() => {
          this.isLoading = false;
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
          console.dir(err);
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
            this.getCart();
          })
          .catch((err) => {
            // console.dir(err);
            alert(err.data.message);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        axios
          .delete(`${this.url}/api/${this.path}/cart/${product_id}`)
          .then((res) => {
            // console.log(res.data);
            alert(res.data.message);
            this.getCart();
          })
          .catch((err) => {
            console.dir(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    updateCart(product_id, qty) {
      // console.log(product_id, qty);
      this.isLoading = true;
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
          console.dir(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    isTel(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    onSubmit() {
      // 傳入資料格式
      // "data": {
      //   "user": {
      //     "name": "test",
      //     "email": "test@gmail.com",
      //     "tel": "0912346768",
      //     "address": "kaohsiung"
      //   },
      //   "message": "這是留言"
      // }

      if (this.carts.length === 0) {
        alert("購物車內無商品!");
      } else {
        // this.isLoading = true;
        // console.log(this.user, this.message);
        const order = { user: this.user, message: this.message };
        // console.log(order);
        axios
          .post(`${this.url}/api/${this.path}/order`, { data: order })
          .then((res) => {
            // console.log(res.data);
            this.$refs.form.resetForm();
            alert(res.data.message);
            this.getCart();
          })
          .catch((err) => {
            console.dir(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
  mounted() {
    // this.isLoading = true;

    this.getProduct();
    this.getCart();

    detailModal = new bootstrap.Modal(this.$refs.modal);
  },
});

app.component("loading", VueLoading.Component);

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
