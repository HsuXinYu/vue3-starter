const url = "https://vue3-course-api.hexschool.io/v2"; // 請加入站點
const path = "lucky_herb_spices"; // 請加入個人 API Path

let emailInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", (e) => {
  //   console.log(emailInput.value);

  let username = emailInput.value;
  let password = passwordInput.value;
  let user = { username, password };

  axios
    .post(`${url}/admin/signin`, user)
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
});
