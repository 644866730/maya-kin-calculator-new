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
 * 将公历日期转换为 13 月亮历
 * 13月亮历与年份无关，只与月份和日期相关
 * 周期从7月26日开始，到次年7月24日结束（共364天）
 * 7月25日为"无时间日"
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期 (1-31)
 * @returns {Object} { isKinDay: boolean, month: number, day: number, lunarDateShort: string }
 */
function convertGregorianToLunar13(month, day) {
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

    // 定义每个月的天数（非闰年）
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 计算从7月26日开始的偏移天数
    let offset = 0;

    if (month >= 7 && (month > 7 || day >= 26)) {
        // 7月26日到12月31日
        if (month === 7) {
            offset = day - 26;
        } else {
            // 先加上7月26日到7月31日的天数（6天）
            offset = 31 - 26 + 1;
            // 加上8月到当前月份前一个月的天数
            for (let m = 8; m < month; m++) {
                offset += daysInMonth[m - 1];
            }
            // 加上当前月份的天数
            offset += day - 1;
        }
    } else {
        // 1月1日到7月24日
        // 先加上7月26日到12月31日的天数
        offset = 31 - 26 + 1; // 7月剩余天数
        offset += 31 + 30 + 31 + 30 + 31; // 8月到12月

        // 加上1月到当前月份前一个月的天数
        for (let m = 1; m < month; m++) {
            offset += daysInMonth[m - 1];
        }
        // 加上当前月份的天数
        offset += day - 1;
    }

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
 * @param {number} year - 年份（保留参数以兼容旧代码，但不使用）
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期 (1-31)
 * @returns {Object} { lunarMonth, lunarDay, lunarDateShort, psi, monthName, isKinDay }
 */
function getLunar13Info(year, month, day) {
    try {
        const lunarInfo = convertGregorianToLunar13(month, day);

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

