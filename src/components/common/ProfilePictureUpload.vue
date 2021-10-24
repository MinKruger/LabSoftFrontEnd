<template>
  <div class="text-center">
    <q-avatar
      @drop.prevent="onDrop"
      @dragover.prevent
      @click="$refs.profilePictureInput.click()"
      :icon="avatarIcon"
      :size="avatarSize"
      color="secondary"
      :class="
        disable
          ? 'cursor-not-allowed no-pointer-events'
          : 'cursor-pointer change-profile-picture'
      "
      text-color="grey-5"
    >
      <div
        class="absolute fit flex flex-center change-profile-picture-display"
      />
      <q-img
        v-if="profilePicturePreview"
        :src="profilePicturePreview"
        class="change-profile-picture"
      />
    </q-avatar>
    <input
      ref="profilePictureInput"
      v-if="!resetInput"
      v-show="false"
      @change="onFileInput"
      :accept="acceptedImageFileTypes"
      type="file"
    />
  </div>
</template>

<script>
import { checkFileType, getFileBase64, getSizeInBytes } from 'src/utils/files'
import { format } from 'quasar'

// Essa constante pode ser tanto um número quanto uma string indicando o tamanho (verificar função getSizeInBytes)
const MAX_PROFILE_PICTURE_SIZE = '3 MB'
const acceptedImageFileTypes = ['image/jpeg', 'image/webp', 'image/png']

export default {
  name: 'ProfilePictureUpload',
  props: {
    value: {
      type: [String, Blob]
    },
    avatarSize: {
      type: String,
      default: '200px'
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    resetInput: false,
    uploadedPicture: null,
    acceptedImageFileTypes: acceptedImageFileTypes.join(',')
  }),
  computed: {
    profilePicturePreview () {
      return this.value
    },
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    avatarIcon () {
      return this.profilePicturePreview ? undefined : 'person'
    }
  },
  methods: {
    onDrop (event) {
      const [file] = event.dataTransfer.files
      if (file) this.uploadFile(file)
    },
    onFileInput (event) {
      const [file] = event.target.files
      if (file) this.uploadFile(file)
    },
    async uploadFile (file) {
      if (!checkFileType(file, this.acceptedImageFileTypes)) {
        return this.$q.notify({
          type: 'alert',
          message: 'Formato do arquivo não suportado.'
        })
      }
      const maxProfilePictureSize = getSizeInBytes(MAX_PROFILE_PICTURE_SIZE)

      if (file.size > maxProfilePictureSize) {
        return this.$q.notify({
          color: 'grey-8',
          textColor: 'white',
          message: `Arquivo muito grande. Tamanho máximo aceito: ${format.humanStorageSize(
            maxProfilePictureSize
          )}`
        })
      }

      this.inputVal = await getFileBase64(file)

      this.resetInput = true
      await this.$nextTick()
      this.resetInput = false
    }
  }
}
</script>
<style lang="scss" scoped>
.change-profile-picture:hover .change-profile-picture-display {
  visibility: visible;
  opacity: 1;
}

.change-profile-picture-display {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.4s;
  background-color: rgba($secondary, 0.6);
  border-radius: 50%;
  z-index: 100;
}

.change-profile-picture-display:after {
  font-size: 12px;
  text-decoration: underline;
  content: 'Alterar Imagem';
}
</style>
