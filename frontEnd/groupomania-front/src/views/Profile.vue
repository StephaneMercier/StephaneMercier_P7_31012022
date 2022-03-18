<template>
  <div class="container">
    <div class="container-header-post">
      <div class="profile-header">
        <h1>Mon Compte</h1>
        <h2 class="profile-title">{{ name }} {{ lastName }}</h2>
        <a class="btn btn-secondary" href="/admin">Page Administrateur</a>
        <button class="btn btn-delete" @click="deleteUserProfile">
          Supprimer mon compte
        </button>
      </div>
      <br />
      <div class="container-post">
        <h3>Mes Publications :</h3>
        <p class="h3-subtitle">
          (Cliquez sur le titre pour voir la publication)
        </p>
        <div v-for="post in posts" :key="post.id" class="post-info">
          <a :href="`/post/${post.id}`" class="post-title__link">{{
            post.title
          }}</a>
          <div class="post-buttons">
            <a :href="`/post/edit/${post.id}`" class="btn btn-secondary"
              >Modifier</a
            >
            <button class="btn btn-danger" @click="deletePost(post.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="post-creation">
      <h3 class="post-creation__info">Créer une publication :</h3>
      <label for="title" class="title-label">Titre</label>
      <textarea
        id="textarea"
        v-model="title"
        rows="1"
        maxlength="30"
      ></textarea>
      <label for="post" class="post-label">Contenu</label>
      <textarea
        id="textarea"
        v-model="body"
        placeholder="Quelque chose à partager ?"
        rows="6"
        size="large"
        maxlength="255"
      ></textarea>
      <button @click="createPost()" class="btn btn-secondary">Publier</button>
    </div>
  </div>
</template>

<script>
import userService from "../services/userService";
import postService from "../services/postService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      lastName: "",
      isAdmin: false,
      posts: [],
      title: "",
      body: "",
    };
  },
  methods: {
    getUser() {
      let token = localStorage.getItem("token");
      const { id } = JSON.parse(token);
      userService.getUser(id).then((response) => {
        this.name = response.data.userFound.name;
        this.lastName = response.data.userFound.lastName;
        this.isAdmin = response.data.userFound.isAdmin;
      });
    },
    async getUserPost() {
      let token = localStorage.getItem("token");
      const { id } = JSON.parse(token);
      await userService.getUserPost(id).then((response) => {
        console.log(response.data);
        this.posts = response.data.userPosts;
      });
    },
    createPost() {
      postService.createPost(this.title, this.body).then((response) => {
        console.log(response.data);
        this.getUserPost();
        this.title = "";
        this.body = "";
      });
    },
    async deletePost(id) {
      await postService.deletePost(id).then(() => {
        this.getUserPost();
      });
    },
    deleteUserProfile() {
      Swal.fire({
        title: "Voulez-vous vraiment supprimer votre compte?",
        showCancelButton: true,
        confirmButtonText: "Oui je le veux",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.isConfirmed) {
          userService.deleteUser().then(() => {
            localStorage.removeItem("token");
            this.$router.push("/register");
          });
        }
      });
    },
  },
  async mounted() {
    await this.getUser();
    await this.getUserPost();
  },
};
</script>

<style lang="scss" scoped>
/* // Small screens */
@media only screen and (max-width: 768.02px) {
  .container {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container-header-post {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }
  .profile-header {
    border: 2px solid #d3545c;
    border-radius: 20px;
    padding: 0.8rem;
  }
  h1 {
    margin: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 5px solid #d3545c;
  }
  .profile-title {
    color: #d3545c;
    margin: 2rem 0 2rem 0;
  }
  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.4rem;
  }
  .post-buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .post-title__link {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    font-size: larger;
    white-space: wrap;
    overflow: hidden;
  }
  .post-creation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 2rem 0;
    padding-top: 2.5rem;
    border: 2px solid #d3545c;
    border-radius: 20px;
    height: 50vh;
    &__info {
      border-bottom: 1px solid #d3545c;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  #textarea {
    width: 15rem;
    border: 1px solid #2f3542;
    border-radius: 20px;
    padding: 0.5rem;
  }
  .btn {
    border-radius: 20px;
    padding: 0.4rem;
    font-weight: bold;
    &.btn-secondary {
      margin: 0.5rem;
    }
    &.btn-delete {
      border: 1px solid #d3545c;
      background-color: #d3545c;
      color: #fff;
    }
    &.btn-info {
      color: white;
      background-color: #2f3542;
      border: 1px solid #2f3542;
      margin-right: 0.8rem;
    }
  }
}
/* // Desktops */
@media only screen and (min-width: 768.98px) {
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    min-height: 100vh;
    display: flex;
  }
  .profile-header {
    border: 2px solid #d3545c;
    border-radius: 20px;
    min-height: 50vh;
    padding: 0.8rem;
  }
  h1 {
    margin-top: 2rem;
    border-bottom: 1px solid #d3545c;
  }
  h3 {
    font-size: large;
    margin-bottom: 0.8rem;
  }
  .profile-title {
    color: #d3545c;
    margin: 2rem 0 2rem 0;
  }
  .container-post {
    border: 2px solid #d3545c;
    width: 200%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
    padding: 0.5rem;
    border-radius: 20px;
    min-height: 25vh;
    white-space: wrap;
    overflow: hidden;
  }
  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.4rem;
  }
  .post-buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .post-title__link {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    font-size: larger;
    border-bottom: 1px solid #d3545c;
    white-space: nowrap;
    &:hover {
      color: #d3545c;
    }
  }
  .container-header-post {
    width: 30%;
  }
  .post-creation {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 4rem;
    padding-top: 2.5rem;
    border: 2px solid #d3545c;
    border-radius: 20px;
    height: 50vh;
    &__info {
      border-bottom: 1px solid #d3545c;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  #textarea {
    width: 25rem;
    border: 1px solid #2f3542;
    border-radius: 20px;
    padding: 0.5rem;
  }

  .btn {
    border-radius: 20px;
    padding: 0.4rem;
    font-weight: bold;
    &.btn-secondary {
      margin: 0.5rem;
    }
    &.btn-delete {
      border: 1px solid #d3545c;
      background-color: #d3545c;
      color: #fff;
    }
    &.btn-info {
      color: white;
      background-color: #2f3542;
      border: 1px solid #2f3542;
      margin-right: 0.8rem;
    }
  }
}
</style>
