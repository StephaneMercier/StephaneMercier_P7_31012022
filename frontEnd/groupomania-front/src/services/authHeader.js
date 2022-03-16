export default function authHeaders() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token && token.token) {
    return { Authorization: "Bearer " + token.token };
  } else {
    return false;
  }
}
