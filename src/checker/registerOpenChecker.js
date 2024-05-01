import BaseChecker from "@/checker/baseChecker";
import store from "@/store";

let matchOpenChecker = new class MatchOpenChecker extends BaseChecker{
    check() {
        return this.checkByBool(store.state.config.isRegisterOpen, '注册功能已关闭');
    }
};

export default matchOpenChecker;
