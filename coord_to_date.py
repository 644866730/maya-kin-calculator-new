#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
根据坐标(Vx, Hy)查询 data/calendar.csv 中的日期
- 某些单元格包含两个日期（以换行分隔），某些只包含一个日期
- 输入坐标（例如：V1 H1 或 V1,H1），输出日期（一个或以分号分隔的两个）
只提供此功能。
"""

import csv
import re
import sys
from typing import Dict, List, Tuple

CSV_PATH = 'data/calendar.csv'

# 提取坐标标签中的数字部分（例如 'V12/' -> '12', 'H7' -> '7'）
NUM_RE = re.compile(r'^[VvHh]\s*(\d+)')

def normalize_v(label: str) -> str:
    m = NUM_RE.match(label.strip())
    if not m:
        raise ValueError(f"无效的V标签: {label}")
    return f"V{int(m.group(1))}"

def normalize_h(label: str) -> str:
    m = NUM_RE.match(label.strip())
    if not m:
        raise ValueError(f"无效的H标签: {label}")
    return f"H{int(m.group(1))}"


def load_calendar(csv_path: str = CSV_PATH) -> Dict[Tuple[str, str], List[str]]:
    """加载表格为映射: (Vx, Hy) -> [date1, date2?]"""
    mapping: Dict[Tuple[str, str], List[str]] = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        rows = list(reader)

    if not rows:
        return mapping

    # 第一行是表头: ['', V1, V2, ...]
    header = rows[0]
    v_headers_raw = header[1:]

    # 规范化V标签（移除非数字的杂质，例如 V12/ -> V12）
    v_headers: List[str] = []
    for v in v_headers_raw:
        v = (v or '').strip()
        if not v:
            v_headers.append('')
            continue
        try:
            v_headers.append(normalize_v(v))
        except Exception:
            # 不可解析的列名，保留原样以占位
            v_headers.append(v)

    # 后续每行: [Hn, cell(V1), cell(V2), ...]
    for r in rows[1:]:
        if not r:
            continue
        h_raw = (r[0] or '').strip()
        if not h_raw:
            continue
        try:
            h_label = normalize_h(h_raw)
        except Exception:
            # 行名无法解析则跳过该行
            continue

        for j, cell in enumerate(r[1:]):
            if j >= len(v_headers):
                break
            v_label = v_headers[j]
            if not v_label:
                # 空的列头占位，跳过
                continue
            cell_str = (cell or '').strip()
            if not cell_str:
                # 空单元格
                continue
            # 有些单元格包含两行（两个日期），以换行分隔
            parts = [p.strip() for p in cell_str.splitlines() if p.strip()]
            if not parts:
                continue
            mapping[(v_label, h_label)] = parts

    return mapping


def lookup_by_coord(v_label: str, h_label: str, mapping: Dict[Tuple[str, str], List[str]]) -> List[str]:
    v_norm = normalize_v(v_label)
    h_norm = normalize_h(h_label)
    return mapping.get((v_norm, h_norm), [])


def main():
    # 读取映射
    try:
        mapping = load_calendar(CSV_PATH)
    except FileNotFoundError:
        print(f"错误: 未找到文件 {CSV_PATH}")
        sys.exit(1)

    # 命令行参数支持：python coord_to_date.py V1 H1 或 python coord_to_date.py V1,H1
    args = sys.argv[1:]
    v_in = ''
    h_in = ''

    if len(args) == 1 and (',' in args[0] or '，' in args[0]):
        segs = args[0].replace('，', ',').split(',')
        if len(segs) == 2:
            v_in, h_in = segs[0].strip(), segs[1].strip()
    elif len(args) >= 2:
        v_in, h_in = args[0].strip(), args[1].strip()

    if not v_in or not h_in:
        print("请输入坐标，示例：")
        print("  python coord_to_date.py V1 H1")
        print("  python coord_to_date.py V1,H1")
        try:
            v_in = input("请输入V坐标(如 V1): ").strip()
            h_in = input("请输入H坐标(如 H1): ").strip()
        except KeyboardInterrupt:
            print()  # 换行
            sys.exit(0)

    try:
        dates = lookup_by_coord(v_in, h_in, mapping)
    except ValueError as e:
        print(f"错误: {e}")
        sys.exit(1)

    if not dates:
        print("未找到日期")
        sys.exit(2)

    # 输出：若两个日期则以分号连接
    print(';'.join(dates))


if __name__ == '__main__':
    main()

