<template>
  <v-app>
    <v-main>
      <v-container class="authorization">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card>
              <v-card-title class="title text-h5">LeadHit</v-card-title>
              <v-card-text>
                <v-form ref="formRef" @submit.prevent="authorize" v-model="valid">
                  <v-text-field
                    v-model="siteId"
                    label="ID сайта"
                    hint="Должен содержать 24 символа"
                    autofocus
                    dark
                    solo
                    flat
                    :rules="[v => !!v || 'ID сайта обязателен', v => (v && v.length === 24) || 'ID сайта должен содержать 24 символа']"
                    @input="errorMessage = ''"
                  ></v-text-field>
                  <v-btn class="authBtn" color="primary" type="submit">Войти</v-btn>
                  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthPage',
  data() {
    return {
      siteId: '',
      errorMessage: '',
      valid: true // Переменная для отслеживания валидности формы
    };
  },
  methods: {
    authorize() {
      if (!this.valid) return; // Если форма не валидна, прерываем выполнение метода

      axios.get('https://track-api.leadhit.io/client/test_auth', {
        headers: {
          'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          // Поставил значение хард кодом, можно динамично изменять с помощью siteId введеных данных, но как я понял тут и в localStorage нужно поставить просто статикой
          'Leadhit-Site-Id': '5f8475902b0be670555f1bb3'
        }
      })
      .then(response => {
        if (response.data.message === 'ok') {
          localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
          this.$router.push('/analytics');
        } else {
          this.errorMessage = 'Ошибка входа';
        }
      })
      .catch(error => {
        console.error('Ошибка HTTP запроса:', error);
        this.errorMessage = 'Ошибка входа';
      });
    }
  }
};
</script>

<style scoped>
.authorization {
  text-align: center;
}

.error {
  color: red;
}

.authBtn {
  margin-top: 8px;
}

.title {
  color: rgba(24, 103, 192, 1);
}
</style>