<template>
  <q-card class="athletic-card" flat>
    <img
      class="absolute-top sports-bg"
      :src="`athletic_sports/${athletic.sport}.svg`"
    />
    <q-img
      class="absolute-center logo"
      :src="`athletic_logos/${athletic.logo}`"
    />
    <div :class="['ellipse', `ellipse-${athletic.color}`]" />
    <div
      class="absolute-bottom text-center name text-accent text-h4 text-weight-bolder text-uppercase"
    >
      {{ athletic.name }}
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'AthleticCard',
  props: {
    athletic: {
      type: Object,
      required: true
    }
  }
  // computed: {
  //   athleticName () {
  //     return this.athletic.name.split(' ')
  //   }
  // }
}
</script>

<style lang="scss">
.athletic-card {
  background: rgba($secondary, 0.5);
  min-height: 500px;
  // width: 170px;
  overflow: hidden;

  .sports-bg {
    width: 100%;
    max-height: 75%;
  }

  .logo {
    width: 80%;
  }

  .ellipse {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -65%);
    width: 125%;
    height: 105px;
    z-index: -1;
  }

  .ellipse-white {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #5a5a72 0%,
      rgba(35, 36, 61, 0) 100%
    );
  }

  .ellipse-blue {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(0, 142, 198, 0.3) 0%,
      rgba(35, 36, 61, 0) 100%
    );
  }

  .ellipse-yellow {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 232, 0, 0.3) 0%,
      rgba(35, 36, 61, 0) 100%
    );
  }

  .ellipse-orange {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(245, 146, 39, 0.3) 0%,
      rgba(35, 36, 61, 0) 100%
    );
  }

  .name {
    word-spacing: 9999px;
  }
}
</style>
