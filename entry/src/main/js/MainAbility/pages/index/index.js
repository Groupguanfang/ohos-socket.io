import { io } from '../../socket/index'

const socket = io('')

export default {
    data: {
        title: ''
    },
    onInit() {
        this.title = this.$t('strings.world');
    }
};
