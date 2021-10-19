<template>
  <q-card class="athletic-card" flat>
    <img
      class="absolute-top sports-bg"
      :src="`athletic_sports/basketball.svg`"
      alt="Fundo Atlética"
    />
    <q-img
      v-if="athletic.logo"
      class="absolute-center logo"
      :src="`http://${athletic.logo}`"
    />
    <div :class="['ellipse', 'ellipse-white']" />
    <div
      class="absolute-bottom text-center name text-accent text-h4 text-weight-bolder text-uppercase"
    >
    <span>
      {{ athletic.nome }}
    </span>
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
}
</script>

<style lang="scss">
.athletic-card {
  background: #1F2036;
  min-height: 500px;
  // width: 170px;
  overflow: hidden;
  transition: all 0.5s;
  border-radius: 10px;

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

  @keyframes aitf {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .name {
    word-spacing: 9999px;
    line-height: 28px;

    span {
      letter-spacing: 0;
      display: block;
      margin: 0 auto;
    }
  }

  &:hover {
    transform: scale(1.1);
    z-index: 1;
    .name {
      span {
        background: url(https://i.ibb.co/RDTnNrT/animated-text-fill.png) repeat-y;
        -webkit-background-clip: text;
        background-clip: text;

        -webkit-text-fill-color: transparent;
        animation: aitf 80s linear infinite;

        transform: translate3d(0,0,0);
        backface-visibility: hidden;
      }
    }
  }
}
</style>
