import BaseChecker from "@/checker/baseChecker";
import login from '@/util/login'

let loginChecker = new class LoginChecker extends BaseChecker{
    check() {
        return this.checkByBool(login.isLogin, '请先登录');
    }
};

export default loginChecker;
