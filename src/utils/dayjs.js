import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';

// Extend dayjs with all required plugins
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

// Set Vietnamese locale
dayjs.locale('vi');

export default dayjs;
