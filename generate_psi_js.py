#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成 PSI 数据的 JavaScript 文件"""

import csv
from pathlib import Path

# 读取 kin_calendar.csv
csv_path = Path('data/kin_calendar.csv')
psi_map = {}

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)  # 跳过标题
    for row in reader:
        if len(row) >= 2:
            dates_str = row[0].strip()
            psi = row[1].strip()
            # 处理多个日期的情况
            dates = [d.strip() for d in dates_str.split(';')]
            for date in dates:
                psi_map[date] = psi

# 生成 JavaScript 代码
js_content = "// PSI 查询表 - 从 kin_calendar.csv 生成\nconst PSI_MAP = {\n"
for date, psi in sorted(psi_map.items()):
    escaped_psi = psi.replace("'", "\\'")
    js_content += f"    '{date}': '{escaped_psi}',\n"
js_content += "};\n"

# 写入文件
with open('psi_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"已生成 psi_data.js，包含 {len(psi_map)} 条 PSI 数据")

