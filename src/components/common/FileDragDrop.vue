<template>
  <q-field
    :value="inputVal"
    :rules="rules"
    :hide-bottom-space="hideBottomSpace"
    borderless
    no-error-icon
  >
    <template #control>
      <p v-if="label" :class="labelClass" class="q-mb-xs">
        {{ label }}
      </p>
      <q-card
        class="bg-primary drag-drop-container full-width"
        :class="disable && 'no-pointer-events disabled'"
        flat
        bordered
      >
        <q-card-section
          @drop.prevent="onDrop"
          @dragover.prevent="onDragOver"
          @dragleave="clearClasses"
          class="q-py-xl cursor-pointer"
          @click="$refs.fileInput.click()"
        >
          <input
            @change="onChange"
            v-show="false"
            id="inputFieldHandler"
            ref="fileInput"
            type="file"
            :accept="accept"
          />
          <!-- <label for="inputFieldHandler" class="block cursor-pointer"> -->
          <div class="text-center">
            <p class="text-h6 text-weight-medium">
              Arraste o arquivo aqui!
            </p>
            <p class="text-body1" v-if="!dragOver">
              Ou clique para selecionar do computador.
            </p>
          </div>
          <!-- </label> -->
        </q-card-section>
        <q-card-section v-if="inputVal" class="drag-drop-file-name row no-wrap">
          <div class="col flex items-center">
            <div class="ellipsis">
              {{ fileNameVal }}
            </div>
          </div>
          <div class="col-auto row q-gutter-x-sm">
            <q-btn
              @click="openFile"
              icon="visibility"
              v-bind="openFileButtonProps"
              size="sm"
              flat
              round
            />
            <q-btn
              @click="inputVal = null"
              icon="delete"
              size="sm"
              flat
              round
            />
          </div>
        </q-card-section>
      </q-card>
      <p
        v-if="caption"
        :class="captionClass"
        class="q-mb-xs q-mt-xs q-ml-sm text-caption"
      >
        {{ caption }}
      </p>
    </template>
  </q-field>
</template>

<script>
import { exportFile } from 'quasar'
import { checkFileType } from 'src/utils/files'
const containerClass = 'bg-primary'
const dragOverClass = 'bg-secondary'

export default {
  name: 'FileDragDrop',
  props: {
    value: [String, File, Blob],
    fileName: String,
    accept: {
      type: String,
      default: ''
    },
    rules: Array,
    lazyRules: [String, Boolean],
    label: String,
    labelClass: [String, Object, Array],
    caption: String,
    captionClass: [String, Object, Array],
    disable: Boolean,
    hideBottomSpace: Boolean
  },
  data: () => ({
    dragOver: false
  }),
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        if (!val) {
          this.$refs.fileInput.value = ''
        }
        this.$emit('input', val)
      }
    },
    fileNameVal () {
      if (this.inputVal instanceof File && 'name' in this.inputVal) {
        return this.inputVal.name
      }
      if (typeof this.inputVal === 'string') {
        return this.fileName || this.getUrlFileName()
      }
      return this.fileName
    },
    openFileButtonProps () {
      return typeof this.inputVal === 'string'
        ? {
            type: 'a',
            href: this.inputVal,
            target: '_blank',
            download: this.fileName || this.getUrlFileName()
          }
        : {}
    }
  },
  methods: {
    onChange (event) {
      const [file] = event.target.files
      if (this.checkFileType(file)) this.inputVal = file
    },
    onDrop (event) {
      const [file] = event.dataTransfer.files
      this.clearClasses(event)
      if (this.checkFileType(file)) this.inputVal = file
    },
    onDragOver (event) {
      if (!event.currentTarget.classList.contains(dragOverClass)) {
        event.currentTarget.classList.remove(containerClass)
        event.currentTarget.classList.add(dragOverClass)
        this.dragover = true
      }
    },
    clearClasses (event) {
      event.currentTarget.classList.add(containerClass)
      event.currentTarget.classList.remove(dragOverClass)
      this.dragover = false
    },
    getUrlFileName () {
      const start = this.inputVal.lastIndexOf('/') + 1
      return this.inputVal.slice(start, this.inputVal.length)
    },
    openFile () {
      if (this.inputVal instanceof File || this.inputVal instanceof Blob) {
        exportFile(
          this.inputVal.name || this.fileName,
          this.inputVal,
          this.inputVal.type
        )
      }
    },
    checkFileType (file) {
      const isValid = checkFileType(file, this.accept)
      if (!isValid) {
        this.$q.notify({
          type: 'alert',
          message: 'Formato do arquivo não suportado.'
        })
      }
      return isValid
    }
  }
}
</script>

<style lang="scss">
.drag-drop-file-name {
  padding-top: 16px !important;
}
</style>
