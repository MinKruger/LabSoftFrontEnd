<template>
  <q-card class="bg-match-card" flat>
    <div class="champ">
      <span class="name">
        Campeonato Dale
      </span>
      <div class="label">
        Futsal
      </div>
    </div>
    <div class="score">
      <div class="athletic">
        <picture>
          <img :src="athleticPicture(match.id_time1)" :alt="athleticName(match.id_time1)">
        </picture>
        <div class="name">
          {{athleticName(match.id_time1)}}
        </div>
      </div>
      <div class="number">
        {{match.placar1}} - {{match.placar2}}
      </div>
      <div class="athletic">
        <picture>
          <img :src="athleticPicture(match.id_time2)" :alt="athleticName(match.id_time2)">
        </picture>
        <div class="name">
          {{athleticName(match.id_time2)}}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'MatchCard',
  props: {
    athletics: Array,
    championships: Array,
    match: {
      type: Object,
      required: true
    }
  },
  methods: {
    athleticName (athleticId) {
      return this.athletics.find(e => e.id === athleticId)?.nome || ''
    },
    athleticPicture (athleticId) {
      return `http://${this.athletics.find(e => e.id === athleticId)?.logo}` || ''
    }
  }
}
</script>

<style lang="scss">
.bg-match-card {
  background: rgba($secondary, 0.5);
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .champ {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .name {
      font-size: 12px;
      font-weight: 700;
      color: $text1;
    }

    .label {
      font-size: 10px;
      line-height: 10px;
      font-weight: 800;
      text-transform: uppercase;
      background: #3DA347;
      border-radius: 3px;
      text-transform: uppercase;
      padding: 2px 4px;
    }
  }

  .score {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 70px minmax(0, 1fr);
    gap: 8px;

    .athletic {
      picture {
        width: 100%;
        height: 100px;
        display: block;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
        }
      }

      .name {
        font-size: 12px;
        font-weight: 700;
        color: $text1;
        text-transform: uppercase;
        text-align: center;
      }
    }

    .number {
      font-size: 16px;
      font-weight: 600;
      color: $text2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
