"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * mock数据相关配置
 */
exports.default = {
    // 一级mock数据长度设置
    "level_1": {
        "en": [5, 50],
        "zh": [1, 20],
        "int": [1, 10],
        "array": [0, 20]
    },
    // 二级mock数据长度设置
    "level_2": {
        "en": [50, 100],
        "zh": [20, 80],
        "int": [10, 20],
        "array": [20, 80]
    },
    // 三级mock数据长度设置
    "level_3": {
        "en": [100, 200],
        "zh": [80, 150],
        "int": [20, 100],
        "array": [80, 150]
    }
};