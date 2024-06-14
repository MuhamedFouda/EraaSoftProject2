export default function HomePage() {
  function logout() {
    axios
      .post(
        Domain.base + "/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer 6|jB1jOpueKqQOxwJhLRUBYOkZ1Le4n4JJvGFx8mBL35564100",
          },
        }
      )
      .then((res) => {
        //email found in our sys. Invoke to login
        console.log(res.data.data);
        toast.success(res.data.message, { theme: "dark" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Welcome to EraaSoft community</h1>
      <button>Logout</button>
    </div>
  );
}
