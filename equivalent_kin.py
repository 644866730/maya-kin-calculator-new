#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
计算公历日期对应的对等 KIN 值。

流程依据:
1. 将公历日期转换为 13 月亮历 (使用现有 `lunar_13_calendar.Lunar13Calendar`).
2. 根据 13 月亮历日期在 `data/calendar.csv` 中找到坐标 (Vx, Hy)。
3. 读取空间、时间、共时三张矩阵 (space.csv / time.csv / sametime.csv) 并执行三轮求和:
   - 第一步: 使用 13 月亮历坐标取三个矩阵的值求和。
   - 第二步: 在空间矩阵内找到主印记 KIN 所在坐标, 同一坐标在时间与共时矩阵上的值与空间值求和。
   - 第三步: 在共时矩阵内找到主印记 KIN 所在坐标, 同一坐标在空间与时间矩阵上的值与共时值求和。
4. 将三个步骤的结果累加, 大于 260 则持续减去 260。
"""

from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

from coord_to_date import load_calendar, normalize_h, normalize_v
from lunar_13_calendar import Lunar13Calendar

Coord = Tuple[str, str]

# 调性与图腾名称 (索引从 1 开始, 0 位置填 None 以便直接按编号索引)
TONE_NAMES: List[Optional[str]] = [
    None,
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
]

TOTEM_NAMES: List[Optional[str]] = [
    None,
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
]

# 与 script.js 中保持一致的年份/月份系数
YEAR_NUMS: Dict[int, int] = {
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
}

MONTH_NUMS: Dict[int, int] = {
    1: 0,
    2: 31,
    3: 59,
    4: 90,
    5: 120,
    6: 151,
    7: 181,
    8: 212,
    9: 243,
    10: 13,
    11: 44,
    12: 74,
}


@dataclass
class Matrix:
    values_by_coord: Dict[Coord, int]
    coords_by_value: Dict[int, List[Coord]]

    @classmethod
    def from_csv(cls, csv_path: Path) -> "Matrix":
        with csv_path.open("r", encoding="utf-8-sig", newline="") as fh:
            rows = list(csv.reader(fh))

        if not rows:
            return cls({}, {})

        headers: List[str] = []
        for raw in rows[0][1:]:
            label = (raw or "").strip()
            if not label:
                headers.append("")
                continue
            try:
                headers.append(normalize_v(label))
            except ValueError:
                headers.append(label)

        values: Dict[Coord, int] = {}
        coords: Dict[int, List[Coord]] = defaultdict(list)

        for row in rows[1:]:
            if not row:
                continue
            raw_h = (row[0] or "").strip()
            if not raw_h:
                continue
            try:
                h_label = normalize_h(raw_h)
            except ValueError:
                continue

            for idx, cell in enumerate(row[1:]):
                if idx >= len(headers):
                    break
                v_label = headers[idx]
                if not v_label:
                    continue
                cell_str = (cell or "").strip()
                if not cell_str:
                    continue
                # 移除可能的不可见字符
                cell_str = cell_str.replace("\u200b", "")
                try:
                    value = int(cell_str)
                except ValueError:
                    continue
                coord = (v_label, h_label)
                values[coord] = value
                coords[value].append(coord)

        return cls(values, dict(coords))

    def value_at(self, coord: Coord) -> Optional[int]:
        return self.values_by_coord.get(coord)

    def first_coord_of(self, value: int) -> Optional[Coord]:
        positions = self.coords_by_value.get(value)
        if not positions:
            return None
        return positions[0]


@dataclass
class StepResult:
    coord: Coord
    values: Dict[str, int]

    @property
    def total(self) -> int:
        return sum(self.values.values())


@dataclass
class EquivalentKinResult:
    gregorian: datetime
    lunar_month: int
    lunar_day: int
    lunar_coord: Coord
    main_kin: int
    step1: StepResult
    step2: StepResult
    step3: StepResult
    equivalent_kin: int

    @property
    def main_tone(self) -> int:
        return ((self.main_kin - 1) % 13) + 1

    @property
    def main_seal(self) -> int:
        return ((self.main_kin - 1) % 20) + 1

    @property
    def equivalent_tone(self) -> int:
        return ((self.equivalent_kin - 1) % 13) + 1

    @property
    def equivalent_seal(self) -> int:
        return ((self.equivalent_kin - 1) % 20) + 1


def gregorian_to_kin(year: int, month: int, day: int) -> int:
    y = year
    while y > 2117:
        y -= 52
    while y < 1858:
        y += 52

    if y not in YEAR_NUMS:
        raise ValueError(f"年份 {year} 超出支持范围(1858-2117)。")

    year_value = YEAR_NUMS[y]
    month_value = MONTH_NUMS.get(month)
    if month_value is None:
        raise ValueError(f"无效月份: {month}")

    s = (year_value + month_value + day) % 260
    return s if s != 0 else 260


def build_date_coordinate_map(calendar_mapping: Dict[Coord, List[str]]) -> Dict[str, Coord]:
    date_to_coord: Dict[str, Coord] = {}
    for coord, dates in calendar_mapping.items():
        for date_str in dates:
            key = date_str.strip()
            if not key:
                continue
            date_to_coord.setdefault(key, coord)
    return date_to_coord


def reduce_to_260(total: int) -> int:
    value = total
    while value > 260:
        value -= 260
    return value


def calculate_equivalent_kin(
    year: int,
    month: int,
    day: int,
    calendar_mapping: Dict[Coord, List[str]],
    space_matrix: Matrix,
    time_matrix: Matrix,
    sametime_matrix: Matrix,
) -> EquivalentKinResult:
    lunar_info = Lunar13Calendar.gregorian_to_lunar13(year, month, day)
    if "error" in lunar_info:
        raise ValueError(lunar_info["error"])

    if lunar_info.get("is_kin_day"):
        lunar_month, lunar_day = 7, 25
    else:
        lunar_month = int(lunar_info["month"])
        lunar_day = int(lunar_info["day"])

    date_key = f"{lunar_month}.{lunar_day}"

    date_to_coord = build_date_coordinate_map(calendar_mapping)
    lunar_coord = date_to_coord.get(date_key)
    if lunar_coord is None:
        raise ValueError(f"未在日历矩阵中找到 13 月亮历日期 {date_key} 的坐标。")

    main_kin = gregorian_to_kin(year, month, day)

    # 第一个数字
    step1_values = {
        "空间": _require_value(space_matrix, lunar_coord, "空间矩阵"),
        "时间": _require_value(time_matrix, lunar_coord, "时间矩阵"),
        "共时": _require_value(sametime_matrix, lunar_coord, "共时矩阵"),
    }
    step1 = StepResult(coord=lunar_coord, values=step1_values)

    # 第二个数字
    space_coord = space_matrix.first_coord_of(main_kin)
    if space_coord is None:
        raise ValueError(f"空间矩阵中找不到主印记 KIN {main_kin}。")

    step2_values = {
        "空间": _require_value(space_matrix, space_coord, "空间矩阵"),
        "时间": _require_value(time_matrix, space_coord, "时间矩阵"),
        "共时": _require_value(sametime_matrix, space_coord, "共时矩阵"),
    }
    step2 = StepResult(coord=space_coord, values=step2_values)

    # 第三个数字
    sametime_coord = sametime_matrix.first_coord_of(main_kin)
    if sametime_coord is None:
        raise ValueError(f"共时矩阵中找不到主印记 KIN {main_kin}。")

    step3_values = {
        "空间": _require_value(space_matrix, sametime_coord, "空间矩阵"),
        "时间": _require_value(time_matrix, sametime_coord, "时间矩阵"),
        "共时": _require_value(sametime_matrix, sametime_coord, "共时矩阵"),
    }
    step3 = StepResult(coord=sametime_coord, values=step3_values)

    total_sum = step1.total + step2.total + step3.total
    equivalent_kin = reduce_to_260(total_sum)

    gregorian_date = datetime(year=year, month=month, day=day)

    return EquivalentKinResult(
        gregorian=gregorian_date,
        lunar_month=lunar_month,
        lunar_day=lunar_day,
        lunar_coord=lunar_coord,
        main_kin=main_kin,
        step1=step1,
        step2=step2,
        step3=step3,
        equivalent_kin=equivalent_kin,
    )


def _require_value(matrix: Matrix, coord: Coord, label: str) -> int:
    value = matrix.value_at(coord)
    if value is None:
        raise ValueError(f"{label} 在坐标 {coord} 上没有数据。")
    return value


def format_step(step: StepResult, title: str) -> str:
    entries = ", ".join(f"{name}={value}" for name, value in step.values.items())
    return f"{title} (坐标 {step.coord[0]},{step.coord[1]}): {entries} -> 合计 {step.total}"


def describe_kin(kin: int) -> str:
    tone = ((kin - 1) % 13) + 1
    seal = ((kin - 1) % 20) + 1
    tone_name = TONE_NAMES[tone] or f"调性{tone}"
    seal_name = TOTEM_NAMES[seal] or f"图腾{seal}"
    return f"{tone_name}的{seal_name}"


def parse_args(argv: Optional[Iterable[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="根据公历日期计算对等 KIN。",
    )
    parser.add_argument("date", nargs="?", help="公历日期，格式 YYYY-MM-DD")
    return parser.parse_args(argv)


def main(argv: Optional[Iterable[str]] = None) -> None:
    args = parse_args(argv)

    if args.date:
        date_str = args.date.strip()
    else:
        date_str = input("请输入公历日期 (YYYY-MM-DD): ").strip()

    try:
        gregorian_date = datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        raise SystemExit(f"无效日期格式: {date_str}，请使用 YYYY-MM-DD。")

    base_dir = Path(__file__).resolve().parent
    data_dir = base_dir / "data"

    calendar_map = load_calendar(str(data_dir / "calendar.csv"))
    space_matrix = Matrix.from_csv(data_dir / "space.csv")
    time_matrix = Matrix.from_csv(data_dir / "time.csv")
    sametime_matrix = Matrix.from_csv(data_dir / "sametime.csv")

    result = calculate_equivalent_kin(
        gregorian_date.year,
        gregorian_date.month,
        gregorian_date.day,
        calendar_map,
        space_matrix,
        time_matrix,
        sametime_matrix,
    )

    lunar_label = f"{result.lunar_month}.{result.lunar_day}"
    main_desc = describe_kin(result.main_kin)
    equivalent_desc = describe_kin(result.equivalent_kin)

    print(f"公历日期: {result.gregorian:%Y-%m-%d}")
    print(f"13月亮历: {lunar_label} (坐标 {result.lunar_coord[0]},{result.lunar_coord[1]})")
    print(f"主印记 KIN: {result.main_kin} ({main_desc})")
    print(format_step(result.step1, "第一个数字"))
    print(format_step(result.step2, "第二个数字"))
    print(format_step(result.step3, "第三个数字"))
    totals = (result.step1.total, result.step2.total, result.step3.total)
    raw_total = sum(totals)
    print(f"三数合计: {totals[0]} + {totals[1]} + {totals[2]} = {raw_total}")
    if raw_total > 260:
        print(f"超出 260, 归约后为: {result.equivalent_kin}")
    else:
        print("总和未超出 260。")
    print(f"对等 KIN: {result.equivalent_kin} ({equivalent_desc})")


if __name__ == "__main__":
    main()
