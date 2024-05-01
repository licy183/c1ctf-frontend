import store from "@/store";
import api from "@/util/api";
import {SET_CATEGORY} from "@/util/store-types"

let category = new class CategoryUtil{
    loadCategory(force) {
        return new Promise(async (resolve, reject) => {
            if (force === true || store.state.challenge.category == null) {
                api.get('/category/get_all_category').then((category) => {
                    store.commit(SET_CATEGORY, category);
                    resolve();
                }).catch((e) => {
                    reject(e);
                });
            } else {
                resolve();
            }
        });
    }
    commitChange(data) {
        store.commit(SET_CATEGORY, data);
    }
    getNameById(category_id) {
        if (store.state.challenge.category == null) {
            return '';
        }
        for (let c of store.state.challenge.category) {
            if (c.category_id === category_id) {
                return c.name;
            }
        }
        return '';
    }
};

export default category;
