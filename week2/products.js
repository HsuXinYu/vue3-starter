// 具名引用
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//Options API
createApp({
  data() {
    return {
      //API path
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "lucky_herb_spices",
      // 產品資料格式
      products: [],
      productDetail: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
          window.location.replace("login.html");
        });
    },
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((res) => {
          // console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
        });
    },
    checkProduct(item) {
      // let id = e.target.value;
      // console.log(this.productDetail);
      // console.log(this.products.filter((item) => item.id === id));
      // this.productDetail = this.products.filter((item) => item.id === id);
      this.productDetail = item;
      // console.log(this.productDetail);
    },
  },
  mounted() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    // console.log(document.cookie, token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();
    this.getProduct();
  },
}).mount("#app");
