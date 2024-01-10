// 具名引用
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//Options API
createApp({
  data() {
    return {
      //API path
      url: "https://vue3-course-api.hexschool.io/v2", // 請加入站點
      path: "lucky_herb_spices", // 請加入個人 API Path
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // console.log(this.username, this.password);
      let username = this.username;
      let password = this.password;
      let user = { username, password };

      axios
        .post(`${this.url}/admin/signin`, user)
        .then((res) => {
          // console.log(res);
          const { token, expired } = res.data;
          // console.log(token, expired);
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          window.location.replace("products.html");
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
        });
    },
  },
}).mount("#app");
