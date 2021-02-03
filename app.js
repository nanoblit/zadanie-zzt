import { route } from "./router";

const signIn = async (username, password) => {
  const response = await fetch("https://zwzt-zadanie.netlify.app/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  return await response.json();
}

route("/", "home", function () {
  this.error = "";
  this.$on("#form", "submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const data = await signIn(username, password);

    if (data.error) {
      this.error = data.message;
      this.$refresh();
    } else {
      window.location.href = "#/success";
      localStorage.setItem("token", data.token);
    }
  });
});

route("/success", "success", function () {});

route("/ex1", "example1", function () {
  this.title = "Example 1";
});

route("/ex2", "example2", function () {
  this.title = "Example 2";
  this.counter = 0;
  this.$on(".my-button", "click", () => {
    this.counter += 1;
    this.$refresh();
  });
});

route("*", "404", function () {});
