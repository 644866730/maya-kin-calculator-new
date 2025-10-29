#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的Flask API服务器，为前端提供PSI和对等KIN数据
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path

from lunar_13_calendar import Lunar13Calendar
from equivalent_kin import calculate_equivalent_kin, Matrix, describe_kin
from coord_to_date import load_calendar

app = Flask(__name__)
CORS(app)

# 初始化数据
Lunar13Calendar.load_psi_map()

base_dir = Path(__file__).resolve().parent
data_dir = base_dir / "data"

try:
    calendar_map = load_calendar(str(data_dir / "calendar.csv"))
    space_matrix = Matrix.from_csv(data_dir / "space.csv")
    time_matrix = Matrix.from_csv(data_dir / "time.csv")
    sametime_matrix = Matrix.from_csv(data_dir / "sametime.csv")
except Exception as e:
    print(f"警告: 数据加载失败: {e}")
    calendar_map = {}
    space_matrix = None
    time_matrix = None
    sametime_matrix = None


@app.route('/api/psi_map', methods=['GET'])
def get_psi_map():
    """获取PSI查询表"""
    return jsonify(Lunar13Calendar.PSI_MAP)


@app.route('/api/lunar13', methods=['GET'])
def get_lunar13():
    """获取13月亮历日期和PSI"""
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)

    if not all([year, month, day]):
        return jsonify({'error': '缺少参数'}), 400

    try:
        result = Lunar13Calendar.gregorian_to_lunar13(year, month, day)
        if 'error' in result:
            return jsonify(result), 400

        return jsonify({
            'lunar_month': result['month'],
            'lunar_day': result['day'],
            'lunar_date_short': result['lunar_13_date_short'],
            'psi': result['psi']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/equivalent_kin', methods=['GET'])
def get_equivalent_kin():
    """获取对等KIN"""
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)

    if not all([year, month, day]):
        return jsonify({'error': '缺少参数'}), 400

    if not all([space_matrix, time_matrix, sametime_matrix]):
        return jsonify({'error': '数据未加载'}), 500

    try:
        result = calculate_equivalent_kin(
            year, month, day,
            calendar_map,
            space_matrix,
            time_matrix,
            sametime_matrix
        )

        return jsonify({
            'equivalent_kin': result.equivalent_kin,
            'equivalent_tone': result.equivalent_tone,
            'equivalent_seal': result.equivalent_seal,
            'equivalent_desc': describe_kin(result.equivalent_kin)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/full_info', methods=['GET'])
def get_full_info():
    """获取完整信息（13月亮历、PSI、对等KIN）"""
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)

    if not all([year, month, day]):
        return jsonify({'error': '缺少参数'}), 400

    try:
        lunar13_result = Lunar13Calendar.gregorian_to_lunar13(year, month, day)
        if 'error' in lunar13_result:
            return jsonify(lunar13_result), 400

        if not all([space_matrix, time_matrix, sametime_matrix]):
            return jsonify({
                'lunar_month': lunar13_result['month'],
                'lunar_day': lunar13_result['day'],
                'lunar_date_short': lunar13_result['lunar_13_date_short'],
                'psi': lunar13_result['psi'],
                'equivalent_kin': 0,
                'equivalent_tone': 0,
                'equivalent_seal': 0,
                'equivalent_desc': '数据未加载'
            })

        equivalent_result = calculate_equivalent_kin(
            year, month, day,
            calendar_map,
            space_matrix,
            time_matrix,
            sametime_matrix
        )

        return jsonify({
            'lunar_month': lunar13_result['month'],
            'lunar_day': lunar13_result['day'],
            'lunar_date_short': lunar13_result['lunar_13_date_short'],
            'psi': lunar13_result['psi'],
            'equivalent_kin': equivalent_result.equivalent_kin,
            'equivalent_tone': equivalent_result.equivalent_tone,
            'equivalent_seal': equivalent_result.equivalent_seal,
            'equivalent_desc': describe_kin(equivalent_result.equivalent_kin)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5000)

