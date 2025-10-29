/**
 * 对等 KIN 计算器 - 纯 JavaScript 实现
 * 根据公历日期计算对等 KIN 值
 */

// 调性名称
const TONE_NAMES = [
    null,
    "磁性",
    "月亮",
    "电力",
    "自我存在",
    "超频",
    "韵律",
    "共振",
    "银河",
    "太阳",
    "行星",
    "光谱",
    "水晶",
    "宇宙",
];

// 图腾名称
const TOTEM_NAMES = [
    null,
    "红龙",
    "白风",
    "蓝夜",
    "黄种子",
    "红蛇",
    "白世界桥",
    "蓝手",
    "黄星星",
    "红月",
    "白狗",
    "蓝猴",
    "黄人",
    "红天行者",
    "白巫师",
    "蓝鹰",
    "黄战士",
    "红地球",
    "白镜子",
    "蓝风暴",
    "黄太阳",
];

// 年份系数表
const YEAR_NUMS = {
    1858: 62, 1859: 167, 1860: 12, 1861: 117, 1862: 222, 1863: 67, 1864: 172,
    1865: 17, 1866: 122, 1867: 227, 1868: 72, 1869: 177, 1870: 22, 1871: 127,
    1872: 232, 1873: 77, 1874: 182, 1875: 27, 1876: 132, 1877: 237, 1878: 82,
    1879: 187, 1880: 32, 1881: 137, 1882: 242, 1883: 87, 1884: 192, 1885: 37,
    1886: 142, 1887: 247, 1888: 92, 1889: 197, 1890: 42, 1891: 147, 1892: 252,
    1893: 97, 1894: 202, 1895: 47, 1896: 152, 1897: 257, 1898: 102, 1899: 207,
    1900: 52, 1901: 157, 1902: 2, 1903: 107, 1904: 212, 1905: 57, 1906: 162,
    1907: 7, 1908: 112, 1909: 217, 1910: 62, 1911: 167, 1912: 12, 1913: 117,
    1914: 222, 1915: 67, 1916: 172, 1917: 17, 1918: 122, 1919: 227, 1920: 72,
    1921: 177, 1922: 22, 1923: 127, 1924: 232, 1925: 77, 1926: 182, 1927: 27,
    1928: 132, 1929: 237, 1930: 82, 1931: 187, 1932: 32, 1933: 137, 1934: 242,
    1935: 87, 1936: 192, 1937: 37, 1938: 142, 1939: 247, 1940: 92, 1941: 197,
    1942: 42, 1943: 147, 1944: 252, 1945: 97, 1946: 202, 1947: 47, 1948: 152,
    1949: 257, 1950: 102, 1951: 207, 1952: 52, 1953: 157, 1954: 2, 1955: 107,
    1956: 212, 1957: 57, 1958: 162, 1959: 7, 1960: 112, 1961: 217, 1962: 62,
    1963: 167, 1964: 12, 1965: 117, 1966: 222, 1967: 67, 1968: 172, 1969: 17,
    1970: 122, 1971: 227, 1972: 72, 1973: 177, 1974: 22, 1975: 127, 1976: 232,
    1977: 77, 1978: 182, 1979: 27, 1980: 132, 1981: 237, 1982: 82, 1983: 187,
    1984: 32, 1985: 137, 1986: 242, 1987: 87, 1988: 192, 1989: 37, 1990: 142,
    1991: 247, 1992: 92, 1993: 197, 1994: 42, 1995: 147, 1996: 252, 1997: 97,
    1998: 202, 1999: 47, 2000: 152, 2001: 257, 2002: 102, 2003: 207, 2004: 52,
    2005: 157, 2006: 2, 2007: 107, 2008: 212, 2009: 57, 2010: 162, 2011: 7,
    2012: 112, 2013: 217, 2014: 62, 2015: 167, 2016: 12, 2017: 117, 2018: 222,
    2019: 67, 2020: 172, 2021: 17, 2022: 122, 2023: 227, 2024: 72, 2025: 177,
    2026: 22, 2027: 127, 2028: 232, 2029: 77, 2030: 182, 2031: 27, 2032: 132,
    2033: 237, 2034: 82, 2035: 187, 2036: 32, 2037: 137, 2038: 242, 2039: 87,
    2040: 192, 2041: 37, 2042: 142, 2043: 247, 2044: 92, 2045: 197, 2046: 42,
    2047: 147, 2048: 252, 2049: 97, 2050: 202, 2051: 47, 2052: 152, 2053: 257,
    2054: 102, 2055: 207, 2056: 52, 2057: 157, 2058: 2, 2059: 107, 2060: 212,
    2061: 57, 2062: 162, 2063: 7, 2064: 112, 2065: 217, 2066: 62, 2067: 167,
    2068: 12, 2069: 117, 2070: 222, 2071: 67, 2072: 172, 2073: 17, 2074: 122,
    2075: 227, 2076: 72, 2077: 177, 2078: 22, 2079: 127, 2080: 232, 2081: 77,
    2082: 182, 2083: 27, 2084: 132, 2085: 237, 2086: 82, 2087: 187, 2088: 32,
    2089: 137, 2090: 242, 2091: 87, 2092: 192, 2093: 37, 2094: 142, 2095: 247,
    2096: 92, 2097: 197, 2098: 42, 2099: 147, 2100: 252, 2101: 97, 2102: 202,
    2103: 47, 2104: 152, 2105: 257, 2106: 102, 2107: 207, 2108: 52, 2109: 157,
    2110: 2, 2111: 107, 2112: 212, 2113: 57, 2114: 162, 2115: 7, 2116: 112,
    2117: 217,
};

