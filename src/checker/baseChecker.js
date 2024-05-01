let BaseChecker = class BaseChecker {
    constructor() {
        this.result = { status: false, msg: ''};
    }

    checkByBool(status, msg) {
        this.result.status = status;
        if (status === false) {
            this.result.msg = msg;
        }
        return this.result;
    }
    // 不知道为什么这么玄学，找不到store
    // setStore(store) {
    //     this.store = store;
    // }
};

export default BaseChecker;
