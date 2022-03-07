// import { createStore } from "vuex";
// const axios = require("axios").default;
// const instance = axios.create({
//   baseURL: "http://localhost:3000/",
// });

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {
//     createAccount: ({ commit }, userInfos) => {
//       commit;
//       console.log(userInfos);
//       instance
//         .post("/signup", userInfos)
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
// try {
//   const res = await instance.post("/signup", userInfos);
//   console.log(res);
// } catch (e) {
//   console.log(e);
// }
// },
// loginAccount: ({ commit }, userLog) => {
//   commit;
//   instance
//     .post("/login", userLog)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// try {
//   const res = await instance.post("/login", userLog);
//   console.log(res);
// } catch (e) {
//   console.log(e);
// }
//     },
//   },
// });
