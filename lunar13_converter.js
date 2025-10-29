/**
 * 13月亮历转换器 - 纯 JavaScript 实现
 * 将公历日期转换为 13 月亮历日期和 PSI
 */

// 13月亮历月份名称
const LUNAR_MONTH_NAMES = [
    "磁性月",
    "月亮月",
    "电力月",
    "自我存在月",
    "超频月",
    "韵律月",
    "共振月",
    "银河月",
    "太阳月",
    "行星月",
    "光谱月",
    "水晶月",
    "宇宙月",
];

// 无时间日
const DAY_OUT_OF_TIME = { month: 7, day: 25 };

/**
 * 判断是否为闰年
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 计算两个日期之间的闰日数
 */
function countLeapDays(startDate, endDate) {
    if (endDate <= startDate) {
        return 0;
    }
    
    let count = 0;
    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
        if (!isLeapYear(year)) {
            continue;
        }
        const feb29 = new Date(year, 1, 29); // 2月29日
        if (startDate < feb29 && feb29 <= endDate) {
            count++;
        }
    }
    return count;
}

/**
 * 将公历日期转换为 13 月亮历
 * @param {Date} gregorianDate - 公历日期
 * @returns {Object} { isKinDay: boolean, month: number, day: number, lunarDateShort: string }
 */
function convertGregorianToLunar13(gregorianDate) {
    const month = gregorianDate.getMonth() + 1; // JavaScript 的 getMonth() 返回 0-11
    const day = gregorianDate.getDate();
    
    // 检查是否为无时间日 (7月25日)
    if (month === 7 && day === 25) {
        return {
            isKinDay: true,
            month: 7,
            day: 25,
            lunarDateShort: "无时间日",
            monthName: "无时间日"
        };
    }
    
    // 13月亮历周期从7月26日开始
    let cycleStart = new Date(gregorianDate.getFullYear(), 6, 26); // 7月26日
    if (gregorianDate < cycleStart) {
        cycleStart = new Date(gregorianDate.getFullYear() - 1, 6, 26);
    }
    
    // 计算偏移天数
    let offset = Math.floor((gregorianDate - cycleStart) / (1000 * 60 * 60 * 24));
    offset -= countLeapDays(cycleStart, gregorianDate);
    
    if (offset < 0 || offset >= 364) {
        throw new Error("日期超出 13 月亮历的有效范围");
    }
    
    const lunarMonth = Math.floor(offset / 28) + 1;
    const lunarDay = (offset % 28) + 1;
    const lunarDateShort = `${lunarMonth}.${lunarDay}`;
    const monthName = LUNAR_MONTH_NAMES[lunarMonth - 1];
    
    return {
        isKinDay: false,
        month: lunarMonth,
        day: lunarDay,
        lunarDateShort: lunarDateShort,
        monthName: monthName
    };
}

/**
 * 获取 PSI 值
 * @param {string} lunarDateShort - 13月亮历日期，格式为 "月.日"
 * @returns {string} PSI 值
 */
function getPSI(lunarDateShort) {
    if (typeof PSI_MAP === 'undefined') {
        console.warn('PSI_MAP 未加载');
        return '未找到PSI';
    }
    return PSI_MAP[lunarDateShort] || '未找到PSI';
}

/**
 * 根据公历日期获取完整的 13 月亮历信息
 * @param {number} year - 年份
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期 (1-31)
 * @returns {Object} { lunarMonth, lunarDay, lunarDateShort, psi, monthName, isKinDay }
 */
function getLunar13Info(year, month, day) {
    try {
        const gregorianDate = new Date(year, month - 1, day);
        const lunarInfo = convertGregorianToLunar13(gregorianDate);
        
        let psi = '无时间日当天没有对应的 PSI';
        if (!lunarInfo.isKinDay) {
            psi = getPSI(lunarInfo.lunarDateShort);
        }
        
        return {
            lunarMonth: lunarInfo.month,
            lunarDay: lunarInfo.day,
            lunarDateShort: lunarInfo.lunarDateShort,
            psi: psi,
            monthName: lunarInfo.monthName,
            isKinDay: lunarInfo.isKinDay
        };
    } catch (error) {
        console.error('转换失败:', error);
        return {
            error: error.message
        };
    }
}

