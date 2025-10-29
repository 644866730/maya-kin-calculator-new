#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成Kin日期CSV文件
按照调性和图腾的规律生成260个Kin日期
"""

import csv

# 调性名称（1-13）
tone_names = [
    "磁性的", "月亮的", "电力的", "自我存在的", "超频的",
    "韵律的", "共振的", "银河的", "太阳的", "行星的",
    "光谱的", "水晶的", "宇宙的"
]

# 图腾名称（1-20）
totem_names = [
    "红龙", "白风", "蓝夜", "黄种子", "红蛇",
    "白世界桥", "蓝手", "黄星星", "红月", "白狗",
    "蓝猴", "黄人", "红天行者", "白巫师", "蓝鹰",
    "黄战士", "红地球", "白镜子", "蓝风暴", "黄太阳"
]

def generate_kin_sequence():
    """
    生成260个Kin日期序列
    规律：
    - 共260个Kin（13个调性 × 20个图腾）
    - 调性和图腾都同时递增
    - 第1个: 磁性的红龙 (调性1, 图腾1)
    - 第2个: 月亮的白风 (调性2, 图腾2)
    - 第3个: 电力的蓝夜 (调性3, 图腾3)
    - ...
    - 当调性循环回到磁性时，图腾继续递增
    """
    kin_list = []

    # 生成260个Kin
    for i in range(260):
        # 调性和图腾都同时递增
        tone_index = i % 13
        totem_index = i % 20

        tone = tone_names[tone_index]
        totem = totem_names[totem_index]

        # 组合成Kin日期
        kin_date = f"{tone}{totem}"
        kin_list.append(kin_date)

    return kin_list

def create_csv_file(kin_list, filename='kin_calendar.csv'):
    """
    创建CSV文件（可用Excel打开）
    """
    with open(filename, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        # 写入标题
        writer.writerow(['Kin日期序列'])
        # 写入数据
        for kin in kin_list:
            writer.writerow([kin])

    print(f"✓ CSV文件已生成: {filename}")
    print(f"✓ 共包含 {len(kin_list)} 个Kin日期")
    print(f"✓ 第一个: {kin_list[0]}")
    print(f"✓ 第二个: {kin_list[1]}")
    print(f"✓ 最后一个: {kin_list[-1]}")

if __name__ == '__main__':
    # 生成Kin序列
    kin_sequence = generate_kin_sequence()

    # 创建CSV文件
    create_csv_file(kin_sequence)

    print("\n✓ 生成完成！")

