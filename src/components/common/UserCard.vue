<template>
  <q-card class="bg-user-card" flat>
    <div class="user-picture">
      <q-img
        v-if="user.picture.includes('base64')"
        class="picture"
        :src="user.picture"
      />
      <q-img
        v-else
        class="picture"
        :src="`user_pictures/${user.picture}`"
        alt="Imagem do usuário"
      />
    </div>
    <div class="user-name">
        {{user.name}}
      </div>
      <div class="user-email">
        {{user.email}}
      </div>
      <div class="user-data">
        <div class="user-item">
          <div class="icon">
            <q-icon name="key" />
          </div>

          <p>
            {{user.type}}
          </p>
        </div>
        <div class="user-item">
          <div class="icon">
            <q-icon name="outlined_flag" />
          </div>

          <p>
            {{user.athletic}}
          </p>
        </div>
      </div>
  </q-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.bg-user-card {
  background: rgba($secondary, 0.5);
  width: 100%;
  padding: 35px 20px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;

  .picture {
    display: block;
    width: 103px;
    height: 103px;
    border-radius: 103px;
    margin: 0 auto;
    box-shadow: 0px 4px 100px rgba(76, 77, 118, 0.7);
  }

  .user-picture {
    margin-bottom: 24px;
  }

  .user-name {
    text-align: center;
    font-size: 18px;
    line-height: 22px;
    font-weight: $semibold;
    color: $text1;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-email {
    text-align: center;
    font-size: 14px;
    font-weight: $medium;
    color: $text2;
    margin-bottom: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-data {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
    opacity: 0.5;

    .user-item {
      color: $text2;

      .icon {
        height: 24px;
        width: 24px;
        margin: 0 auto;

        i {
          font-size: 24px;
        }
      }

      p {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        margin-top: 8px;
      }
    }
  }
}
</style>
