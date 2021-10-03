<template>
  <q-page class="flex flex-center" padding>
    <auth-card style="width: 400px">
      <q-form @submit.prevent="attemptLogin">
        <q-card-section class="text-center">
          <q-img src="logo.png" width="50%" />
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <form-field
            v-model="user.email"
            label="E-mail"
            placeholder="email@email.com"
            type="email"
            :rules="[required, validEmail]"
          />
          <form-field
            v-model="user.password"
            label="Senha"
            placeholder="********"
            type="password"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-actions align="center" class="q-py-lg" vertical>
          <q-btn
            type="submit"
            color="blue"
            label="Fazer Login"
            padding="sm xl"
            class="text-weight-bold"
            :loading="loginLoading"
          />
          <q-btn
            :to="{ name: 'ForgotPassword' }"
            color="white"
            label="Esqueci a Senha"
            padding="sm md"
            class="text-weight-bold"
            flat
          />
        </q-card-actions>
      </q-form>
    </auth-card>
  </q-page>
</template>

<script>
import AuthCard from 'components/common/AuthCard.vue'
import { required, validEmail } from 'src/utils/rules'

const defaultUser = {
  email: '',
  password: ''
}

export default {
  components: { AuthCard },
  name: 'Login',
  data: () => ({
    user: { ...defaultUser },
    loginLoading: false
  }),
  methods: {
    async attemptLogin () {
      try {
        this.loginLoading = true
        await this.$store.dispatch('auth/attemptLogin', this.user)
        this.$q.notify({
          type: 'positive',
          message: 'Login realizado com sucesso'
        })
      } finally {
        this.loginLoading = false
      }
    },
    // Rules
    required,
    validEmail
  }
}
</script>
