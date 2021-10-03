<template>
  <q-page class="flex flex-center" padding>
    <auth-card style="width: 400px">
      <q-form @submit.prevent="getCode">
        <q-card-section
          class="text-center relative-position text-body1 text-weight-medium text-uppercase"
        >
          <div class="absolute-left q-pa-sm">
            <q-btn :to="{ name: 'Login' }" icon="arrow_back" flat round />
          </div>
          Esqueci a Senha
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <form-field
            v-model="email"
            label="E-mail"
            placeholder="email@email.com"
            type="email"
            :rules="[required, validEmail]"
          />
        </q-card-section>
        <q-card-actions align="center" class="q-py-lg" vertical>
          <q-btn
            type="submit"
            color="blue"
            label="Obter Código"
            padding="sm xl"
            class="text-weight-bold"
            :loading="codeLoading"
          />
          <q-btn
            :to="{ name: 'RecoverPassword' }"
            color="white"
            label="Já tenho um Código"
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

export default {
  components: { AuthCard },
  name: 'Login',
  data: () => ({
    email: '',
    codeLoading: false
  }),
  methods: {
    async getCode () {
      try {
        this.codeLoading = true
        // TODO: ver rota correta no backend
        await this.$axios.post('forgot-password', { email: this.email })
        this.$q.notify({
          type: 'positive',
          message: 'O código para recuperação foi enviado para seu e-mail'
        })
        await this.$router.push({ name: 'RecoverPassword' })
      } finally {
        this.codeLoading = false
      }
    },
    // Rules
    required,
    validEmail
  }
}
</script>
