import api from '@/util/api'

const ContainerApi = {
    get(challenge_id) {
        return api.post('/container/get_container',{challenge_id: challenge_id});
    },
    alloc(challenge_id) {
        return api.post('/container/alloc_container',{challenge_id: challenge_id})
    },
    renew(challenge_id) {
        return api.post('/container/renew_container',{challenge_id: challenge_id})

    },
    free(challenge_id) {
        return api.post('/container/free_container',{challenge_id: challenge_id})
    },
    list() {
        return api.get('/container/list_container')
        /* {is_created: '',host: 'xxx', port: 123, expire: 1574840700000} */
    },

}

export default ContainerApi;
