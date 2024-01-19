// 具名引用
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let delModal = "";
let postModal = "";

//Options API
createApp({
  data() {
    return {
      //API path
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "lucky_herb_spices",
      products: [],
      //產品資料結構
      // data: {
      //   title: "[賣]動物園造型衣服3",
      //   category: "衣服2",
      //   origin_price: 100,
      //   price: 300,
      //   unit: "個",
      //   description: "Sit down please 名設計師設計",
      //   content: "這是內容",
      //   is_enabled: 1,
      //   imageUrl: "主圖網址",
      //   imagesUrl: [
      //     "圖片網址一",
      //     "圖片網址二",
      //     "圖片網址三",
      //     "圖片網址四",
      //     "圖片網址五",
      //   ],
      // },
      tempProduct: {
        imagesUrl: [],
      },
      tempImage: "",
      event: "",
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
    showModal(event, product) {
      // console.log(event);
      this.event = event;
      if (event == "del") {
        delModal.show();
        this.tempProduct = product;
        // console.log(this.tempProduct);
      } else if (event == "post") {
        this.tempProduct = {
          imagesUrl: [],
        };
        postModal.show();
      } else if (event == "edit") {
        postModal.show();
        this.tempProduct = { ...product };
        // console.log(this.tempProduct);
      }
    },
    postProduct(product) {
      // console.log(product);
      axios
        .post(`${this.url}/api/${this.path}/admin/product`, { data: product })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          postModal.hide();
          this.getProduct();
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
    addImage() {
      if (this.tempImage === "") {
        alert("請輸入圖片網址");
      } else if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = this.tempImage;
      } else {
        this.tempProduct.imagesUrl.push(this.tempImage);
      }
    },
    removeImage() {
      if (this.tempProduct.imagesUrl.length != 0) {
        this.tempProduct.imagesUrl.pop();
      } else {
        this.tempProduct.imageUrl = "";
      }
    },
    deleteProduct() {
      const productId = this.tempProduct.id;
      // console.log(productId);
      axios
        .delete(`${this.url}/api/${this.path}/admin/product/${productId}`)
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          delModal.hide();
          this.getProduct();
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
    editProduct() {
      const productId = this.tempProduct.id;
      let product = { ...this.tempProduct };

      axios
        .put(`${this.url}/api/${this.path}/admin/product/${productId}`, {
          data: product,
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          postModal.hide();
          this.getProduct();
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message);
        });
    },
  },
  mounted() {
    //取得token並檢查用戶資料是否正確
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    // console.log(document.cookie, token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();

    //取得所有產品
    this.getProduct();

    //建立modal實體
    delModal = new bootstrap.Modal("#delProductModal");
    postModal = new bootstrap.Modal("#productModal");
  },
}).mount("#app");
