import store from '@/store';

let match = new class Match {
    get isStarted() {
        return new Date().getTime() > store.state.config.beginTime;
    }
    get isOpen() {
        return this.isStarted && !this.isEnded;
    }
    get isEnded() {
        return new Date().getTime() > store.state.config.endTime;
    }
    get remainTime() {
        let remainTime;
        let now = new Date().getTime();
        if (now < store.state.config.beginTime) {
            remainTime = store.state.config.beginTime - now;
        } else if (now > store.state.config.endTime) {
            remainTime = now - store.state.config.endTime;
        } else {
            remainTime = store.state.config.endTime - now;
        }
        return remainTime;
    }
};

export default match;
