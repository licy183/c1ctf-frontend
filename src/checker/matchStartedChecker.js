import BaseChecker from "@/checker/baseChecker";
import match from '@/util/match'

let matchStartedChecker = new class MatchStartedChecker extends BaseChecker{
    check() {
        return this.checkByBool(match.isStarted, '比赛未开始');
    }
};

export default matchStartedChecker;
