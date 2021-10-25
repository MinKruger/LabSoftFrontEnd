<template>
  <q-page class="flex flex-center" padding>
    <auth-card style="width: 400px">
      <q-form @submit.prevent="attemptSignUp">
        <q-card-section class="text-center">
          <q-img src="logo.png" width="50%" />
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <profile-picture-upload v-model="user.foto" />
          <form-field
            v-model="user.email"
            label="E-mail"
            placeholder="email@email.com"
            type="email"
            :rules="[required, validEmail]"
          />
          <form-field
            v-model="user.nome"
            label="Nome"
            placeholder="Fulano"
            :rules="[required]"
          />
          <form-field
            v-model="user.instagram"
            label="Instagram"
            placeholder="@fulano"
          />
          <form-field
            v-model="user.senha"
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
            label="Registrar-se"
            padding="sm xl"
            class="text-weight-bold"
            :loading="signupLoading"
          />
          <q-btn
            :to="{ name: 'Login' }"
            color="white"
            label="Voltar ao Login"
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
import ProfilePictureUpload from 'src/components/common/ProfilePictureUpload.vue'

const defaultUser = {
  email: '',
  senha: '',
  nome: '',
  foto: '',
  instagram: ''
}

export default {
  components: { AuthCard, ProfilePictureUpload },
  name: 'Signup',
  data: () => ({
    user: { ...defaultUser },
    signupLoading: false
  }),
  methods: {
    async attemptSignUp () {
      try {
        this.signupLoading = true
        const user = {
          ...this.user,
          foto: this.user.foto
            ? this.user.foto.replace(/^data:.+;base64,/, '')
            : null
        }

        const { data } = await this.$axios.post('auth/register', user)
        localStorage.setItem('access_token', data.token)

        this.$q.notify({
          type: 'positive',
          message: 'Registro realizado com sucesso'
        })
        await this.$router.push({ name: 'Login' })
      } finally {
        this.signupLoading = false
      }
    },
    // Rules
    required,
    validEmail
  }
}
</script>
