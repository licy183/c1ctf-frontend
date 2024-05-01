import BaseChecker from "@/checker/baseChecker";
import match from '@/util/match'

let matchOpenChecker = new class MatchOpenChecker extends BaseChecker{
    check() {
        return this.checkByBool(match.isOpen, '现在不可以答题');
    }
};

export default matchOpenChecker;
