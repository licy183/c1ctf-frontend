import moment from 'moment'
import 'moment/locale/zh-cn'

// 使用中文时间
moment.locale('zh-cn');
let time = new class Time {
    timeToString(time) {
        let m;
        if (time instanceof Date) {
            // return time.toLocaleString(undefined, {hour12: false});
            m = moment(time);
        } else {
            m = moment(new Date(time));
            // return new Date(time).toLocaleString(undefined, {hour12: false});
        }
        return m.format('YYYY-MM-DD HH:mm:ss');
    }

};
export default time;
