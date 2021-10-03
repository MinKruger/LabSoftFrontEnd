<template>
  <q-page class="flex flex-center" padding>
    <auth-card style="width: 400px">
      <q-form @submit.prevent="changePassword">
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
            :loading="recoverLoading"
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
    code: '',
    user: { ...defaultUser },
    recoverLoading: false
  }),
  methods: {
    async changePassword () {
      try {
        this.recoverLoading = true
        // TODO: ver rota correta no backend
        await this.$axios.post('recover-password', {
          code: this.code,
          ...this.user
        })
        this.$q.notify({
          type: 'positive',
          message: 'Sua senha foi alterada com sucesso'
        })
        await this.$router.push({ name: 'Login' })
      } finally {
        this.recoverLoading = false
      }
    },
    // Rules
    required
  }
}
</script>
