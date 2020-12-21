<template>
    <v-dialog
        v-model="visible"
        width="60%"
        overlay-opacity="0.6"
        persistent
    >
        <div class="loading">
            <v-progress-circular
                indeterminate
                color="#0088c6"
                size="100"
                width="10"
            />
            <p>
                <!-- 사용자정보를 불러오고 있습니다 -->
                {{ message }}
            </p>
        </div>
    </v-dialog>
</template>


<script>
import ModalMixin from '@/mixins/modal';

export default {
  name: 'ProgressModal',
  props: {
      message: String,
  },
  mixins: [ModalMixin],
}
</script>

<style lang="scss" scoped>

.loading{
    background:rgba(0,0,0,0.8);
    padding:50px;
    text-align:center;
    overflow: hidden;
    border-radius:15px;

    p{
        margin:0px;padding:0px;
        margin-top:45px;
        font-size:30px;
        font-weight:400;
        font-family:'NotoSansKR';
        color:#fff;
    }
}

</style>