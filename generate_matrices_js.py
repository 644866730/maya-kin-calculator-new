#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成矩阵数据的 JavaScript 文件"""

import csv
from pathlib import Path

def load_matrix(csv_path):
    """加载矩阵数据"""
    matrix = {}
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        rows = list(csv.reader(f))
    
    if not rows:
        return matrix
    
    # 获取列标题 (V1, V2, ...)
    headers = []
    for raw in rows[0][1:]:
        label = (raw or "").strip()
        if label:
            headers.append(label)
        else:
            headers.append("")
    
    # 读取数据
    for row in rows[1:]:
        if not row:
            continue
        raw_h = (row[0] or "").strip()
        if not raw_h:
            continue
        
        h_label = raw_h
        
        for idx, cell in enumerate(row[1:]):
            if idx >= len(headers):
                break
            v_label = headers[idx]
            if not v_label:
                continue
            cell_str = (cell or "").strip()
            if not cell_str:
                continue
            
            try:
                value = int(cell_str)
                key = f"{v_label},{h_label}"
                matrix[key] = value
            except ValueError:
                continue
    
    return matrix

def load_calendar(csv_path):
    """加载日历数据"""
    calendar = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        rows = list(csv.reader(f))
    
    if not rows:
        return calendar
    
    # 获取列标题
    headers = []
    for raw in rows[0][1:]:
        label = (raw or "").strip()
        if label:
            headers.append(label)
        else:
            headers.append("")
    
    # 读取数据
    for row in rows[1:]:
        if not row:
            continue
        raw_h = (row[0] or "").strip()
        if not raw_h:
            continue
        
        h_label = raw_h
        
        for idx, cell in enumerate(row[1:]):
            if idx >= len(headers):
                break
            v_label = headers[idx]
            if not v_label:
                continue
            cell_str = (cell or "").strip()
            if not cell_str:
                continue
            
            # 处理多个日期的情况
            dates = [d.strip() for d in cell_str.split('\n') if d.strip()]
            for date in dates:
                calendar[date] = [v_label, h_label]
    
    return calendar

# 生成 JavaScript 文件
base_dir = Path('data')

print("加载矩阵数据...")
space_matrix = load_matrix(base_dir / 'space.csv')
time_matrix = load_matrix(base_dir / 'time.csv')
sametime_matrix = load_matrix(base_dir / 'sametime.csv')
calendar_data = load_calendar(base_dir / 'calendar.csv')

print(f"空间矩阵: {len(space_matrix)} 条数据")
print(f"时间矩阵: {len(time_matrix)} 条数据")
print(f"共时矩阵: {len(sametime_matrix)} 条数据")
print(f"日历数据: {len(calendar_data)} 条数据")

# 生成 JavaScript 代码
js_content = """// 矩阵数据 - 从 CSV 文件生成
// 这个文件包含所有计算对等KIN所需的矩阵数据

// 空间矩阵
const SPACE_MATRIX = {
"""

for key, value in sorted(space_matrix.items()):
    js_content += f"    '{key}': {value},\n"

js_content += """};\n\n// 时间矩阵
const TIME_MATRIX = {
"""

for key, value in sorted(time_matrix.items()):
    js_content += f"    '{key}': {value},\n"

js_content += """};\n\n// 共时矩阵
const SAMETIME_MATRIX = {
"""

for key, value in sorted(sametime_matrix.items()):
    js_content += f"    '{key}': {value},\n"

js_content += """};\n\n// 日历数据 (13月亮历日期 -> 坐标)
const CALENDAR_DATA = {
"""

for date, coord in sorted(calendar_data.items()):
    js_content += f"    '{date}': ['{coord[0]}', '{coord[1]}'],\n"

js_content += """};\n\n// 初始化矩阵到全局对象
if (typeof MATRICES !== 'undefined') {
    MATRICES.space = SPACE_MATRIX;
    MATRICES.time = TIME_MATRIX;
    MATRICES.sametime = SAMETIME_MATRIX;
    MATRICES.calendar = CALENDAR_DATA;
    console.log('矩阵数据已加载');
}
"""

# 写入文件
with open('matrices_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n已生成 matrices_data.js")
print(f"文件大小: {len(js_content) / 1024:.2f} KB")

