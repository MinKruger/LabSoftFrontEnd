<template>
  <q-page class="flex flex-center" padding>
    <auth-card style="width: 400px">
      <q-form @submit.prevent="getCode">
        <q-card-section
          class="text-center relative-position text-body1 text-weight-medium text-uppercase"
        >
          <div class="absolute-left q-pa-sm">
            <q-btn
              :to="{ name: 'ForgotPassword' }"
              icon="arrow_back"
              flat
              round
            />
          </div>
          Alterar Senha
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <form-field
            v-model="code"
            label="Código"
            placeholder="ABCXYZ"
            :rules="[required]"
          />
          <form-field
            v-model="user.password"
            label="Nova Senha"
            placeholder="********"
            type="password"
            :rules="[required]"
          />
          <form-field
            v-model="user.password_confirmation"
            label="Confirme a nova Senha"
            placeholder="********"
            type="password"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-actions align="center" class="q-py-lg" vertical>
          <q-btn
            type="submit"
            color="blue"
            label="Alterar"
            padding="sm xl"
            class="text-weight-bold"
          />
        </q-card-actions>
      </q-form>
    </auth-card>
  </q-page>
</template>

<script>
import AuthCard from 'components/common/AuthCard.vue'
import { required } from 'src/utils/rules'

const defaultUser = {
  password: '',
  password_confirmation: ''
}

export default {
  components: { AuthCard },
  name: 'Login',
  data: () => ({
    email: '',
    user: { ...defaultUser }
  }),
  methods: {
    async getCode () {
      await this.$axios.post('forgot-password', { email: this.email })
      this.$q.notify({
        type: 'positive',
        message: 'O código para recuperação foi enviado para seu e-mail'
      })
    },
    // Rules
    required
  }
}
</script>
