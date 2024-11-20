import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInYears,
} from "date-fns";

// Hàm tính toán sự chênh lệch thời gian
export const calculateTimeDifference = (dateEnd) => {
    const now = new Date();
    const end = new Date(dateEnd);

    return {
        years: differenceInYears(now, end),
        months: differenceInMonths(now, end),
        days: differenceInDays(now, end),
        hours: differenceInHours(now, end),
        minutes: differenceInMinutes(now, end),
        seconds: differenceInSeconds(now, end),
    };
};


export const formatTimeAgo = (dateEnd) => {
    const { years, months, days, hours, minutes, seconds } = calculateTimeDifference(dateEnd);
    if (seconds < 60) {
        return seconds + " giây trước";
    } else if (minutes < 60) {
        return minutes + " phút trước";
    } else if (hours < 24) {
        return hours + " tiếng trước";
    } else if (days < 30) {
        return days + " ngày trước";
    } else if (months < 12) {
        return months + " tháng trước";
    } else {
        return years + " năm trước";
    }
};

