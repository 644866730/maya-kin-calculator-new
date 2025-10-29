#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""公历日期转 13 月亮历日期与 PSI。"""

from __future__ import annotations

import csv
from calendar import isleap
from datetime import date, datetime
from pathlib import Path
from typing import Dict, Iterable, List

DAY_OUT_OF_TIME = (7, 25)
DATA_FILE = Path(__file__).resolve().parent / "data" / "kin_calendar.csv"

MONTH_NAMES: List[str] = [
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
]


def count_leap_days(start: date, end: date) -> int:
    """Return the number of leap days (Feb 29) strictly after start and up to end."""
    if end <= start:
        return 0
    count = 0
    for year in range(start.year, end.year + 1):
        if not isleap(year):
            continue
        feb_29 = date(year, 2, 29)
        if start < feb_29 <= end:
            count += 1
    return count


def normalise_token(token: str) -> str:
    """Validate and normalise a single lunar date token."""
    month_str, day_str = token.split(".", 1)
    month = int(month_str)
    day = int(day_str)
    if not 1 <= month <= 13:
        raise ValueError(f"月份 {month} 不在 1-13 范围内")
    if not 1 <= day <= 28:
        raise ValueError(f"日期 {day} 不在 1-28 范围内")
    return f"{month}.{day}"


def expand_key_field(field: str) -> Iterable[str]:
    """Split a CSV key field that may contain 1 or 3 lunar dates."""
    cleaned = field.lstrip("\ufeff").replace("；", ";").replace("．", ".")
    raw_parts = [part.strip() for part in cleaned.split(";") if part.strip()]
    parts: List[str] = []
    index = 0
    while index < len(raw_parts):
        part = raw_parts[index]
        if "." in part:
            parts.append(part)
        else:
            if index + 1 >= len(raw_parts):
                raise ValueError(f"无法解析的日期字段: {field!r}")
            combined = f"{part}.{raw_parts[index + 1]}"
            parts.append(combined)
            index += 1
        index += 1

    # 修正可能出现的跨月数据（例：'12.23;12.24;13.25'）
    if parts:
        primary_month = parts[0].split(".", 1)[0]
        corrected: List[str] = []
        for token in parts:
            month_part, day_part = token.split(".", 1)
            if month_part != primary_month:
                corrected.append(f"{primary_month}.{day_part}")
            else:
                corrected.append(token)
        parts = corrected

    return [normalise_token(token) for token in parts]


def load_psi_mapping(csv_path: Path) -> Dict[str, str]:
    """Load lunar date -> PSI mapping from CSV."""
    mapping: Dict[str, str] = {}
    with csv_path.open(encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        for row_number, row in enumerate(reader, start=1):
            if not row:
                continue
            key_field = row[0].lstrip("\ufeff").strip()
            if not key_field or key_field.startswith("13月亮历日期"):
                continue
            psi = row[1].strip() if len(row) > 1 else ""
            for token in expand_key_field(key_field):
                mapping[token] = psi
    return mapping


def convert_gregorian_to_lunar(gregorian_date: date) -> Dict[str, int | bool]:
    """Convert Gregorian date to 13-moon lunar date information."""
    if (gregorian_date.month, gregorian_date.day) == DAY_OUT_OF_TIME:
        return {"is_day_out_of_time": True}

    cycle_start = date(gregorian_date.year, 7, 26)
    if gregorian_date < cycle_start:
        cycle_start = date(gregorian_date.year - 1, 7, 26)

    offset = (gregorian_date - cycle_start).days
    offset -= count_leap_days(cycle_start, gregorian_date)

    if not 0 <= offset < 364:
        raise ValueError("日期超出 13 月亮历的有效范围")

    lunar_month = offset // 28 + 1
    lunar_day = offset % 28 + 1
    return {
        "is_day_out_of_time": False,
        "month": lunar_month,
        "day": lunar_day,
    }


def main() -> None:
    try:
        psi_mapping = load_psi_mapping(DATA_FILE)
    except FileNotFoundError:
        print(f"未找到 PSI 数据文件：{DATA_FILE}")
        return
    except ValueError as exc:
        print(f"解析 PSI 数据文件时出错：{exc}")
        return

    try:
        user_input = input("请输入公历日期（YYYY-MM-DD）: ").strip()
    except EOFError:
        return

    if not user_input:
        print("未输入日期，程序结束。")
        return

    try:
        gregorian_date = datetime.strptime(user_input, "%Y-%m-%d").date()
    except ValueError:
        print("输入格式错误，请使用 YYYY-MM-DD。")
        return

    try:
        result = convert_gregorian_to_lunar(gregorian_date)
    except ValueError as exc:
        print(f"转换失败：{exc}")
        return

    print(f"公历日期: {gregorian_date:%Y-%m-%d}")

    if result["is_day_out_of_time"]:
        print("13月亮历日期: 无时间日（Day Out of Time）")
        print("PSI: 无时间日当天没有对应的 PSI")
        return

    month = result["month"]
    day = result["day"]
    lunar_key = f"{month}.{day}"
    lunar_text = f"{MONTH_NAMES[month - 1]} 第{day}天"
    psi = psi_mapping.get(lunar_key)

    print(f"13月亮历日期: {lunar_text}（{lunar_key}）")
    if psi:
        print(f"PSI: {psi}")
    else:
        print(f"PSI: 未在数据表中找到 {lunar_key} 对应的 PSI")


if __name__ == "__main__":
    main()
