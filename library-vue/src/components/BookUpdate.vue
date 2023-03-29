<template>
  <CustomNavbar></CustomNavbar>
  <div id="person-form" class="container">
    <form @submit.prevent="handleSubmit">
      <label>Tytuł</label>
      <input
          v-model="book.title"
          type="text"
          :class="{ 'has-error': submitting && invalidFirstName }"
          @focus="clearStatus"
          @keypress="clearStatus"
          :placeholder="savedBook.title"
      />
      <label>Liczba stron</label>
      <input
          v-model="book.pages"
          type="text"
          :class="{ 'has-error': submitting && invalidPages }"
          @focus="clearStatus"
          :placeholder="savedBook.pages"
      />
      <label>Autor</label>
      <select v-model="book.author">
        <option
            v-for="a in authors" :key="a.id"
        >
          {{ a.lastName }}
        </option>
      </select>
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">
        Dane poprawnie zapisano
      </p>
      <button class="btn btn-primary mt-3">Dodaj książkę</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import CustomNavbar from "@/components/CustomNavbar.vue";

export default {
  name: 'BookUpdate',
  components: {CustomNavbar},
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      book: {
        title: '',
        pages: '',
        author: {
          firstName: '',
          lastName: '',
        },
      },
      authors: [],
      savedBook: {},
    }
  },
  mounted() {
    this.getAuthors()
    this.getBook()
  },
  methods: {

    async getAuthors() {
      try {
        const response = await fetch('http://localhost:8080/get/authors')
        const data = await response.json()
        this.authors = data
      } catch (error) {
        console.error(error)
      }
    },

    async getBook() {
      axios.get(`http://localhost:8080/get/book/${this.bookId()}`)
          .then(response => {
            // Obsługa odpowiedzi serwera
            console.log(response.data);
            this.savedBook = response.data
          })
          .catch(error => {
            // Obsługa błędów
            console.error(error);
          })
    },

    async postData() {
      try {
        const author = this.authors.filter(obj => {
          return obj.lastName === this.book.author
        });
        const response = await axios.patch('http://localhost:8080/patch/book', {
          id: this.savedBook.id,
          title: this.book.title,
          pages: this.book.pages,
          author: author[0]
        })
        this.savedBook.title = this.book.title
        this.$router.push({ name: 'books'});
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    bookId() {
      return this.$route.params.id;
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidFirstName || this.invalidPages) {
        this.error = true
        return
      }
      this.postData()

      this.error = false
      this.success = true
      this.submitting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
  },
  computed: {
    invalidFirstName() {
      return this.book.title === ''
    },
    invalidPages() {
      return this.book.pages === ''
    },
  },
}
</script>
<style scoped>
form {
  margin-bottom: 2rem;
}

[class*='-message'] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>