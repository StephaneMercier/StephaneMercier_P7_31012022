<template>
  <div class="container">
    <h1>
      Bienvenue sur votre Réseau Social Groupomania: {{ name }} {{ lastName }}
    </h1>
    <div class="profile-card"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      lastName: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