// 月份系数表
const MONTH_NUMS = {
    1: 0, 2: 31, 3: 59, 4: 90, 5: 120, 6: 151,
    7: 181, 8: 212, 9: 243, 10: 13, 11: 44, 12: 74,
};

// 全局矩阵数据
let MATRICES = {
    space: {},
    time: {},
    sametime: {},
    calendar: {}
};

/**
 * 根据 KIN 值获取调性和图腾
 */
function kinToToneSeal(kin) {
    const tone = ((kin - 1) % 13) + 1;
    const seal = ((kin - 1) % 20) + 1;
    return { tone, seal };
}

/**
 * 根据调性和图腾获取 KIN 值
 */
function toneAndSealToKin(tone, seal) {
    // 遍历所有 KIN 值找到匹配的
    for (let kin = 1; kin <= 260; kin++) {
        const { tone: t, seal: s } = kinToToneSeal(kin);
        if (t === tone && s === seal) {
            return kin;
        }
    }
    return null;
}

/**
 * 描述 KIN 值
 */
function describeKin(kin) {
    const { tone, seal } = kinToToneSeal(kin);
    const toneName = TONE_NAMES[tone] || `调性${tone}`;
    const sealName = TOTEM_NAMES[seal] || `图腾${seal}`;
    return `${toneName}的${sealName}`;
}

/**
 * 根据公历日期计算主 KIN
 */
function gregorianToKin(year, month, day) {
    let y = year;
    while (y > 2117) y -= 52;
    while (y < 1858) y += 52;
    
    if (!(y in YEAR_NUMS)) {
        throw new Error(`年份 ${year} 超出支持范围(1858-2117)`);
    }
    
    const yearValue = YEAR_NUMS[y];
    const monthValue = MONTH_NUMS[month];
    if (monthValue === undefined) {
        throw new Error(`无效月份: ${month}`);
    }
    
    const s = (yearValue + monthValue + day) % 260;
    return s === 0 ? 260 : s;
}

/**
 * 从矩阵中获取值
 */
function getMatrixValue(matrix, coord) {
    const key = `${coord[0]},${coord[1]}`;
    return matrix[key] || null;
}

/**
 * 在矩阵中查找 KIN 值的坐标
 */
function findCoordInMatrix(matrix, kinValue) {
    for (const [key, value] of Object.entries(matrix)) {
        if (value === kinValue) {
            const [v, h] = key.split(',');
            return [v, h];
        }
    }
    return null;
}

/**
 * 计算对等 KIN
 * @param {number} year - 年份
 * @param {number} month - 月份 (1-12)
 * @param {number} day - 日期 (1-31)
 * @returns {Object} { equivalentKin, equivalentTone, equivalentSeal, equivalentDesc }
 */
