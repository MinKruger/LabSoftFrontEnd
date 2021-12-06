<template>
  <q-card class="bg-match-card" flat>
    <div class="champ">
      <div class="name">
        {{championshipName(match)}} ({{phaseName(match)}})
      </div>
      <div class="label-date">
        <div class="label" :class="color(match)">
          {{modalityName(match)}}
        </div>
        <div class="date">
          {{match.data_jogo}} - {{match.hora_jogo}}
        </div>
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
import { modalityColors } from 'src/constants/championships'
export default {
  name: 'MatchCard',
  props: {
    athletics: Array,
    championships: Array,
    phases: Array,
    match: {
      type: Object,
      required: true
    }
  },
  methods: {
    color (match) {
      const championship = this.championships.find(e => e.id === match.id_campeonato)

      const color = modalityColors[championship?.modalidade?.nome]

      return `bg-${color}` || ''
    },
    phaseName (match) {
      const phase = this.phases?.find(e => e.id === match.id_fase)

      return phase?.nome
    },
    championshipName (match) {
      const championship = this.championships.find(e => e.id === match.id_campeonato)

      return championship?.nome
    },
    modalityName (match) {
      const championship = this.championships.find(e => e.id === match.id_campeonato)

      return championship?.modalidade.nome
    },
    athleticName (athleticId) {
      return this.athletics.find(e => e.id === athleticId)?.nome || ''
    },
    athleticPicture (athleticId) {
      return `${this.athletics.find(e => e.id === athleticId)?.logo}` || ''
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
    margin-bottom: 14px;

    .name {
      font-size: 12px;
      font-weight: 700;
      color: $text1;
      margin-bottom: 4px;
    }

    .label-date {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
      width: fit-content;
      margin-right: 4px;
      margin-bottom: 4px;
    }

    .date {
      font-size: 11px;
      font-weight: 600;
      color: $text2;
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
        margin-bottom: 8px;

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