function calculateEquivalentKin(year, month, day) {
    try {
        // 检查矩阵数据是否已加载
        if (Object.keys(MATRICES.space).length === 0) {
            console.warn('矩阵数据未加载，无法计算对等KIN');
            return {
                equivalentKin: 0,
                equivalentTone: 0,
                equivalentSeal: 0,
                equivalentDesc: '矩阵数据未加载'
            };
        }
        
        // 获取 13 月亮历日期
        const lunarInfo = getLunar13Info(year, month, day);
        if (lunarInfo.error) {
            throw new Error(lunarInfo.error);
        }
        
        const lunarDateShort = lunarInfo.lunarDateShort;
        const lunarCoord = MATRICES.calendar[lunarDateShort];
        
        if (!lunarCoord) {
            throw new Error(`未在日历矩阵中找到 13 月亮历日期 ${lunarDateShort} 的坐标`);
        }
        
        // 获取主 KIN
        const mainKin = gregorianToKin(year, month, day);
        
        // 第一步：在 13 月亮历坐标处获取三个矩阵的值
        const step1Space = getMatrixValue(MATRICES.space, lunarCoord);
        const step1Time = getMatrixValue(MATRICES.time, lunarCoord);
        const step1Sametime = getMatrixValue(MATRICES.sametime, lunarCoord);
        
        if (!step1Space || !step1Time || !step1Sametime) {
            throw new Error(`在坐标 ${lunarCoord} 处缺少矩阵数据`);
        }
        
        // 第二步：在空间矩阵中找到主 KIN 的坐标
        const spaceCoord = findCoordInMatrix(MATRICES.space, mainKin);
        if (!spaceCoord) {
            throw new Error(`空间矩阵中找不到主印记 KIN ${mainKin}`);
        }
        
        const step2Space = getMatrixValue(MATRICES.space, spaceCoord);
        const step2Time = getMatrixValue(MATRICES.time, spaceCoord);
        const step2Sametime = getMatrixValue(MATRICES.sametime, spaceCoord);
        
        if (!step2Space || !step2Time || !step2Sametime) {
            throw new Error(`在坐标 ${spaceCoord} 处缺少矩阵数据`);
        }
        
        // 第三步：在共时矩阵中找到主 KIN 的坐标
        const sametimeCoord = findCoordInMatrix(MATRICES.sametime, mainKin);
        if (!sametimeCoord) {
            throw new Error(`共时矩阵中找不到主印记 KIN ${mainKin}`);
        }
        
        const step3Space = getMatrixValue(MATRICES.space, sametimeCoord);
        const step3Time = getMatrixValue(MATRICES.time, sametimeCoord);
        const step3Sametime = getMatrixValue(MATRICES.sametime, sametimeCoord);
        
        if (!step3Space || !step3Time || !step3Sametime) {
            throw new Error(`在坐标 ${sametimeCoord} 处缺少矩阵数据`);
        }
        
        // 计算总和
        const totalSum = step1Space + step1Time + step1Sametime +
                        step2Space + step2Time + step2Sametime +
                        step3Space + step3Time + step3Sametime;
        
        // 归约到 1-260 范围
        let equivalentKin = totalSum % 260;
        if (equivalentKin === 0) equivalentKin = 260;
        
        const { tone, seal } = kinToToneSeal(equivalentKin);
        
        return {
            equivalentKin: equivalentKin,
            equivalentTone: tone,
            equivalentSeal: seal,
            equivalentDesc: describeKin(equivalentKin)
        };
    } catch (error) {
        console.error('计算对等KIN失败:', error);
        return {
            error: error.message,
            equivalentKin: 0,
            equivalentTone: 0,
            equivalentSeal: 0,
            equivalentDesc: '计算失败'
        };
    }
}

/**
 * 加载矩阵数据（从 CSV 文件）
 * 这个函数需要在页面加载时调用
 */
async function loadMatrices() {
    try {
        // 这里需要加载 CSV 文件
        // 由于是静态网页，我们需要预先生成 JavaScript 数据文件
        console.log('矩阵数据需要从 matrices_data.js 加载');
    } catch (error) {
        console.error('加载矩阵数据失败:', error);
    }
}

