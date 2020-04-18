/*
 * banner
 */

class Event {
  constructor() {
    this.events = {};
  }

  /**
   * 事件监听
   * @param {String} type
   * @param {String} listener
   */
  addEventListener(type, listener = function() {}) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  /**
   * 触发事件
   * @param {String} type
   * @param  {...Any} params
   */
  trigger(type, ...params) {
    if (!!this.events[type]) {
      this.events[type].forEach(listener => {
        try {
          listener.apply(null, params);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }
}

var Config = {
  animation: true,
  animationDuration: 1000,
  animationTiming: 'default', // default, easeIn, easeOut, easeInOut, linear
  backgroundColor: '#ffffff',
  colors: ['#7cb5ec', '#f7a35c', '#434348', '#90ed7d', '#f15c80', '#8085e9'], // wxcharts调色盘
  label: {
    show: true,
    fontSize: 15,
    color: 'auto',
    margin: 5,
  },
  legend: {
    show: true,
    type: 'default', // default, circle, line, rect
    marginTop: 8,
    itemGap: 15,
    shapeWidth: 15,
    shapeHeight: 15,
    textStyle: {
      fontSize: 15,
      color: '#333333',
      padding: 5,
    },
  },
  padding: [20, 20, 20, 20],
  bar: {
    barMaxWidth: 20,
    barMinWidth: 1,
    barWidth: 'auto',
    barGap: 5,
  },
  pie: {
    center: ['50%', '50%'],
    radius: [0, '80%'],
    offsetAngle: 0,
    disablePieStroke: true,
    labelLine: {
      lineDotRadius: 3,
      lineWidth: 1,
      length1: 25,
      length2: 15,
    },
  },
  scatter: {
    color: 'auto',
    radius: 10,
    opacity: 1,
  },
  line: {
    smooth: false,
    connectNulls: false,
    line: {
      show: true,
      lineWidth: 2,
      color: 'auto',
      opacity: 1,
    },
    symbol: {
      show: true,
      type: 'circle', // circle
      size: 7,
      color: 'auto',
    },
    area: {
      show: false,
      color: 'auto',
      opacity: 0.5,
    },
  },
  radar: {
    line: {
      show: true,
      lineWidth: 1,
      color: 'auto',
      opacity: 1,
    },
    area: {
      show: false,
      color: 'auto',
      opacity: 0.5,
    },
    symbol: {
      show: true,
      type: 'circle', // circle
      size: 7,
      color: 'auto',
    },
  },
  radarAxis: {
    shape: 'polygon', // polygon. circle
    center: ['50%', '50%'],
    radius: '80%',
    max: 'auto',
    splitNumber: 4,
    axisName: {
      show: true,
      textStyle: {
        fontSize: 15,
        color: '#666666',
        margin: 10,
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        lineWidth: 1,
        color: '#cccccc',
        opacity: 1,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        lineWidth: 1,
        color: '#cccccc',
        opacity: 1,
      },
    },
    splitArea: {
      odd: {
        show: true,
        color: '#f5f5f5',
        opacity: 1,
      },
      even: {
        show: true,
        color: '#e6e6e6',
        opacity: 1,
      },
    },
  },
  yAxis: {
    show: true,
    type: 'value', // category, value
    max: 'auto',
    min: 'auto',
    splitNumber: 4,
    axisName: {
      show: true,
      text: '轴线名称',
      gap: 10,
      textStyle: {
        color: '#666666',
        fontSize: 15,
        align: 'center',
      },
    },
    axisLabel: {
      show: true,
      rotate: 0,
      gap: 5,
      textStyle: {
        color: '#666666',
        fontSize: 12,
      },
    },
    axisTick: {
      show: true,
      length: 5,
      lineStyle: {
        lineWidth: 1,
        color: '#666666',
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        lineWidth: 1,
        color: '#666666',
      },
    },
    axisSplitLine: {
      show: true,
      lineStyle: {
        lineWidth: 1,
        color: '#dddddd',
      },
    },
  },
  xAxis: {
    show: true,
    type: 'category', // category, value
    boundaryGap: true, // boundaryGap为true时, 这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
    axisName: {
      show: true,
      text: '轴线名称',
      gap: 10,
      textStyle: {
        color: '#666666',
        fontSize: 15,
      },
    },
    axisLabel: {
      show: true,
      rotate: 0,
      gap: 5,
      textStyle: {
        color: '#666666',
        fontSize: 12,
      },
    },
    axisTick: {
      show: true,
      alignWithLabel: false, // alignWithLabel为true时，刻度线与标签对齐
      length: 5,
      lineStyle: {
        lineWidth: 1,
        color: '#666666',
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        lineWidth: 1,
        color: '#666666',
      },
    },
    axisSplitLine: {
      show: true,
      alignWithLabel: false, // alignWithLabel为true时，网格线与标签对齐
      lineStyle: {
        lineWidth: 1,
        color: '#dddddd',
      },
    },
  },
};

/**
 * 转化坐标
 * @param {Object} origin
 * @param {Array} center
 */
function convertCoordinateOrigin(origin, center) {
  let [centerX, centerY] = center;

  return {
    x: centerX + origin.x,
    y: centerY - origin.y,
  }
}

/**
 * 判断是否有冲突
 * @param {Object} souce // 待检查对象
 * @param {Object} target // 比较对象
 * @param {Object} distance // 避免冲突的间隙
 */
function isCollision(souce, target, distance) {
  let isCollision = false;
  if (souce.x > 0 && target.x > 0) {
    isCollision = souce.y + distance > target.y;
  } else if (souce.x < 0 && target.x < 0) {
    isCollision = souce.y - distance < target.y;
  }

  return isCollision
}

/**
 * 检查并避免冲突
 * @param {Object} souce // 待检查对象
 * @param {Object} target // 比较对象
 * @param {Object} distance // 避免冲突的间隙
 */
function avoidCollision(souce, target, distance) {
  if (target) {
    while (isCollision(souce, target, distance)) {
      if (souce.x > 0) {
        souce.y--;
      } else if (souce.x < 0) {
        souce.y++;
      }
    }
  }
  return souce
}

/**
 * 10% => 0.1
 * @param {String} percent
 */
function percentToNum(percent) {
  if (!!percent) {
    percent = String(percent).replace('%', '');
    percent = Number(percent) / 100;
  } else {
    percent = 0;
  }
  return percent
}

/**
 * 判断一个数据是否为对象
 * @param {Any} data
 */
function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

/**
 * 判断一个数据是否为数组
 * @param {Any} data
 */
function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

/**
 * 将来源对象数据补充到目标对象中
 * @param {String} key
 * @param {Object} sources // 来源对象
 * @param {Object} target  // 目标对象
 * @param {Boolean} isCover  // 是否强制来源对象数据覆盖目标对象数据
 */
function replenishData(key, sources, target, isCover = false) {
  if (!target[key] && target[key] !== 0 && target[key] !== '' && typeof target[key] !== 'boolean') {
    // console.log(`空值, ${key}, target[key]: ${target[key]}, sources[key]: ${sources[key]}, isCover: ${isCover}`)
    // (opts参数为空时赋值)
    if (isObject(sources[key])) {
      target[key] = Object.assign({}, sources[key]);
    } else if (isArray(sources[key])) {
      target[key] = [].concat(sources[key]);
    } else {
      target[key] = sources[key];
    }
  } else {
    // console.log(`不为空值, ${key}, target[key]: ${target[key]}, sources[key]: ${sources[key]}, isCover: ${isCover}`)
    // (opts参数不为为空时，若数据类型为原始类型和数组则不做处理，对象类型时递归)
    if (isCover) {
      if (isObject(sources[key])) {
        Object.keys(sources[key]).forEach(_key => {
          replenishData(_key, sources[key], target[key], isCover);
        });
      } else if (isArray(sources[key])) {
        if (key == 'series') {
          sources[key].forEach((sourcesItem, sourcesIndex) => {
            Object.keys(sourcesItem).forEach(_key => {
              replenishData(_key, sources[key][sourcesIndex], target[key][sourcesIndex], true);
            });
          });
        } else {
          target[key] = [].concat(sources[key]);
        }
      } else {
        target[key] = sources[key];
      }
    } else {
      if (isObject(target[key])) {
        Object.keys(sources[key]).forEach(_key => {
          replenishData(_key, sources[key], target[key], isCover);
        });
      }
    }
  }
}

/**
 * 将opts的数据补充完整
 */
function calOptions() {
  let { config, opts } = this;
  replenishData('animation', config, opts);
  replenishData('animationDuration', config, opts);
  replenishData('animationTiming', config, opts);
  replenishData('backgroundColor', config, opts);
  replenishData('colors', config, opts);
  replenishData('padding', config, opts);
  replenishData('legend', config, opts);

  switch (opts.type) {
    case 'bar':
    case 'line':
    case 'scatter':
      if (opts.yAxis && opts.yAxis.type == 'category') {
        replenishData('show', config.xAxis, opts.yAxis);
        replenishData('type', config.xAxis, opts.yAxis);
        replenishData('boundaryGap', config.xAxis, opts.yAxis);
        replenishData('axisName', config.xAxis, opts.yAxis);
        replenishData('axisLabel', config.xAxis, opts.yAxis);
        replenishData('axisTick', config.xAxis, opts.yAxis);
        replenishData('axisLine', config.xAxis, opts.yAxis);
        replenishData('axisSplitLine', config.xAxis, opts.yAxis);
      } else {
        replenishData('yAxis', config, opts);
      }

      if (opts.xAxis && opts.xAxis.type == 'value') {
        replenishData('show', config.yAxis, opts.xAxis);
        replenishData('type', config.yAxis, opts.xAxis);
        replenishData('max', config.yAxis, opts.xAxis);
        replenishData('min', config.yAxis, opts.xAxis);
        replenishData('splitNumber', config.yAxis, opts.xAxis);
        replenishData('axisName', config.yAxis, opts.xAxis);
        replenishData('axisLabel', config.yAxis, opts.xAxis);
        replenishData('axisTick', config.yAxis, opts.xAxis);
        replenishData('axisLine', config.yAxis, opts.xAxis);
        replenishData('axisSplitLine', config.yAxis, opts.xAxis);
      } else {
        replenishData('xAxis', config, opts);
      }
    case 'radar':
      replenishData('radarAxis', config, opts);
      break
  }

  calSeries.call(this);

  console.log('complete calOptions', this);
}

/**
 * 将series的数据补充完整
 */
function calSeries() {
  let { config, opts } = this;

  switch (opts.type) {
    case 'bar':
      opts.series.forEach(seriesItem => {
        replenishData('label', config, seriesItem);
        replenishData('barMaxWidth', config.bar, seriesItem);
        replenishData('barMinWidth', config.bar, seriesItem);
        replenishData('barWidth', config.bar, seriesItem);
        replenishData('barGap', config.bar, seriesItem);
      });
      break
    case 'line':
      opts.series.forEach(seriesItem => {
        replenishData('label', config, seriesItem);
        replenishData('smooth', config.line, seriesItem);
        replenishData('connectNulls', config.line, seriesItem);
        replenishData('line', config.line, seriesItem);
        replenishData('symbol', config.line, seriesItem);
        replenishData('area', config.line, seriesItem);
      });
      break
    case 'scatter':
      opts.series.forEach(seriesItem => {
        replenishData('label', config, seriesItem);
        replenishData('color', config.scatter, seriesItem);
        replenishData('radius', config.scatter, seriesItem);
        replenishData('opacity', config.scatter, seriesItem);
      });
      break
    case 'pie':
      opts.series.forEach(seriesItem => {
        replenishData('label', config, seriesItem);
        replenishData('center', config.pie, seriesItem);
        replenishData('radius', config.pie, seriesItem);
        replenishData('labelLine', config.pie, seriesItem);
        replenishData('offsetAngle', config.pie, seriesItem);
        replenishData('disablePieStroke', config.pie, seriesItem);
      });
      break
    case 'radar':
      opts.series.forEach(seriesItem => {
        replenishData('label', config, seriesItem);
        replenishData('line', config.radar, seriesItem);
        replenishData('symbol', config.radar, seriesItem);
        replenishData('area', config.radar, seriesItem);
      });
      break
  }
}

var Timing = {
  easeIn: function(pos) {
    return Math.pow(pos, 3)
  },
  easeOut: function(pos) {
    return Math.pow(pos - 1, 3) + 1
  },
  easeInOut: function(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3)
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2)
    }
  },
  linear: function(pos) {
    return pos
  },
};

class Animation {
  constructor(opts) {
    this.isStop = false;

    let { type, animation, animationDuration, animationTiming, onProcess, onAnimationFinish } = opts;

    let createAnimationFrame = function() {
      if (typeof requestAnimationFrame !== 'undefined') {
        return requestAnimationFrame
      } else if (typeof setTimeout !== 'undefined') {
        return function(step) {
          setTimeout(function() {
            let timeStamp = +new Date();
            step(timeStamp);
          }, 17);
        }
      }
    };
    let animationFrame = createAnimationFrame();

    if (animation) {
      if (animationTiming == 'default') {
        switch (type) {
          case 'bar':
          case 'line':
          case 'scatter':
            animationTiming = 'easeIn';
            break
          case 'pie':
          case 'radar':
            animationTiming = 'easeInOut';
            break
        }
      }
      let timingFunction = Timing[animationTiming];
      let startTimeStamp = null;

      let step = function() {
        if (this.isStop === true) {
          onProcess(1);
          onAnimationFinish();
          return
        }

        let timeStamp = +new Date();
        if (!startTimeStamp) startTimeStamp = timeStamp;

        if (timeStamp - startTimeStamp < animationDuration) {
          let process = (timeStamp - startTimeStamp) / animationDuration;
          process = timingFunction(process);
          opts.onProcess(process);
          animationFrame(step);
        } else {
          onProcess(1);
          onAnimationFinish();
        }
      };
      step = step.bind(this);

      animationFrame(step);
    } else {
      onProcess(1);
      onAnimationFinish();
    }
  }

  /**
   * 停止动画
   */
  stop() {
    this.isStop = true;
  }
}

function calSeriesColor() {
  const colors = this.opts.colors;
  const colorsLength = colors.length;

  if (this.opts.type == 'pie') {
    this.opts.series.forEach(seriesItem => {
      seriesItem.data.forEach((dataItem, dataIndex) => {
        dataItem.itemStyle = dataItem.itemStyle || {};
        if (!dataItem.itemStyle.color) {
          dataItem.itemStyle.color = colors[dataIndex % colorsLength];
        }
      });
    });
  }
  if (this.opts.type == 'scatter') {
    this.opts.series.forEach((seriesItem, seriesIndex) => {
      seriesItem.itemStyle = seriesItem.itemStyle || {};
      if (!seriesItem.itemStyle.color) {
        seriesItem.itemStyle.color = seriesItem.color !== 'auto' ? seriesItem.color : colors[seriesIndex % colorsLength];
      }
    });
  } else {
    this.opts.series.forEach((seriesItem, seriesIndex) => {
      seriesItem.itemStyle = seriesItem.itemStyle || {};
      if (!seriesItem.itemStyle.color) {
        seriesItem.itemStyle.color = colors[seriesIndex % colorsLength];
      }
    });
  }

  console.log('complete calSeriesColor');
}

function calLegendData() {
  if (this.opts.legend.show) {
    let { context, opts } = this;
    let { type, width, legend, series } = opts;
    let { shapeWidth, shapeHeight, itemGap, marginTop, textStyle } = legend;
    let { fontSize, padding } = textStyle;
    let seriesDataList = [];
    let legendWidth = 0;
    let legendWidthNum = 0;
    let legendList = [];
    let currentRow = [];

    context.font = `${fontSize}px`;

    if (type == 'pie') {
      seriesDataList = series[0].data;
    } else {
      seriesDataList = series;
    }

    seriesDataList.forEach(seriesDataItem => {
      let { name, itemStyle } = seriesDataItem;
      let measureText = this.context.measureText(name || '').width;
      let itemWidth = shapeWidth + padding + itemGap + measureText;

      let obj = {
        name,
        measureText,
        itemStyle,
      };

      if (legendWidthNum + itemWidth > width) {
        legendList.push(currentRow);
        legendWidthNum = itemWidth;
        currentRow = [obj];
      } else {
        legendWidthNum += itemWidth;
        legendWidth = Math.max(legendWidth, legendWidthNum);
        currentRow.push(obj);
      }
    });

    if (legendList.length == 0) {
      legendList.push(currentRow);
    }
    this.legendData = {
      legendList,
      legendWidth: legendWidth - itemGap,
      legendHeight: legendList.length * Math.max(shapeHeight, fontSize) + (legendList.length - 1) * itemGap + marginTop,
    };
  } else {
    this.legendData = {
      legendList: [],
      legendWidth: 0,
      legendHeight: 0,
    };
  }

  console.log('complete calLegendData');
}

function calAxisYData() {
  let { context, opts, legendData, chartData } = this;
  let { width, height, padding, xAxis, yAxis, series } = opts;

  let {
    show: xAxisShow,
    type: xAxisType,
    data: xAxisData,
    boundaryGap: xAxisBoundaryGap,
    max: xAxisMax,
    min: xAxisMin,
    splitNumber: xAxisSplitNumber,
    format: xAxisFormat,
    axisName: xAxisName,
    axisLabel: xAxisLabel,
    axisTick: xAxisTick,
    axisLine: xAxisLine,
    axisSplitLine: xAxisSplitLine,
  } = xAxis;

  let {
    show: yAxisShow,
    type: yAxisType,
    data: yAxisData,
    boundaryGap: yAxisBoundaryGap,
    max: yAxisMax,
    min: yAxisMin,
    splitNumber: yAxisSplitNumber,
    format: yAxisFormat,
    axisName: yAxisName,
    axisLabel: yAxisLabel,
    axisTick: yAxisTick,
    axisLine: yAxisLine,
    axisSplitLine: yAxisSplitLine,
  } = yAxis;

  let { show: xAxisNameShow, textStyle: xAxisNameTextStyle, gap: xAxisNameGap, text: xAxisNameText } = xAxisName;
  let { show: xAxisLabelShow, textStyle: xAxisLabelTextStyle, gap: xAxisLabelGap, rotate: xAxisLabelRotate, showIndex: xAxisLabelShowIndex } = xAxisLabel;
  let { show: xAxisTickShow, lineStyle: xAxisTickStyle, length: xAxisTickLength, alignWithLabel: xAxisTickAlign, showIndex: xAxisTickShowIndex } = xAxisTick;
  let { show: xAxisLineShow, lineStyle: xAxisLineStyle } = xAxisLine;
  let { show: xAxisSplitLineShow, lineStyle: xAxisSplitLineStyle, alignWithLabel: xAxisSplitLineAlign, showIndex: xAxisSplitLineShowIndex } = xAxisSplitLine;

  let { show: yAxisNameShow, textStyle: yAxisNameTextStyle, gap: yAxisNameGap, text: yAxisNameText } = yAxisName;
  let { show: yAxisLabelShow, textStyle: yAxisLabelTextStyle, gap: yAxisLabelGap, showIndex: yAxisLabelShowIndex } = yAxisLabel;
  let { show: yAxisTickShow, lineStyle: yAxisTickStyle, length: yAxisTickLength, alignWithLabel: yAxisTickAlign, showIndex: yAxisTickShowIndex } = yAxisTick;
  let { show: yAxisLineShow, lineStyle: yAxisLineStyle } = yAxisLine;
  let { show: yAxisSplitLineShow, lineStyle: yAxisSplitLineStyle, alignWithLabel: yAxisSplitLineAlign, showIndex: yAxisSplitLineShowIndex } = yAxisSplitLine;

  let { fontSize: xAxisNameFontSize } = xAxisNameTextStyle;
  let { fontSize: xAxisLabelFontSize } = xAxisLabelTextStyle;
  let { lineWidth: xAxisTickLineWidth } = xAxisTickStyle;
  let { lineWidth: xAxisLineWidth } = xAxisLineStyle;
  let { lineWidth: xAxisSplitLineWidth } = xAxisSplitLineStyle;

  let { fontSize: yAxisNameFontSize } = yAxisNameTextStyle;
  let { fontSize: yAxisLabelFontSize } = yAxisLabelTextStyle;
  let { lineWidth: yAxisTickLineWidth } = yAxisTickStyle;
  let { lineWidth: yAxisLineWidth } = yAxisLineStyle;
  let { lineWidth: yAxisSplitLineWidth } = yAxisSplitLineStyle;

  // 以x,y轴交叉点为原点
  let xStart = padding[3]; // x方向起点
  let xEnd = width - padding[1]; // x方向终点
  let yStart = height - padding[2] - legendData.legendHeight; // y方向起点
  let yEnd = padding[0]; // y方向终点
  let xStartInit = xStart;
  let yStartInit = yStart;

  let yIsSamePart = true, // y轴是否同时为正数或负数，为false时同时存在正负数
    xIsSamePart = true, // x轴是否同时为正数或负数，为false时同时存在正负数
    yZero, // y轴零线的y坐标
    yPlusSpacing,
    yMinusSpacing,
    ySpacing,
    yEachSpacing,
    xZero, // x轴零线的x坐标
    xPlusSpacing,
    xMinusSpacing,
    xSpacing,
    xEachSpacing,
    yMaxData,
    yMinData,
    yDataRange,
    xMaxData,
    xMinData,
    xDataRange;

  chartData.axisData = {
    xStart: null,
    xEnd: null,
    yStart: null,
    yEnd: null,

    yIsSamePart: null,
    xIsSamePart: null,

    yZero: null,
    yPlusSpacing: null,
    yMinusSpacing: null,
    ySpacing: null,
    yEachSpacing: null,
    xZero: null,
    xPlusSpacing: null,
    xMinusSpacing: null,
    xSpacing: null,
    xEachSpacing: null,

    yMaxData: null,
    yMinData: null,
    yDataRange: null,
    xMaxData: null,
    xMinData: null,
    xDataRange: null,

    xAxisLabelPoint: [],
    xAxisTickPoint: [],
    xAxisLinePoint: {},
    xAxisSplitLinePoint: [],
    xAxisNamePoint: {},

    yAxisLabelPoint: [],
    yAxisTickPoint: [],
    yAxisLinePoint: {},
    yAxisSplitLinePoint: [],
    yAxisNamePoint: {},
  };

  function calAxisValue(axis = 'x') {
    let allDataArr = [];
    if (xAxisType == 'value' && yAxisType == 'value') {
      allDataArr = series.reduce((allDataArr, seriesItem) => {
        let dataArr = seriesItem.data.reduce((dataArr, dataItem) => {
          dataArr.push(dataItem[axis]);
          return dataArr
        }, []);
        return allDataArr.concat(dataArr)
      }, []);
    } else {
      allDataArr = series.reduce((allDataArr, seriesItem) => {
        return allDataArr.concat(seriesItem.data)
      }, []);
    }

    let axisLabelDataArr = [];
    let splitNumber = axis == 'x' ? xAxisSplitNumber : yAxisSplitNumber;
    let max = axis == 'x' ? xAxisMax : yAxisMax;
    let min = axis == 'x' ? xAxisMin : yAxisMin;
    let maxData = Math.max(...allDataArr);
    let minData = Math.min(...allDataArr);
    let dataRange = 0;
    let dataEachRange = 0;
    let limit = 1;
    let multiple = 1;
    console.log(`首次获取${axis}轴数据, maxData: ${maxData}, minData: ${minData}, dataRange: ${dataRange}`, allDataArr);

    max = max == 'auto' ? max : Number(max);
    min = min == 'auto' ? min : Number(min);

    // 判断是否传入max,min
    if (max == 'auto' || min == 'auto') {
      if (max == 'auto') {
        maxData = maxData <= 0 && minData <= 0 ? 0 : maxData;
      } else {
        maxData = max;
      }
      if (min == 'auto') {
        minData = maxData >= 0 && minData >= 0 ? 0 : minData;
      } else {
        minData = min;
      }
      dataRange = maxData - minData;
      console.log(`修正数据, max: ${max}, min: ${min}, maxData = ${maxData}, minData = ${minData}`);
      console.log(`修正数据范围, dataRange = ${dataRange}`);
    } else {
      maxData = max;
      minData = min;
      dataRange = maxData - minData;
      console.log(`修正数据, max: ${max}, min: ${min}, maxData: ${maxData}, minData: ${minData}`);
      console.log(`固定数据范围, dataRange = ${dataRange}`);
    }

    // 是否同时为正数或负数，为false时同时存在正负数
    let isSamePart = maxData > 0 && minData < 0 ? false : true;

    if (dataRange >= 10000) {
      limit = 1000;
      console.log(`dataRange>=10000`);
    } else if (dataRange >= 1000) {
      limit = 100;
      console.log(`dataRange>=1000`);
    } else if (dataRange >= 100) {
      limit = 10;
      console.log(`dataRange>=100`);
    } else if (dataRange >= 10) {
      limit = 5;
      console.log(`dataRange>=10`);
    } else if (dataRange >= 1) {
      limit = 0.1;
      console.log(`dataRange>=1`);
    } else if (dataRange >= 0.1) {
      limit = 0.01;
      console.log(`dataRange>=0.1`);
    } else if (dataRange >= 0.01) {
      limit = 0.001;
      console.log(`dataRange>=0.01`);
    } else if (dataRange >= 0.001) {
      limit = 0.0001;
      console.log(`dataRange>=0.001`);
    } else {
      limit = 0.00001;
      console.log(`dataRange<0.0001`);
    }

    while (limit < 1) {
      limit *= 10;
      multiple *= 10;
      console.log(`limit<1, limit: ${limit}, multiple: ${multiple}`);
    }
    console.log(`limit = ${limit}, multiple = ${multiple}`);

    if (max == 'auto' && min == 'auto') {
      if (maxData >= 0 && minData >= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        maxData = minData + dataRange;
        console.log(`同为正数且 max: auto, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else if (maxData <= 0 && minData <= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Math.floor(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        minData = maxData - dataRange;
        console.log(`同为负数且 max: auto, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);

        axisLabelDataArr.push(0);

        let data = 0;
        while (data < maxData) {
          data += dataEachRange;
          axisLabelDataArr.push(data);
        }
        maxData = data;

        data = 0;
        while (data > minData) {
          data -= dataEachRange;
          axisLabelDataArr.unshift(data);
        }
        minData = data;
        dataRange = maxData - minData;
        console.log(`修正数据, maxData = ${maxData}, minData = ${minData}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`正负数且 max: auto, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      }
    }

    if (max == 'auto' && typeof min == 'number') {
      if (maxData >= 0 && minData >= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        maxData = minData + dataRange;
        console.log(`同为正数且 max: auto, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else if (maxData <= 0 && minData <= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Number((dataRange / splitNumber).toFixed(2));
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`同为负数且 max: auto, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);

        axisLabelDataArr.push(0);

        let data = 0;
        while (data < maxData) {
          data += dataEachRange;
          axisLabelDataArr.push(data);
        }
        maxData = data;

        data = 0;
        while (data - dataEachRange > minData) {
          data -= dataEachRange;
          axisLabelDataArr.unshift(data);
        }
        axisLabelDataArr.unshift(minData);

        dataRange = maxData - minData;
        console.log(`修正数据, maxData = ${maxData}, minData = ${minData}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`正负数且 max: auto, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      }
    }

    if (typeof max == 'number' && min == 'auto') {
      console.log(`max: ${max}, min: auto`);

      if (maxData >= 0 && minData >= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Number((dataRange / splitNumber).toFixed(2));
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`同为正数且 max: ${max}, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else if (maxData <= 0 && minData <= 0) {
        dataRange = dataRange * multiple;
        dataEachRange = Math.floor(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        dataRange = dataEachRange * splitNumber;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        minData = maxData - dataRange;
        console.log(`同为负数且 max: ${max}, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);
        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);

        axisLabelDataArr.push(0);

        let data = 0;
        while (data + dataEachRange < maxData) {
          data += dataEachRange;
          axisLabelDataArr.push(data);
        }
        axisLabelDataArr.push(maxData);

        data = 0;
        while (data > minData) {
          data -= dataEachRange;
          axisLabelDataArr.unshift(data);
        }
        minData = data;

        dataRange = maxData - minData;
        console.log(`修正数据, maxData = ${maxData}, minData = ${minData}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`正负数且 max: ${max}, min: auto, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      }
    }

    if (typeof max == 'number' && typeof min == 'number') {
      console.log(`max: ${max}, min: ${min}`);

      if (maxData >= 0 && minData >= 0) {
        dataEachRange = Number((dataRange / splitNumber).toFixed(2));
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`同为正数且 max: ${max}, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else if (maxData <= 0 && minData <= 0) {
        dataEachRange = Number((dataRange / splitNumber).toFixed(2));
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);
        console.log(`同为负数且 max: ${max}, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      } else {
        dataRange = dataRange * multiple;
        dataEachRange = Math.ceil(dataRange / splitNumber);

        while (dataEachRange % limit !== 0) {
          dataEachRange += 1;
        }
        dataEachRange = dataEachRange / multiple;
        console.log(`修正数据间隔, dataEachRange = ${dataEachRange}, splitNumber = ${splitNumber}`);

        axisLabelDataArr.push(0);

        let data = 0;
        while (data + dataEachRange < maxData) {
          data += dataEachRange;
          axisLabelDataArr.push(data);
        }
        axisLabelDataArr.push(maxData);

        data = 0;
        while (data - dataEachRange > minData) {
          data -= dataEachRange;
          axisLabelDataArr.unshift(data);
        }
        axisLabelDataArr.unshift(minData);

        dataRange = maxData - minData;
        console.log(`修正数据, maxData = ${maxData}, minData = ${minData}`);
        console.log(`修正数据范围, dataRange = ${dataRange}`);
        console.log(`正负数且 max: ${max}, min: ${min}, dataRange = ${dataRange}, dataEachRange = ${dataEachRange}, maxData: ${maxData}, minData: ${minData}`);
      }
    }

    if (isSamePart) {
      for (let i = 0; i <= splitNumber; i++) {
        let data = minData + dataEachRange * i;
        data = data.toFixed(multiple.toString().length - 1);
        axisLabelDataArr.push(Number(data));
      }
    }

    if (axis == 'x') {
      xDataRange = dataRange;
      xMaxData = maxData;
      xMinData = minData;
      xIsSamePart = isSamePart;
    } else {
      yDataRange = dataRange;
      yMaxData = maxData;
      yMinData = minData;
      yIsSamePart = isSamePart;
    }

    console.log(`complete calAxisValue ${axis}`, axisLabelDataArr);

    return axisLabelDataArr
  }

  // 计算xAxisLabelDataArr, yAxisLabelDataArr
  let xAxisLabelDataArr = xAxisType == 'category' ? xAxisData : calAxisValue('x');
  let yAxisLabelDataArr = yAxisType == 'category' ? yAxisData : calAxisValue('y');

  // 计算 xAxisLabelTextArr, xAxisLabelMaxHeight
  context.font = `${xAxisLabelFontSize}px`;
  let xAxisLabelMaxWidth = 0;
  let xAxisLabelMaxHeight = 0;
  let xAxisLabelTextArr = xAxisLabelDataArr.reduce((xAxisLabelTextArr, dataItem, dataIndex) => {
    let text = xAxisFormat ? xAxisFormat(dataItem) : dataItem;
    xAxisLabelMaxWidth = Math.max(context.measureText(text).width, xAxisLabelMaxWidth);
    xAxisLabelTextArr.push(text);
    return xAxisLabelTextArr
  }, []);

  xAxisLabelRotate = Number(xAxisLabelRotate);

  if (xAxisLabelRotate == 0) {
    xAxisLabelMaxHeight = xAxisLabelFontSize;
  } else {
    console.log(123, xAxisLabelRotate, Math.sin((xAxisLabelRotate * Math.PI) / 180));
    xAxisLabelMaxHeight =
      Math.abs(xAxisLabelMaxWidth * Math.sin((xAxisLabelRotate * Math.PI) / 180)) + Math.abs(xAxisLabelFontSize * Math.cos((xAxisLabelRotate * Math.PI) / 180));
  }

  // 计算yAxisLabelTextArr, yAxisLabelMaxWidth
  context.font = `${yAxisLabelFontSize}px`;
  let yAxisLabelMaxWidth = 0;
  let yAxisLabelTextArr = yAxisLabelDataArr.reduce((yAxisLabelTextArr, dataItem, dataIndex) => {
    let text = yAxisFormat ? yAxisFormat(dataItem) : dataItem;
    yAxisLabelMaxWidth = Math.max(context.measureText(text).width, xAxisLabelMaxWidth);
    yAxisLabelTextArr.push(text);
    return yAxisLabelTextArr
  }, []);

  let xSpacingNumber = 0;
  if (xAxisType == 'category') {
    xSpacingNumber = xAxisBoundaryGap ? xAxisLabelDataArr.length : xAxisLabelDataArr.length - 1;
  } else {
    xSpacingNumber = xAxisLabelDataArr.length - 1;
  }

  let ySpacingNumber = 0;
  if (yAxisType == 'category') {
    ySpacingNumber = yAxisBoundaryGap ? yAxisLabelDataArr.length : yAxisLabelDataArr.length - 1;
  } else {
    ySpacingNumber = yAxisLabelDataArr.length - 1;
  }

  // 修正yStart
  if (xAxisShow && xAxisLabelShow) {
    yStart -= xAxisLabelMaxHeight + xAxisLabelGap;
  }
  if (xAxisShow && xAxisTickShow) {
    if ((yAxisType == 'value' && yIsSamePart) || yAxisType == 'category') {
      yStart -= xAxisTickLength;
    }
  }
  if (yIsSamePart) {
    if (xAxisShow && xAxisLineShow) {
      yStart -= xAxisLineWidth / 2;
    }
  } else {
    if (xAxisShow && xAxisSplitLineShow) {
      yStart -= xAxisSplitLineWidth / 2;
    }
  }

  // 修正yEnd
  if (yAxisShow && yAxisNameShow) {
    yEnd += yAxisNameFontSize + yAxisNameGap;
  }
  ySpacing = yStart - yEnd;
  console.log(`初始ySpacing数据, yStart = ${yStart}, yEnd = ${yEnd}, ySpacing = ${ySpacing}`);
  yEachSpacing = Math.floor(ySpacing / ySpacingNumber);
  yEnd = yStart - yEachSpacing * ySpacingNumber;
  ySpacing = yStart - yEnd;
  console.log(`修正ySpacing数据, yStart = ${yStart}, yEnd = ${yEnd}, ySpacing = ${ySpacing}`);

  // 修正xStart
  if (yAxisLabelShow) {
    xStart += yAxisLabelMaxWidth + yAxisLabelGap;
  }
  if (yAxisShow && yAxisTickShow) {
    if ((xAxisType == 'value' && xIsSamePart) || xAxisType == 'category') {
      xStart += yAxisTickLength;
    }
  }
  if (xIsSamePart) {
    if (yAxisShow && yAxisLineShow) {
      xStart += yAxisLineWidth / 2;
    }
  } else {
    if (yAxisShow && yAxisSplitLineShow) {
      xStart += yAxisSplitLineWidth / 2;
    }
  }

  // 修正xEnd
  if (xAxisShow && xAxisNameShow) {
    context.font = `${xAxisNameFontSize}px`;
    let xAxisNameTextWidth = context.measureText(xAxisNameText).width;
    xEnd -= xAxisNameTextWidth + xAxisNameGap;
  }
  xSpacing = xEnd - xStart;
  console.log(`初始xSpacing数据, xStart = ${xStart}, xEnd = ${xEnd}, xSpacing = ${xSpacing}`);
  xEachSpacing = Math.floor(xSpacing / xSpacingNumber);
  xEnd = xStart + xEachSpacing * xSpacingNumber;
  xSpacing = xEnd - xStart;
  console.log(`修正xSpacing数据, xStart = ${xStart}, xEnd = ${xEnd}, xSpacing = ${xSpacing}`);

  // 计算yZero
  if (yAxisType == 'value' && !yIsSamePart) {
    yAxisLabelDataArr.reduce((arr, item, index) => {
      if (index == 0) {
        arr.push({
          y: yStart,
        });
      } else {
        let spacing = (Math.abs(yAxisLabelDataArr[index - 1] - yAxisLabelDataArr[index]) * ySpacing) / yDataRange;

        arr.push({
          y: arr[index - 1].y - spacing,
        });
      }

      if (item == 0) {
        yZero = arr[index].y; // 存在正负值时计算0线的y坐标
        console.log(`yZero = ${yZero}`);
      }

      if (index + 1 == yAxisLabelDataArr.length) {
        yEnd = arr[index].y;
        ySpacing = yStart - yEnd;
        console.log(`修正yEnd, yEnd = ${yEnd}`);
        console.log(`修正ySpacing, ySpacing = ${ySpacing}`);
        yPlusSpacing = yZero - yEnd;
        yMinusSpacing = yStart - yZero;
      }

      return arr
    }, []);
  }

  // 计算xZero
  if (xAxisType == 'value' && !xIsSamePart) {
    xAxisLabelDataArr.reduce((arr, item, index) => {
      if (index == 0) {
        arr.push({
          x: xStart,
        });
      } else {
        let spacing = (Math.abs(xAxisLabelDataArr[index] - xAxisLabelDataArr[index - 1]) * xSpacing) / xDataRange;
        arr.push({
          x: arr[index - 1].x + spacing,
        });
      }

      if (item == 0) {
        xZero = arr[index].x; // 存在正负值时计算0线的x坐标
        console.log(`xZero = ${xZero}`);
      }

      if (index + 1 == xAxisLabelDataArr.length) {
        xEnd = arr[index].x;
        xSpacing = xEnd - xStart;
        console.log(`修正xEnd, xEnd = ${xEnd}`);
        console.log(`修正xSpacing, xSpacing = ${xSpacing}`);
        xPlusSpacing = xEnd - xZero;
        xMinusSpacing = xZero - xStart;
      }

      return arr
    }, []);
  }

  // 计算 yAxis 各项数据
  if (yAxisType == 'value') {
    let _xStart = xStartInit;
    if (yAxisShow && yAxisLabelShow) {
      _xStart += yAxisLabelMaxWidth; // 更新_xStart数据
    }

    // 计算 yAxisLabelPoint
    chartData.axisData.yAxisLabelPoint = yAxisLabelTextArr.reduce((yAxisLabelPoint, item, index) => {
      if (index == 0) {
        yAxisLabelPoint.push({
          text: item,
          x: _xStart,
          y: yStart,
        });
      } else {
        let spacing = (Math.abs(yAxisLabelDataArr[index - 1] - yAxisLabelDataArr[index]) * ySpacing) / yDataRange;

        yAxisLabelPoint.push({
          text: item,
          x: _xStart,
          y: yAxisLabelPoint[index - 1].y - spacing,
        });
      }

      return yAxisLabelPoint
    }, []);

    // 计算 yAxisSplitLinePoint
    if (yAxisShow && yAxisSplitLineShow) {
      let _xStart = xStartInit;
      if (yAxisShow && yAxisLabelShow) {
        _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
      }
      if (yAxisShow && yAxisTickShow) {
        if (xIsSamePart) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
      }

      chartData.axisData.yAxisSplitLinePoint = chartData.axisData.yAxisLabelPoint.reduce((yAxisSplitLinePoint, item, index) => {
        yAxisSplitLinePoint.push({
          startX: _xStart, // 起点x坐标
          startY: item.y, // 起点y坐标
          endX: xEnd, // 终点x坐标
          endY: item.y, // 终点y坐标
        });
        return yAxisSplitLinePoint
      }, []);
    }

    // 计算 yAxisTickPoint
    if (yAxisShow && yAxisTickShow) {
      let _xStart = xStartInit;

      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
      } else {
        _xStart = xZero - xAxisLineWidth / 2 - yAxisTickLength;
      }

      chartData.axisData.yAxisTickPoint = chartData.axisData.yAxisLabelPoint.reduce((yAxisTickPoint, item, index) => {
        yAxisTickPoint.push({
          startX: _xStart, // 起点x坐标
          startY: item.y, // 起点y坐标
          endX: _xStart + yAxisTickLength, // 终点x坐标
          endY: item.y, // 终点y坐标
        });
        return yAxisTickPoint
      }, []);
    }

    // 计算 yAxisLinePoint
    if (yAxisShow && yAxisLineShow) {
      let _xStart = xStartInit;
      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
        if (yAxisShow && yAxisTickShow) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
        _xStart += yAxisLineWidth / 2;
      } else {
        _xStart = xZero;
      }

      chartData.axisData.yAxisLinePoint = {
        startX: _xStart, // 起点x坐标
        startY: yStart, // 起点y坐标
        endX: _xStart, // 终点x坐标
        endY: yEnd - yAxisTickLineWidth / 2, // 终点y坐标
      };
    }

    // 计算 yAxisNamePoint
    if (yAxisShow && yAxisNameShow) {
      let _xStart = xStartInit;
      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
        if (yAxisShow && yAxisTickShow) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
        if (yAxisShow && yAxisLineShow) {
          _xStart += yAxisLineWidth / 2; // 更新_xStart数据
        }
      } else {
        _xStart = xZero;
      }

      chartData.axisData.yAxisNamePoint = {
        text: yAxisNameText,
        x: _xStart,
        y: yEnd - yAxisNameGap,
      };
    }
  }

  // 计算 xAxis 各项数据
  if (xAxisType == 'value') {
    let _yStart = yStartInit;
    if (xAxisShow && xAxisLabelShow) {
      _yStart -= xAxisLabelMaxHeight; // 更新_yStart数据
    }

    // 计算 xAxisLabelPoint
    chartData.axisData.xAxisLabelPoint = xAxisLabelTextArr.reduce((xAxisLabelPoint, item, index) => {
      if (index == 0) {
        xAxisLabelPoint.push({
          text: item,
          x: xStart,
          y: _yStart,
        });
      } else {
        let spacing = (Math.abs(xAxisLabelDataArr[index] - xAxisLabelDataArr[index - 1]) * xSpacing) / xDataRange;

        xAxisLabelPoint.push({
          text: item,
          x: xAxisLabelPoint[index - 1].x + spacing,
          y: _yStart,
        });
      }

      return xAxisLabelPoint
    }, []);

    // 计算 xAxisSplitLinePoint
    if (xAxisShow && xAxisSplitLineShow) {
      let _yStart = yStartInit;
      if (xAxisShow && xAxisLabelShow) {
        _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
      }
      if (xAxisShow && xAxisTickShow) {
        if (yIsSamePart) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
      }

      chartData.axisData.xAxisSplitLinePoint = chartData.axisData.xAxisLabelPoint.reduce((xAxisSplitLinePoint, item, index) => {
        xAxisSplitLinePoint.push({
          startX: item.x, // 起点x坐标
          startY: _yStart, // 起点y坐标
          endX: item.x, // 终点x坐标
          endY: yEnd, // 终点y坐标
        });
        return xAxisSplitLinePoint
      }, []);
    }

    // 计算 xAxisTickPoint
    if (xAxisShow && xAxisTickShow) {
      let _yStart = yStartInit;
      if (yIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
      } else {
        _yStart = yZero + xAxisLineWidth / 2 + yAxisTickLength;
      }

      chartData.axisData.xAxisTickPoint = chartData.axisData.xAxisLabelPoint.reduce((xAxisTickPoint, item, index) => {
        xAxisTickPoint.push({
          startX: item.x, // 起点x坐标
          startY: _yStart, // 起点y坐标
          endX: item.x, // 终点x坐标
          endY: _yStart - xAxisTickLength, // 终点y坐标
        });
        return xAxisTickPoint
      }, []);
    }

    // 计算 xAxisLinePoint
    if (xAxisShow && xAxisLineShow) {
      let _yStart = yStartInit;
      if (yIsSamePart) {
        if (xAxisShow && xAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
        if (xAxisShow && xAxisTickShow) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
        _yStart -= xAxisLineWidth / 2;
      } else {
        _yStart = yZero;
      }

      chartData.axisData.xAxisLinePoint = {
        startX: xStart, // 起点x坐标
        startY: _yStart, // 起点y坐标
        endX: xEnd + xAxisTickLineWidth / 2, // 终点x坐标
        endY: _yStart, // 终点y坐标
      };
    }

    // 计算 xAxisNamePoint
    if (xAxisShow && xAxisNameShow) {
      let _yStart = yStartInit;
      if (xIsSamePart) {
        if (xAxisShow && xAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
        if (xAxisShow && xAxisTickShow) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
        if (xAxisShow && xAxisLineShow) {
          _yStart -= xAxisLineWidth / 2; // 更新_yStart数据
        }
      } else {
        _yStart = yZero;
      }

      chartData.axisData.xAxisNamePoint = {
        text: xAxisNameText,
        x: xEnd + xAxisNameGap,
        y: _yStart,
      };
    }
  }

  // 计算 yAxis 各项数据
  if (yAxisType == 'category') {
    // 计算 yAxisLabelPoint
    chartData.axisData.yAxisLabelPoint = yAxisLabelTextArr.reduce((yAxisLabelPoint, item, index) => {
      let _xStart = xStartInit;
      if (yAxisShow && yAxisLabelShow) {
        _xStart += yAxisLabelMaxWidth; // 更新_xStart数据
      }

      if (yAxisBoundaryGap) {
        yAxisLabelPoint.push({
          show: true,
          text: item,
          x: _xStart,
          y: yStart - yEachSpacing * (index + 1) + yEachSpacing / 2,
        });
      } else {
        yAxisLabelPoint.push({
          show: true,
          text: item,
          x: _xStart,
          y: yStart - yEachSpacing * index,
        });
      }

      return yAxisLabelPoint
    }, []);

    if (yAxisLabelShowIndex && yAxisLabelShowIndex.length) {
      chartData.axisData.yAxisLabelPoint = chartData.axisData.yAxisLabelPoint.map((item, index) => {
        let isShow = yAxisLabelShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 yAxisSplitLinePoint
    if (yAxisShow && yAxisSplitLineShow) {
      let _xStart = xStartInit;
      if (yAxisShow && yAxisLabelShow) {
        _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
      }
      if (yAxisShow && yAxisTickShow) {
        if (xIsSamePart) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
      }

      // yAxisSplitLineAlign为true时，刻度线与标签对齐
      let yAxisSplitLineNumber = 0;
      if (yAxisBoundaryGap) {
        yAxisSplitLineNumber = yAxisSplitLineAlign ? yAxisLabelDataArr.length : yAxisLabelDataArr.length + 1;
      } else {
        yAxisSplitLineNumber = yAxisLabelDataArr.length;
      }

      for (let index = 0; index < yAxisSplitLineNumber; index++) {
        if (yAxisBoundaryGap && yAxisSplitLineAlign) {
          chartData.axisData.yAxisSplitLinePoint.push({
            show: true,
            startX: _xStart,
            startY: yStart - yEachSpacing * index - yEachSpacing / 2,
            endX: xEnd,
            endY: yStart - yEachSpacing * index - yEachSpacing / 2,
          });
        } else {
          chartData.axisData.yAxisSplitLinePoint.push({
            show: true,
            startX: _xStart,
            startY: yStart - yEachSpacing * index,
            endX: xEnd,
            endY: yStart - yEachSpacing * index,
          });
        }
      }
    }

    if (yAxisSplitLineShowIndex && yAxisSplitLineShowIndex.length) {
      chartData.axisData.yAxisSplitLinePoint = chartData.axisData.yAxisSplitLinePoint.map((item, index) => {
        let isShow = yAxisSplitLineShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 yAxisTickPoint
    if (yAxisShow && yAxisTickShow) {
      let _xStart = xStartInit;

      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
      } else {
        _xStart = xZero - yAxisLineWidth / 2 - yAxisTickLength;
      }

      // yAxisTickAlign为true时，刻度线与标签对齐
      let yAxisTickNumber = 0;
      if (yAxisBoundaryGap) {
        yAxisTickNumber = yAxisTickAlign ? yAxisLabelDataArr.length : yAxisLabelDataArr.length + 1;
      } else {
        yAxisTickNumber = yAxisLabelDataArr.length;
      }

      for (let index = 0; index < yAxisTickNumber; index++) {
        if (yAxisBoundaryGap && yAxisTickAlign) {
          chartData.axisData.yAxisTickPoint.push({
            show: true,
            startX: _xStart,
            startY: yStart - yEachSpacing * index - yEachSpacing / 2,
            endX: _xStart + yAxisTickLength,
            endY: yStart - yEachSpacing * index - yEachSpacing / 2,
          });
        } else {
          chartData.axisData.yAxisTickPoint.push({
            show: true,
            startX: _xStart,
            startY: yStart - yEachSpacing * index,
            endX: _xStart + yAxisTickLength,
            endY: yStart - yEachSpacing * index,
          });
        }
      }
    }

    if (yAxisTickShowIndex && yAxisTickShowIndex.length) {
      chartData.axisData.yAxisTickPoint = chartData.axisData.yAxisTickPoint.map((item, index) => {
        let isShow = yAxisTickShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 yAxisLinePoint
    if (yAxisShow && yAxisLineShow) {
      let _xStart = xStartInit;
      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
        if (yAxisShow && yAxisTickShow) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
        _xStart += yAxisLineWidth / 2;
      } else {
        _xStart = xZero;
      }

      chartData.axisData.yAxisLinePoint = {
        startX: _xStart,
        startY: yStart,
        endX: _xStart,
        endY: yEnd - yAxisTickLineWidth / 2,
      };
    }

    // 计算 yAxisNamePoint
    if (yAxisShow && yAxisNameShow) {
      let _xStart = xStartInit;
      if (xIsSamePart) {
        if (yAxisShow && yAxisLabelShow) {
          _xStart += yAxisLabelMaxWidth + yAxisLabelGap; // 更新_xStart数据
        }
        if (yAxisShow && yAxisTickShow) {
          _xStart += yAxisTickLength; // 更新_xStart数据
        }
        if (yAxisShow && yAxisLineShow) {
          _xStart += yAxisLineWidth / 2; // 更新_xStart数据
        }
      } else {
        _xStart = xZero;
      }

      chartData.axisData.yAxisNamePoint = {
        text: yAxisNameText,
        x: _xStart,
        y: yEnd - yAxisNameGap,
      };
    }
  }

  // 计算 xAxis 各项数据
  if (xAxisType == 'category') {
    // 计算 xAxisLabelPoint
    chartData.axisData.xAxisLabelPoint = xAxisLabelTextArr.reduce((xAxisLabelPoint, item, index) => {
      let _yStart = yStartInit;
      if (xAxisShow && xAxisLabelShow) {
        _yStart -= xAxisLabelMaxHeight; // 更新_yStart数据
      }

      if (xAxisBoundaryGap) {
        xAxisLabelPoint.push({
          show: true,
          text: item,
          x: xStart + xEachSpacing * (index + 1) - xEachSpacing / 2,
          y: _yStart,
        });
      } else {
        xAxisLabelPoint.push({
          show: true,
          text: item,
          x: xStart + xEachSpacing * index,
          y: _yStart,
        });
      }
      return xAxisLabelPoint
    }, []);

    if (xAxisLabelShowIndex && xAxisLabelShowIndex.length) {
      chartData.axisData.xAxisLabelPoint = chartData.axisData.xAxisLabelPoint.map((item, index) => {
        let isShow = xAxisLabelShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 xAxisSplitLinePoint
    if (xAxisShow && xAxisSplitLineShow) {
      let _yStart = yStartInit;
      if (xAxisShow && xAxisLabelShow) {
        _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
      }
      if (xAxisShow && xAxisTickShow) {
        if (yIsSamePart) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
      }

      // xAxisSplitLineAlign为true时，网格线与标签对齐
      let xAxisSplitLineNumber = 0;
      if (xAxisBoundaryGap) {
        xAxisSplitLineNumber = xAxisSplitLineAlign ? xAxisLabelDataArr.length : xAxisLabelDataArr.length + 1;
      } else {
        xAxisSplitLineNumber = xAxisLabelDataArr.length;
      }

      for (let index = 0; index < xAxisSplitLineNumber; index++) {
        if (xAxisBoundaryGap && xAxisSplitLineAlign) {
          chartData.axisData.xAxisSplitLinePoint.push({
            show: true,
            startX: xStart + xEachSpacing * index + xEachSpacing / 2,
            startY: _yStart,
            endX: xStart + xEachSpacing * index + xEachSpacing / 2,
            endY: yEnd,
          });
        } else {
          chartData.axisData.xAxisSplitLinePoint.push({
            show: true,
            startX: xStart + xEachSpacing * index,
            startY: _yStart,
            endX: xStart + xEachSpacing * index,
            endY: yEnd,
          });
        }
      }
    }

    if (xAxisSplitLineShowIndex && xAxisSplitLineShowIndex.length) {
      chartData.axisData.xAxisSplitLinePoint = chartData.axisData.xAxisSplitLinePoint.map((item, index) => {
        let isShow = xAxisSplitLineShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 xAxisTickPoint
    if (xAxisShow && xAxisTickShow) {
      let _yStart = yStartInit;

      if (yIsSamePart) {
        if (xAxisShow && xAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
        if (xAxisShow && xAxisTickShow) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
      } else {
        _yStart = yZero - xAxisLineWidth / 2;
      }

      // xAxisTickAlign为true时，刻度线与标签对齐
      let xAxisTickNumber = 0;
      if (xAxisBoundaryGap) {
        xAxisTickNumber = xAxisTickAlign ? xAxisLabelDataArr.length : xAxisLabelDataArr.length + 1;
      } else {
        xAxisTickNumber = xAxisLabelDataArr.length;
      }

      for (let index = 0; index < xAxisTickNumber; index++) {
        if (xAxisBoundaryGap && xAxisTickAlign) {
          chartData.axisData.xAxisTickPoint.push({
            show: true,
            startX: xStart + xEachSpacing * index + xEachSpacing / 2,
            startY: _yStart,
            endX: xStart + xEachSpacing * index + xEachSpacing / 2,
            endY: _yStart + xAxisTickLength,
          });
        } else {
          chartData.axisData.xAxisTickPoint.push({
            show: true,
            startX: xStart + xEachSpacing * index,
            startY: _yStart,
            endX: xStart + xEachSpacing * index,
            endY: _yStart + xAxisTickLength,
          });
        }
      }
    }

    if (xAxisTickShowIndex && xAxisTickShowIndex.length) {
      chartData.axisData.xAxisTickPoint = chartData.axisData.xAxisTickPoint.map((item, index) => {
        let isShow = xAxisTickShowIndex.some(showIndex => {
          return showIndex === index
        });

        if (isShow) {
          item.show = true;
        } else {
          item.show = false;
        }

        return item
      });
    }

    // 计算 xAxisLinePoint
    if (xAxisShow && xAxisLineShow) {
      let _yStart = yStartInit;
      if (yIsSamePart) {
        if (xAxisShow && xAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
        if (xAxisShow && xAxisTickShow) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
        _yStart -= xAxisLineWidth / 2;
      } else {
        _yStart = yZero;
      }

      chartData.axisData.xAxisLinePoint = {
        startX: xStart,
        startY: _yStart,
        endX: xEnd + xAxisTickLineWidth / 2,
        endY: _yStart,
      };
    }

    // 计算 xAxisNamePoint
    if (xAxisShow && xAxisNameShow) {
      let _yStart = yStartInit;
      if (yIsSamePart) {
        if (xAxisShow && xAxisLabelShow) {
          _yStart -= xAxisLabelMaxHeight + xAxisLabelGap; // 更新_yStart数据
        }
        if (xAxisShow && xAxisTickShow) {
          _yStart -= xAxisTickLength; // 更新_yStart数据
        }
        if (xAxisShow && xAxisLineShow) {
          _yStart -= xAxisLineWidth / 2; // 更新_yStart数据
        }
      } else {
        _yStart = yZero;
      }

      chartData.axisData.xAxisNamePoint = {
        text: xAxisNameText,
        x: xEnd + xAxisNameGap,
        y: _yStart,
      };
    }
  }

  chartData.axisData.xStart = xStart;
  chartData.axisData.xEnd = xEnd;
  chartData.axisData.yStart = yStart;
  chartData.axisData.yEnd = yEnd;

  chartData.axisData.yIsSamePart = yIsSamePart;
  chartData.axisData.xIsSamePart = xIsSamePart;

  chartData.axisData.yZero = yZero;
  chartData.axisData.yPlusSpacing = yPlusSpacing;
  chartData.axisData.yMinusSpacing = yMinusSpacing;
  chartData.axisData.ySpacing = ySpacing;
  chartData.axisData.yEachSpacing = yEachSpacing;
  chartData.axisData.xZero = xZero;
  chartData.axisData.xPlusSpacing = xPlusSpacing;
  chartData.axisData.xMinusSpacing = xMinusSpacing;
  chartData.axisData.xSpacing = xSpacing;
  chartData.axisData.xEachSpacing = xEachSpacing;

  chartData.axisData.yMaxData = yMaxData;
  chartData.axisData.yMinData = yMinData;
  chartData.axisData.yDataRange = yDataRange;
  chartData.axisData.xMaxData = xMaxData;
  chartData.axisData.xMinData = xMinData;
  chartData.axisData.xDataRange = xDataRange;

  console.log('complete calAxisData', this.chartData.axisData);
}

function calAxisRadarData() {
  let { context, opts, legendData, chartData } = this;
  let { width, height, padding, radarAxis, categories } = opts;
  let { center, radius, splitNumber, axisName: radarAxisName } = JSON.parse(JSON.stringify(radarAxis));
  let { show: radarAxisNameShow, textStyle: radarAxisNameTextStyle } = radarAxisName;
  let { fontSize: radarAxisNameFontSize, margin: radarAxisNameMargin } = radarAxisNameTextStyle;
  let [centerX, centerY] = center;
  chartData.radarAxis = {
    center: [],
    radius: 0,
    lineEndPosition: [],
    namePosition: [],
  };

  if (typeof centerX == 'string') {
    centerX = width * percentToNum(centerX);
  }
  if (typeof centerY == 'string') {
    centerY = (height - legendData.legendHeight - padding[2]) * percentToNum(centerY);
  }
  if (typeof radius == 'string') {
    radius = ((height - legendData.legendHeight - padding[2]) * percentToNum(radius)) / 2;
  }

  chartData.radarAxis.center = [centerX, centerY];
  chartData.radarAxis.radius = radius;

  let spacingAangle = (2 * Math.PI) / categories.length;
  let start = Math.PI / 2; // 以90度为起点, 逆时针累加

  let arr = [];
  for (let i = 0; i < splitNumber; i++) {
    let scale = (splitNumber - i) / splitNumber;
    arr[i] = categories.reduce((arr, item, index) => {
      let endPoint = {
        x: radius * Math.cos(start + spacingAangle * index) * scale,
        y: radius * Math.sin(start + spacingAangle * index) * scale,
      };
      arr.push(convertCoordinateOrigin(endPoint, chartData.radarAxis.center));
      return arr
    }, []);
  }

  chartData.radarAxis.lineEndPosition = arr;

  if (radarAxisNameShow) {
    chartData.radarAxis.namePosition = categories.reduce((arr, item, index) => {
      let point = {
        x: (radius + radarAxisNameFontSize / 2 + radarAxisNameMargin) * Math.cos(start + spacingAangle * index),
        y: (radius + radarAxisNameFontSize / 2 + radarAxisNameMargin) * Math.sin(start + spacingAangle * index),
      };
      let position = convertCoordinateOrigin(point, chartData.radarAxis.center);

      context.font = `${radarAxisNameFontSize}px`;

      arr.push({
        text: item,
        point,
        position,
      });
      return arr
    }, []);
  }

  console.log('complete calAxisRadarData', this.chartData.radarAxis);
}

function calChartBarData() {
  let { opts, chartData } = this;
  let { series, xAxis } = opts;

  let {
    xStart,
    xEnd,
    yStart,
    yEnd,
    yZero,
    yPlusSpacing,
    yMinusSpacing,
    ySpacing,
    yEachSpacing,
    xZero,
    xPlusSpacing,
    xMinusSpacing,
    xSpacing,
    xEachSpacing,
    yMaxData,
    yMinData,
    yDataRange,
    xMaxData,
    xMinData,
    xDataRange,
    xAxisLabelPoint,
    yAxisLabelPoint,
  } = chartData.axisData;

  let autoWidth = 0;
  let autoWidthNumber = 0;
  let sumWidth = 0;

  let maxData = xAxis.type == 'value' ? xMaxData : yMaxData;
  let minData = xAxis.type == 'value' ? xMinData : yMinData;
  let dataRange = xAxis.type == 'value' ? xDataRange : yDataRange;
  let valueAxisPlusSpacing = xAxis.type == 'value' ? xPlusSpacing : yPlusSpacing;
  let valueAxisMinusSpacing = xAxis.type == 'value' ? xMinusSpacing : yMinusSpacing;
  let valueAxisSpacing = xAxis.type == 'value' ? xSpacing : ySpacing;
  let categoryAxisMinusSpacing = xAxis.type == 'category' ? xEachSpacing : yEachSpacing;

  // 修正barWidth和计算autoWidthNumber和部分sumWidth
  series.forEach((seriesItem, seriesIndex) => {
    let { barMaxWidth, barMinWidth, barWidth, barGap } = seriesItem;

    if (typeof seriesItem.barWidth == 'number') {
      if (barWidth > barMaxWidth) {
        seriesItem.barWidth = barMaxWidth;
      }
      if (barWidth < barMinWidth) {
        seriesItem.barWidth = barMinWidth;
      }
      sumWidth += seriesItem.barWidth;
    } else {
      autoWidthNumber++;
    }
    if (seriesIndex == 0) {
      // 第一个seriesItem的barGap为两边的padding，其他的为与上一个的间隙
      sumWidth += 2 * barGap;
    } else {
      sumWidth += barGap;
    }
    return seriesItem
  });

  // 计算autoWidth
  if (sumWidth + autoWidthNumber < categoryAxisMinusSpacing) {
    autoWidth = (categoryAxisMinusSpacing - sumWidth) / autoWidthNumber;
  } else {
    autoWidth = 1;
  }

  // 修正barWidth，和计算完成sumWidth
  series.forEach(seriesItem => {
    let { barMaxWidth, barWidth } = seriesItem;

    if (barWidth == 'auto') {
      seriesItem.barWidth = autoWidth > barMaxWidth ? barMaxWidth : autoWidth;
      sumWidth += seriesItem.barWidth;
    }
  });

  // 生成数据结构
  chartData.chartBar = JSON.parse(JSON.stringify(series)).reduce((chartBarArr, seriesItem, seriesIndex) => {
    let isShow = true;

    seriesItem.data.forEach((dataItem, dataIndex) => {
      if (seriesItem.showIndex && seriesItem.showIndex.length) {
        isShow = seriesItem.showIndex.some(showIndex => {
          return showIndex == dataIndex
        });
      }
      seriesItem.show = isShow;

      if (!chartBarArr[dataIndex]) {
        chartBarArr[dataIndex] = [];
      }

      if (!chartBarArr[dataIndex][seriesIndex]) {
        chartBarArr[dataIndex][seriesIndex] = JSON.parse(JSON.stringify(seriesItem));
      }
    });
    return chartBarArr
  }, []);

  if (xAxis.type == 'category') {
    chartData.chartBar.forEach((barItemArr, dataIndex) => {
      let x = xAxisLabelPoint[dataIndex].x - sumWidth / 2;
      barItemArr.forEach(barItem => {
        // 记录柱体数值
        let data = barItem.data[dataIndex];

        if (data > maxData) {
          barItem.data = maxData;
        } else if (data < minData) {
          barItem.data = minData;
        } else {
          barItem.data = data;
        }

        // 记录柱体宽度
        if (barItem.barWidth == 'auto') {
          barItem.barWidth = autoWidth;
        }

        // 记录柱体高度和y坐标点
        let barHeight = 0;
        let y = 0;
        if (maxData >= 0 && minData >= 0) {
          barHeight = (valueAxisSpacing * (barItem.data - minData)) / dataRange;
          y = yStart;
        } else if (maxData <= 0 && minData <= 0) {
          barHeight = (valueAxisSpacing * (Math.abs(barItem.data) - Math.abs(maxData))) / dataRange;
          y = yEnd;
        } else {
          if (barItem.data > 0) {
            barHeight = (valueAxisPlusSpacing * barItem.data) / maxData;
            y = yZero;
          } else {
            barHeight = (valueAxisMinusSpacing * Math.abs(barItem.data)) / Math.abs(minData);
            y = yZero;
          }
        }
        barItem.barHeight = barHeight;
        barItem.y = y;

        // 记录x坐标点
        barItem.x = x + barItem.barGap + barItem.barWidth / 2;

        x += barItem.barGap + barItem.barWidth;
      });
    });
  } else {
    chartData.chartBar.forEach((barItemArr, dataIndex) => {
      let y = yAxisLabelPoint[dataIndex].y + sumWidth / 2;

      barItemArr.forEach(barItem => {
        // 记录柱体数值
        let data = barItem.data[dataIndex];

        if (data > maxData) {
          barItem.data = maxData;
        } else if (data < minData) {
          barItem.data = minData;
        } else {
          barItem.data = data;
        }

        // 记录柱体宽度
        if (barItem.barWidth == 'auto') {
          barItem.barWidth = autoWidth;
        }

        // 记录柱体高度和x坐标点
        let barHeight = 0;
        let x = 0;
        if (maxData >= 0 && minData >= 0) {
          barHeight = (valueAxisSpacing * (barItem.data - minData)) / dataRange;
          x = xStart;
        } else if (maxData <= 0 && minData <= 0) {
          barHeight = (valueAxisSpacing * (Math.abs(barItem.data) - Math.abs(maxData))) / dataRange;
          x = xEnd;
        } else {
          if (barItem.data > 0) {
            barHeight = (valueAxisPlusSpacing * barItem.data) / maxData;
            x = xZero;
          } else {
            barHeight = (valueAxisMinusSpacing * Math.abs(barItem.data)) / Math.abs(minData);
            x = xZero;
          }
        }
        barItem.barHeight = barHeight;
        barItem.x = x;

        // 记录柱体y坐标点
        barItem.y = y - barItem.barGap - barItem.barWidth / 2;

        y -= barItem.barGap + barItem.barWidth;
      });
    });
  }

  console.log('complete calChartBarData', this.chartData.chartBar);
}

function calChartLineData() {
  let { opts, chartData } = this;
  let { series, xAxis } = opts;

  let {
    xStart,
    xEnd,
    yStart,
    yEnd,
    yZero,
    yPlusSpacing,
    yMinusSpacing,
    ySpacing,
    xZero,
    xPlusSpacing,
    xMinusSpacing,
    xSpacing,
    yMaxData,
    yMinData,
    yDataRange,
    xMaxData,
    xMinData,
    xDataRange,
    xAxisLabelPoint,
    yAxisLabelPoint,
  } = chartData.axisData;

  let maxData = xAxis.type == 'value' ? xMaxData : yMaxData;
  let minData = xAxis.type == 'value' ? xMinData : yMinData;
  let dataRange = xAxis.type == 'value' ? xDataRange : yDataRange;
  let valueAxisPlusSpacing = xAxis.type == 'value' ? xPlusSpacing : yPlusSpacing;
  let valueAxisMinusSpacing = xAxis.type == 'value' ? xMinusSpacing : yMinusSpacing;
  let valueAxisSpacing = xAxis.type == 'value' ? xSpacing : ySpacing;

  if (xAxis.type == 'category') {
    chartData.chartLine = JSON.parse(JSON.stringify(series)).reduce((chartLineArr, seriesItem) => {
      seriesItem.data = seriesItem.data.reduce((dataArr, dataItem, dataIndex) => {
        let itemHeight = 0;
        let y = 0;

        dataItem = dataItem > maxData ? maxData : dataItem;
        dataItem = dataItem < minData ? minData : dataItem;

        if (maxData >= 0 && minData >= 0) {
          itemHeight = (valueAxisSpacing * (dataItem - minData)) / dataRange;
          y = yStart - itemHeight;
        } else if (maxData <= 0 && minData <= 0) {
          itemHeight = (valueAxisSpacing * (Math.abs(dataItem) - Math.abs(maxData))) / dataRange;
          y = yEnd + itemHeight;
        } else {
          if (dataItem > 0) {
            itemHeight = (valueAxisPlusSpacing * dataItem) / maxData;
            y = yZero - itemHeight;
          } else {
            itemHeight = (valueAxisMinusSpacing * Math.abs(dataItem)) / Math.abs(minData);
            y = yZero + itemHeight;
          }
        }
        dataArr.push({
          x: xAxisLabelPoint[dataIndex].x,
          y,
          data: dataItem,
          height: itemHeight,
        });
        return dataArr
      }, []);

      chartLineArr.push(seriesItem);

      return chartLineArr
    }, []);
  } else {
    chartData.chartLine = JSON.parse(JSON.stringify(series)).reduce((chartLineArr, seriesItem) => {
      seriesItem.data = seriesItem.data.reduce((dataArr, dataItem, dataIndex) => {
        let itemHeight = 0;
        let x = 0;

        dataItem = dataItem > maxData ? maxData : dataItem;
        dataItem = dataItem < minData ? minData : dataItem;

        if (maxData >= 0 && minData >= 0) {
          itemHeight = (valueAxisSpacing * (dataItem - minData)) / dataRange;
          x = xStart + itemHeight;
        } else if (maxData <= 0 && minData <= 0) {
          itemHeight = (valueAxisSpacing * (Math.abs(dataItem) - Math.abs(maxData))) / dataRange;
          x = xEnd - itemHeight;
        } else {
          if (dataItem > 0) {
            itemHeight = (valueAxisPlusSpacing * dataItem) / maxData;
            x = xZero + itemHeight;
          } else {
            itemHeight = (valueAxisMinusSpacing * Math.abs(dataItem)) / Math.abs(minData);
            x = xZero - itemHeight;
          }
        }

        dataArr.push({
          x,
          y: yAxisLabelPoint[dataIndex].y,
          data: dataItem,
          height: itemHeight,
        });
        return dataArr
      }, []);

      chartLineArr.push(seriesItem);

      return chartLineArr
    }, []);
  }

  console.log('complete calChartLineData', this.chartData.chartLine);
}

function calChartPieData() {
  let { opts, legendData, chartData } = this;
  let { width, height, series, padding } = opts;

  chartData.chartPie = JSON.parse(JSON.stringify(series[0]));

  let { data, center, radius } = chartData.chartPie;
  let [centerX, centerY] = center;
  let [radius1, radius2] = radius;
  let valueSum = 0;

  valueSum = data.reduce((sum, dataItem) => {
    sum += dataItem.value === null ? 0 : dataItem.value;
    return sum
  }, 0);

  chartData.chartPie.valueSum = valueSum;

  if (typeof centerX == 'string') {
    centerX = width * percentToNum(centerX);
  }
  if (typeof centerY == 'string') {
    centerY = (height - legendData.legendHeight - padding[2]) * percentToNum(centerY);
  }
  if (typeof radius1 == 'string') {
    radius1 = ((height - legendData.legendHeight - padding[2]) * percentToNum(radius1)) / 2;
  }
  if (typeof radius2 == 'string') {
    radius2 = ((height - legendData.legendHeight - padding[2]) * percentToNum(radius2)) / 2;
  }
  chartData.chartPie.center = [centerX, centerY];
  chartData.chartPie.radius = [radius1, radius2];

  console.log('complete calChartPieData', this.chartData.chartPie);
}

function calChartRadarData() {
  let { opts, chartData } = this;
  let { radarAxis, categories, series } = opts;
  let { max } = radarAxis;
  let { radius } = chartData.radarAxis;

  let maxData = 0;
  series.forEach(seriesItem => {
    maxData = Math.max(maxData, ...seriesItem.data);
  });
  maxData = max == 'auto' ? maxData : max;

  let spacingAangle = (2 * Math.PI) / categories.length;
  let start = Math.PI / 2; // 以90度为起点, 逆时针累加

  chartData.chartRadar = JSON.parse(JSON.stringify(series));
  chartData.chartRadar.map(radarItem => {
    radarItem.dataPosition = radarItem.data.reduce((arr, dataItem, dataIndex) => {
      let scale = dataItem / maxData;
      let point = {
        x: radius * Math.cos(start + spacingAangle * dataIndex) * scale,
        y: radius * Math.sin(start + spacingAangle * dataIndex) * scale,
      };
      arr.push({
        data: dataItem,
        point,
      });
      return arr
    }, []);

    return radarItem
  });

  console.log('complete calChartRadarData', this.chartData.chartRadar);
}

function calChartScatterData() {
  let { opts, chartData } = this;
  let { series } = opts;
  let {
    xStart,
    xEnd,
    yStart,
    yEnd,
    yZero,
    yPlusSpacing,
    yMinusSpacing,
    ySpacing,
    xZero,
    xPlusSpacing,
    xMinusSpacing,
    xSpacing,
    yMaxData,
    yMinData,
    yDataRange,
    xMaxData,
    xMinData,
    xDataRange,
  } = chartData.axisData;

  chartData.chartScatter = JSON.parse(JSON.stringify(series)).reduce((chartScatterArr, seriesItem) => {
    seriesItem.data = seriesItem.data.reduce((dataArr, dataItem) => {
      let { x, y } = dataItem;
      let positionX, positionY;

      if (yMaxData >= 0 && yMaxData >= 0) {
        positionY = yStart - (ySpacing * (y - yMinData)) / yDataRange;
      } else if (yMinData <= 0 && yMinData <= 0) {
        positionY = yEnd + (ySpacing * (Math.abs(y) - Math.abs(yMaxData))) / yDataRange;
      } else {
        if (y > 0) {
          positionY = yZero - (yPlusSpacing * y) / yMaxData;
        } else {
          positionY = yZero + (yMinusSpacing * Math.abs(y)) / Math.abs(yMinData);
        }
      }

      if (xMaxData >= 0 && xMaxData >= 0) {
        positionX = xStart + (xSpacing * (x - xMinData)) / xDataRange;
      } else if (xMinData <= 0 && xMinData <= 0) {
        positionX = xEnd - (xSpacing * (Math.abs(x) - Math.abs(xMaxData))) / xDataRange;
      } else {
        if (x > 0) {
          positionX = xZero + (xPlusSpacing * x) / xMaxData;
        } else {
          positionX = xZero - (xMinusSpacing * Math.abs(x)) / Math.abs(xMinData);
        }
      }

      dataArr.push({
        x,
        y,
        positionX,
        positionY,
      });
      return dataArr
    }, []);

    chartScatterArr.push(JSON.parse(JSON.stringify(seriesItem)));

    return chartScatterArr
  }, []);

  console.log('complete calChartScatterData', this.chartData.chartScatter);
}

/**
 * 绘制背景图
 */

function drawBackground(startX = 0, startY = 0, endX = this.opts.width, endY = this.opts.height) {
  this.context.fillStyle = this.opts.backgroundColor;
  this.context.fillRect(startX, startY, endX, endY);

  console.log('complete drawBackground');
}

/**
 * 绘制图例组件
 */

function drawLegend() {
  if (!this.opts.legend.show) return

  let { context, opts, legendData } = this;
  let { type, legend } = opts;
  let { type: legendType, shapeWidth, shapeHeight, itemGap, marginTop, textStyle } = legend;
  let { fontSize, color, padding } = textStyle;
  let { legendList, legendWidth, legendHeight } = legendData;

  if (legendType == 'default') {
    switch (type) {
      case 'bar':
        legendType = 'rect';
        break
      case 'line':
        legendType = 'line';
        break
      case 'pie':
        legendType = 'circle';
        break
      case 'radar':
        legendType = 'rect';
        break
      case 'scatter':
        legendType = 'circle';
        break
    }
  }

  let legendHeightMax = Math.max(shapeHeight, fontSize);
  let startY = opts.height - opts.padding[2] - legendHeight + marginTop;
  let startX = (opts.width - legendWidth) / 2;
  legendList.forEach((listItem, listIndex) => {
    startX = (opts.width - legendWidth) / 2; // 重置startX

    listItem.forEach(legendItem => {
      switch (legendType) {
        case 'circle':
          context.beginPath();
          context.moveTo(startX + shapeWidth / 2, startY + legendHeightMax / 2);
          context.arc(startX + shapeWidth / 2, startY + legendHeightMax / 2, shapeWidth / 2, 0, 2 * Math.PI);
          context.closePath();

          context.fillStyle = legendItem.itemStyle.color;
          context.fill();
          break
        case 'line':
          let lineLength = (shapeWidth - shapeHeight) / 2;

          context.beginPath();
          context.moveTo(startX, startY + legendHeightMax / 2);
          context.lineTo(startX + lineLength - 2, startY + legendHeightMax / 2);
          context.closePath();
          context.lineWidth = 2;
          context.strokeStyle = legendItem.itemStyle.color;
          context.stroke();

          context.beginPath();
          context.moveTo(startX + shapeWidth / 2, startY + legendHeightMax / 2);
          context.arc(startX + shapeWidth / 2, startY + legendHeightMax / 2, shapeHeight / 2, 0, 2 * Math.PI);
          context.closePath();
          context.fillStyle = legendItem.itemStyle.color;
          context.fill();

          context.beginPath();
          context.moveTo(startX + lineLength + shapeHeight + 2, startY + legendHeightMax / 2);
          context.lineTo(startX + shapeWidth, startY + legendHeightMax / 2);
          context.closePath();
          context.lineWidth = 2;
          context.strokeStyle = legendItem.itemStyle.color;
          context.stroke();

          break
        case 'rect':
          context.fillStyle = legendItem.itemStyle.color;
          if (shapeHeight >= fontSize) {
            context.fillRect(startX, startY, shapeWidth, shapeHeight);
          } else {
            context.fillRect(startX, startY + (fontSize - shapeHeight) / 2, shapeWidth, shapeHeight);
          }
          break
      }

      startX += shapeWidth + padding;

      context.save();
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      context.font = `${fontSize}px`;
      context.fillStyle = color;
      context.fillText(legendItem.name, startX, startY + legendHeightMax / 2);
      context.restore();

      startX += legendItem.measureText + itemGap;
    });

    startY += legendHeightMax + itemGap;
  });

  console.log('complete drawLegend');
}

/**
 * 绘制Y轴, 包括 axisName(名称), axisLabel(标签), axisTick(刻度线), axisLine(轴线)
 */
function drawAxisY() {
  let { context, opts, chartData } = this;
  let { xAxis, yAxis } = opts;

  let {
    show: xAxisShow,
    type: xAxisType,
    axisName: xAxisName,
    axisLabel: xAxisLabel,
    axisTick: xAxisTick,
    axisLine: xAxisLine,
    axisSplitLine: xAxisSplitLine,
  } = xAxis;
  let {
    show: yAxisShow,
    type: yAxisType,
    axisName: yAxisName,
    axisLabel: yAxisLabel,
    axisTick: yAxisTick,
    axisLine: yAxisLine,
    axisSplitLine: yAxisSplitLine,
  } = yAxis;

  let { show: xAxisNameShow, textStyle: xAxisNameTextStyle } = xAxisName;
  let { show: xAxisLabelShow, textStyle: xAxisLabelTextStyle, rotate: xAxisLabelRotate } = xAxisLabel;
  let { show: xAxisTickShow, lineStyle: xAxisTickStyle } = xAxisTick;
  let { show: xAxisLineShow, lineStyle: xAxisLineStyle } = xAxisLine;
  let { show: xAxisSplitLineShow, lineStyle: xAxisSplitLineStyle } = xAxisSplitLine;

  let { show: yAxisNameShow, textStyle: yAxisNameTextStyle } = yAxisName;
  let { show: yAxisLabelShow, textStyle: yAxisLabelTextStyle } = yAxisLabel;
  let { show: yAxisTickShow, lineStyle: yAxisTickStyle } = yAxisTick;
  let { show: yAxisLineShow, lineStyle: yAxisLineStyle } = yAxisLine;
  let { show: yAxisSplitLineShow, lineStyle: yAxisSplitLineStyle } = yAxisSplitLine;

  let { color: xAxisNameColor, fontSize: xAxisNameFontSize } = xAxisNameTextStyle;
  let { color: xAxisLabelColor, fontSize: xAxisLabelFontSize } = xAxisLabelTextStyle;
  let { color: xAxisTickLineColor, lineWidth: xAxisTickLineWidth } = xAxisTickStyle;
  let { color: xAxisLineColor, lineWidth: xAxisLineWidth } = xAxisLineStyle;
  let { color: xAxisSplitLineColor, lineWidth: xAxisSplitLineWidth } = xAxisSplitLineStyle;

  let { color: yAxisNameColor, fontSize: yAxisNameFontSize } = yAxisNameTextStyle;
  let { color: yAxisLabelColor, fontSize: yAxisLabelFontSize } = yAxisLabelTextStyle;
  let { color: yAxisTickLineColor, lineWidth: yAxisTickLineWidth } = yAxisTickStyle;
  let { color: yAxisLineColor, lineWidth: yAxisLineWidth } = yAxisLineStyle;
  let { color: yAxisSplitLineColor, lineWidth: yAxisSplitLineWidth } = yAxisSplitLineStyle;

  let {
    xAxisLabelPoint,
    xAxisTickPoint,
    xAxisLinePoint,
    xAxisSplitLinePoint,
    xAxisNamePoint,
    yAxisLabelPoint,
    yAxisTickPoint,
    yAxisLinePoint,
    yAxisSplitLinePoint,
    yAxisNamePoint,
  } = chartData.axisData;

  if (yAxisShow) {
    if (yAxisLabelShow) {
      context.save();
      context.font = `${yAxisLabelFontSize}px`;
      context.fillStyle = yAxisLabelColor;
      context.textAlign = 'right';
      context.textBaseline = 'middle';
      yAxisLabelPoint.forEach(item => {
        if (yAxisType == 'value' || item.show) {
          context.fillText(item.text, item.x, item.y);
        }
      });
      context.restore();
    }

    if (yAxisSplitLineShow) {
      context.lineWidth = yAxisSplitLineWidth;
      context.strokeStyle = yAxisSplitLineColor;

      yAxisSplitLinePoint.forEach((item, index) => {
        if (yAxisType == 'value' || item.show) {
          context.beginPath();
          context.moveTo(item.startX, item.startY);
          context.lineTo(item.endX, item.endY);
          context.closePath();
          context.stroke();
        }
      });
    }

    if (yAxisNameShow) {
      context.save();
      context.font = `${yAxisNameFontSize}px`;
      context.fillStyle = yAxisNameColor;
      context.textAlign = 'center';
      context.textBaseline = 'bottom';
      context.fillText(yAxisNamePoint.text, yAxisNamePoint.x, yAxisNamePoint.y);
      context.restore();
    }
  }

  if (xAxisShow) {
    if (xAxisLabelShow) {
      context.save();
      context.font = `${xAxisLabelFontSize}px`;
      context.fillStyle = xAxisLabelColor;
      context.textBaseline = 'top';

      if (xAxisLabelRotate == 0) {
        context.textAlign = 'center';
      } else if (xAxisLabelRotate > 0) {
        context.textAlign = 'right';
      } else if (xAxisLabelRotate < 0) {
        context.textAlign = 'left';
      }

      xAxisLabelPoint.forEach(item => {
        if (xAxisType == 'value' || item.show) {
          if (xAxisLabelRotate == 0) {
            context.fillText(item.text, item.x, item.y);
          } else {
            context.save();
            context.translate(item.x, item.y);
            context.rotate((-xAxisLabelRotate * Math.PI) / 180);
            context.fillText(item.text, 0, 0);
            context.restore();
          }
        }
      });

      context.restore();
    }

    if (xAxisSplitLineShow) {
      context.lineWidth = xAxisSplitLineWidth;
      context.strokeStyle = xAxisSplitLineColor;

      xAxisSplitLinePoint.forEach((item, index) => {
        if (xAxisType == 'value' || item.show) {
          context.beginPath();
          context.moveTo(item.startX, item.startY);
          context.lineTo(item.endX, item.endY);
          context.closePath();
          context.stroke();
        }
      });
    }

    if (xAxisNameShow) {
      context.save();
      context.font = `${xAxisNameFontSize}px`;
      context.fillStyle = xAxisNameColor;
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      context.fillText(xAxisNamePoint.text, xAxisNamePoint.x, xAxisNamePoint.y);
      context.restore();
    }
  }

  // 防止轴线被网格线覆盖, 最后绘制
  if (yAxisShow) {
    if (yAxisTickShow) {
      context.lineWidth = yAxisTickLineWidth;
      context.strokeStyle = yAxisTickLineColor;

      yAxisTickPoint.forEach(item => {
        if (yAxisType == 'value' || item.show) {
          context.beginPath();
          context.moveTo(item.startX, item.startY);
          context.lineTo(item.endX, item.endY);
          context.closePath();
          context.stroke();
        }
      });
    }

    if (yAxisLineShow) {
      context.beginPath();
      context.moveTo(yAxisLinePoint.startX, yAxisLinePoint.startY);
      context.lineTo(yAxisLinePoint.endX, yAxisLinePoint.endY);
      context.closePath();

      context.lineWidth = yAxisLineWidth;
      context.strokeStyle = yAxisLineColor;
      context.stroke();
    }
  }

  if (xAxisShow) {
    if (xAxisTickShow) {
      context.lineWidth = xAxisTickLineWidth;
      context.strokeStyle = xAxisTickLineColor;

      xAxisTickPoint.forEach(item => {
        if (xAxisType == 'value' || item.show) {
          context.beginPath();
          context.moveTo(item.startX, item.startY);
          context.lineTo(item.endX, item.endY);
          context.closePath();
          context.stroke();
        }
      });
    }

    if (xAxisLineShow) {
      context.beginPath();
      context.moveTo(xAxisLinePoint.startX, xAxisLinePoint.startY);
      context.lineTo(xAxisLinePoint.endX, xAxisLinePoint.endY);
      context.closePath();

      context.lineWidth = xAxisLineWidth;
      context.strokeStyle = xAxisLineColor;
      context.stroke();
    }
  }

  console.log('complete drawAxis');
}

function drawAxisRadar() {
  let { context, opts, chartData } = this;
  let { backgroundColor, radarAxis, categories } = opts;
  let {
    shape: radarAxisShape,
    splitNumber,
    axisName: radarAxisName,
    axisLine: radarAxisLine,
    splitLine: radarAxisSplitLine,
    splitArea: radarAxisSplitArea,
  } = radarAxis;
  let { show: radarAxisNameShow, textStyle: radarAxisNameTextStyle } = radarAxisName;
  let { show: radarAxisLineShow, lineStyle: radarAxisLineStyle } = radarAxisLine;
  let { show: radarAxisSplitLineShow, lineStyle: radarAxisSplitLineStyle } = radarAxisSplitLine;

  let { color: radarAxisNameColor, fontSize: radarAxisNameFontSize } = radarAxisNameTextStyle;
  let { color: radarAxisLineColor, lineWidth: radarAxisLineWidth } = radarAxisLineStyle;
  let { color: radarAxisSplitLineColor, lineWidth: radarAxisSplitLineWidth } = radarAxisSplitLineStyle;

  let { odd, even } = radarAxisSplitArea;
  let { show: oddSplitAreaShow, color: oddSplitAreaColor, opacity: oddSplitAreaOpacity } = odd;
  let { show: evenSplitAreaShow, color: evenSplitAreaColor, opacity: evenSplitAreaOpacity } = even;

  let { center, radius, lineEndPosition, namePosition } = chartData.radarAxis;
  let [centerX, centerY] = center;

  if (radarAxisShape == 'polygon') {
    lineEndPosition.forEach((splitPositionArr, splitIndex) => {
      let oddOrEven = (splitNumber - splitIndex) % 2; // 0为偶数，1为奇数

      context.beginPath();
      splitPositionArr.forEach((splitPositionItem, splitPositionIndex) => {
        if (splitPositionIndex == 0) {
          context.moveTo(splitPositionItem.x, splitPositionItem.y);
        } else {
          context.lineTo(splitPositionItem.x, splitPositionItem.y);
        }
      });
      context.closePath();

      // draw evenSplitArea
      if (oddOrEven === 0 && oddSplitAreaShow) {
        context.fillStyle = backgroundColor;
        context.fill(); // 避免存在透明度时，上一次绘制颜色的影响
        context.save();
        context.globalAlpha = evenSplitAreaOpacity;
        context.fillStyle = evenSplitAreaColor;
        context.fill();
        context.restore();
      }

      // draw oddSplitArea
      if (oddOrEven === 1 && evenSplitAreaShow) {
        context.fillStyle = backgroundColor;
        context.fill(); // 避免存在透明度时，上一次绘制颜色的影响
        context.save();
        context.globalAlpha = oddSplitAreaOpacity;
        context.fillStyle = oddSplitAreaColor == 'auto' ? backgroundColor : oddSplitAreaColor;
        context.fill();
        context.restore();
      }

      // draw radarAxisSplitLine
      if (radarAxisSplitLineShow) {
        context.lineWidth = radarAxisSplitLineWidth;
        context.strokeStyle = radarAxisSplitLineColor;
        context.stroke();
      }
    });
  } else {
    for (let index = 0; index < splitNumber; index++) {
      let scale = (splitNumber - index) / splitNumber;
      let oddOrEven = (splitNumber - index) % 2; // 0为偶数，1为奇数

      context.beginPath();
      context.arc(centerX, centerY, radius * scale, 0, Math.PI * 2);

      // draw evenSplitArea
      if (oddOrEven === 0 && oddSplitAreaShow) {
        context.fillStyle = backgroundColor;
        context.fill(); // 避免存在透明度时，上一次绘制颜色的影响
        context.save();
        context.globalAlpha = evenSplitAreaOpacity;
        context.fillStyle = evenSplitAreaColor;
        context.fill();
        context.restore();
      }

      // draw oddSplitArea
      if (oddOrEven === 1 && evenSplitAreaShow) {
        context.fillStyle = backgroundColor;
        context.fill(); // 避免存在透明度时，上一次绘制颜色的影响
        context.save();
        context.globalAlpha = oddSplitAreaOpacity;
        context.fillStyle = oddSplitAreaColor == 'auto' ? backgroundColor : oddSplitAreaColor;
        context.fill();
        context.restore();
      }

      // draw radarAxisSplitLine
      if (radarAxisSplitLineShow) {
        context.lineWidth = radarAxisSplitLineWidth;
        context.strokeStyle = radarAxisSplitLineColor;
        context.stroke();
      }
    }
  }

  // draw radarAxisLine
  if (radarAxisLineShow) {
    lineEndPosition[0].forEach(lineEndPositionItem => {
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(lineEndPositionItem.x, lineEndPositionItem.y);
      context.lineWidth = radarAxisLineWidth;
      context.strokeStyle = radarAxisLineColor;
      context.stroke();
    });
  }

  // draw radarAxisName
  if (radarAxisNameShow) {
    namePosition.forEach(namePositionItem => {
      let { text, point, position } = namePositionItem;
      let { x: pointX } = point;
      let { x: positionX, y: positionY } = position;

      context.save();
      if (positionX == centerX) {
        context.textAlign = 'center';
      } else if (pointX > 0) {
        context.textAlign = 'left';
      } else if (pointX < 0) {
        context.textAlign = 'right';
      }

      context.textBaseline = 'middle';

      context.font = `${radarAxisNameFontSize}px`;
      context.fillStyle = radarAxisNameColor;
      context.fillText(text, positionX, positionY);
      context.restore();
    });
  }

  console.log('complete drawAxisRadar');
}

function drawChartPie(process) {
  let { context, opts, chartData } = this;
  let { label: globalLabel, xAxis } = opts;

  let { yMaxData, yMinData, xMaxData, xMinData } = chartData.axisData;

  let maxData = xAxis.type == 'value' ? xMaxData : yMaxData;
  let minData = xAxis.type == 'value' ? xMinData : yMinData;

  if (xAxis.type == 'category') {
    chartData.chartBar.forEach(barItemArr => {
      barItemArr.forEach(barItem => {
        let { x, y, data, barWidth, barHeight, itemStyle } = barItem;
        let { color: barItemColor } = itemStyle;

        context.beginPath();
        context.save();
        context.fillStyle = barItemColor;
        if (maxData >= 0 && minData >= 0) {
          context.fillRect(x - barWidth / 2, y, barWidth, -barHeight * process);
        } else if (maxData <= 0 && minData <= 0) {
          context.fillRect(x - barWidth / 2, y, barWidth, barHeight * process);
        } else {
          if (data > 0) {
            context.fillRect(x - barWidth / 2, y, barWidth, -barHeight * process);
          } else {
            context.fillRect(x - barWidth / 2, y, barWidth, barHeight * process);
          }
        }

        context.restore();
        context.closePath();
      });
    });

    if (process == 1) {
      chartData.chartBar.forEach(barItemArr => {
        barItemArr.forEach(barItem => {
          let { show: barItemShow, x, y, barHeight, data, label, itemStyle } = barItem;
          let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = label;
          let { color: barItemColor } = itemStyle;

          // globalLabel 权重大于 seriesLabel
          labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
          labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
          labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
          labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

          if (labelShow && barItemShow) {
            context.save();
            context.font = `${labelFontSize}px`;
            context.fillStyle = labelColor == 'auto' ? barItemColor : labelColor;
            context.textAlign = 'center';
            if (maxData >= 0 && minData >= 0) {
              context.textBaseline = 'bottom';
              context.fillText(data, x, y - barHeight - labelMargin);
            } else if (maxData <= 0 && minData <= 0) {
              context.textBaseline = 'top';
              context.fillText(data, x, y + barHeight + labelMargin);
            } else {
              if (data > 0) {
                context.textBaseline = 'bottom';
                context.fillText(data, x, y - barHeight - labelMargin);
              } else {
                context.textBaseline = 'top';
                context.fillText(data, x, y + barHeight + labelMargin);
              }
            }
            context.restore();
          }
        });
      });
    }
  } else {
    chartData.chartBar.forEach(barItemArr => {
      barItemArr.forEach(barItem => {
        let { x, y, data, barWidth, barHeight, itemStyle } = barItem;
        let { color: barItemColor } = itemStyle;

        context.beginPath();
        context.save();
        context.fillStyle = barItemColor;
        if (maxData >= 0 && minData >= 0) {
          context.fillRect(x, y - (barWidth * process) / 2, barHeight, barWidth * process);
        } else if (maxData <= 0 && minData <= 0) {
          context.fillRect(x, y - (barWidth * process) / 2, -barHeight, barWidth * process);
        } else {
          if (data > 0) {
            context.fillRect(x, y - (barWidth * process) / 2, barHeight, barWidth * process);
          } else {
            context.fillRect(x, y - (barWidth * process) / 2, -barHeight, barWidth * process);
          }
        }

        context.restore();
        context.closePath();
      });
    });

    if (process == 1) {
      chartData.chartBar.forEach(barItemArr => {
        barItemArr.forEach(barItem => {
          let { show: barItemShow, x, y, barHeight, data, label, itemStyle } = barItem;
          let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = label;
          let { color: barItemColor } = itemStyle;

          // globalLabel 权重大于 seriesLabel
          labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
          labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
          labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
          labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

          if (labelShow && barItemShow) {
            context.save();
            context.font = `${labelFontSize}px`;
            context.fillStyle = labelColor == 'auto' ? barItemColor : labelColor;
            context.textBaseline = 'middle';
            if (maxData >= 0 && minData >= 0) {
              context.textAlign = 'left';
              context.fillText(data, x + barHeight + labelMargin, y);
            } else if (maxData <= 0 && minData <= 0) {
              context.textAlign = 'right';
              context.fillText(data, x - barHeight - labelMargin, y);
            } else {
              if (data > 0) {
                context.textAlign = 'left';
                context.fillText(data, x + barHeight + labelMargin, y);
              } else {
                context.textAlign = 'right';
                context.fillText(data, x - barHeight - labelMargin, y);
              }
            }
            context.restore();
          }
        });
      });
    }
  }

  console.log('complete drawChartBar', process);
}

function drawChartLine(process) {
  let { context, opts, chartData } = this;
  let { label: globalLabel, xAxis } = opts;

  let { xStart, xEnd, yStart, yEnd, yZero, xZero, yMaxData, yMinData, xMaxData, xMinData } = chartData.axisData;

  let maxData = xAxis.type == 'value' ? xMaxData : yMaxData;
  let minData = xAxis.type == 'value' ? xMinData : yMinData;

  JSON.parse(JSON.stringify(chartData.chartLine)).forEach(lineItem => {
    let { itemStyle, line, symbol, area, label, smooth } = lineItem;
    let { color: lineItemColor } = itemStyle;
    let { show: lineShow, lineWidth, color: lineColor, opacity: lineOpacity } = line;
    let { show: symbolShow, type: symbolType, size: symbolSize, color: symbolColor } = symbol;
    let { show: areaShow, color: areaColor, opacity: areaOpacity } = area;
    let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = label;

    if (smooth) {
      // process更新y坐标数据
      lineItem.data = lineItem.data.map(dataItem => {
        let { x, y, height, data } = dataItem;

        if (xAxis.type == 'category') {
          if (maxData >= 0 && minData >= 0) {
            dataItem.y = y + height - height * process;
          } else if (maxData <= 0 && minData <= 0) {
            dataItem.y = y - height + height * process;
          } else {
            if (data > 0) {
              dataItem.y = y + height - height * process;
            } else {
              dataItem.y = y - height + height * process;
            }
          }
        } else {
          if (maxData >= 0 && minData >= 0) {
            dataItem.x = x - height + height * process;
          } else if (maxData <= 0 && minData <= 0) {
            dataItem.x = x + height - height * process;
          } else {
            if (data > 0) {
              dataItem.x = x - height + height * process;
            } else {
              dataItem.x = x + height - height * process;
            }
          }
        }
        return dataItem
      });
      // 计算贝塞尔曲线控制点并绘制路径
      context.beginPath();
      lineItem.data.forEach((dataItem, dataIndex, points) => {
        function isNotMiddlePoint(points, i) {
          if (points[i - 1] && points[i + 1]) {
            return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y)
          } else {
            return false
          }
        }

        const a = 0.2;
        const b = 0.2;
        let pAx = null;
        let pAy = null;
        let pBx = null;
        let pBy = null;
        let { x, y } = dataItem;

        if (dataIndex == 0) {
          context.moveTo(x, y);
        } else {
          let i = dataIndex - 1;
          if (i < 1) {
            pAx = points[0].x + (points[1].x - points[0].x) * a;
            pAy = points[0].y + (points[1].y - points[0].y) * a;
          } else {
            pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
            pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
          }

          if (i > points.length - 3) {
            let last = points.length - 1;
            pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
            pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
          } else {
            pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
            pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
          }

          if (isNotMiddlePoint(points, i + 1)) {
            pBy = points[i + 1].y;
          }
          if (isNotMiddlePoint(points, i)) {
            pAy = points[i].y;
          }

          context.bezierCurveTo(pAx, pAy, pBx, pBy, x, y);
        }
      });
    } else {
      context.beginPath();
      lineItem.data.forEach((dataItem, dataIndex) => {
        let { x, y, height, data } = dataItem;

        if (xAxis.type == 'category') {
          if (maxData >= 0 && minData >= 0) {
            y = y + height - height * process;
          } else if (maxData <= 0 && minData <= 0) {
            y = y - height + height * process;
          } else {
            if (data > 0) {
              y = y + height - height * process;
            } else {
              y = y - height + height * process;
            }
          }
        } else {
          if (maxData >= 0 && minData >= 0) {
            x = x - height + height * process;
          } else if (maxData <= 0 && minData <= 0) {
            x = x + height - height * process;
          } else {
            if (data > 0) {
              x = x - height + height * process;
            } else {
              x = x + height - height * process;
            }
          }
        }

        if (dataIndex == 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
    }

    if (lineShow) {
      context.save();
      context.lineJoin = 'round';
      context.globalAlpha = lineOpacity;
      context.lineWidth = lineWidth;
      context.strokeStyle = lineColor == 'auto' ? lineItemColor : lineColor;
      context.stroke();
      context.restore();
    }

    if (areaShow) {
      if (xAxis.type == 'category') {
        if (maxData >= 0 && minData >= 0) {
          context.lineTo(lineItem.data[lineItem.data.length - 1].x, yStart);
          context.lineTo(lineItem.data[0].x, yStart);
        } else if (maxData <= 0 && minData <= 0) {
          context.lineTo(lineItem.data[lineItem.data.length - 1].x, yEnd);
          context.lineTo(lineItem.data[0].x, yEnd);
        } else {
          context.lineTo(lineItem.data[lineItem.data.length - 1].x, yZero);
          context.lineTo(lineItem.data[0].x, yZero);
        }
      } else {
        if (maxData >= 0 && minData >= 0) {
          context.lineTo(xStart, lineItem.data[lineItem.data.length - 1].y);
          context.lineTo(xStart, lineItem.data[0].y);
        } else if (maxData <= 0 && minData <= 0) {
          context.lineTo(xEnd, lineItem.data[lineItem.data.length - 1].y);
          context.lineTo(xEnd, lineItem.data[0].y);
        } else {
          context.lineTo(xZero, lineItem.data[lineItem.data.length - 1].y);
          context.lineTo(xZero, lineItem.data[0].y);
        }
      }
      context.closePath();
      context.save();
      context.globalAlpha = areaOpacity;
      context.fillStyle = areaColor == 'auto' ? lineItemColor : areaColor;
      context.fill();
      context.restore();
    }

    if (process == 1) {
      if (symbolShow) {
        switch (symbolType) {
          case 'circle':
            context.save();
            lineItem.data.forEach(dataItem => {
              let { x, y } = dataItem;
              context.beginPath();
              context.arc(x, y, symbolSize / 2, 0, 2 * Math.PI);
              context.fillStyle = symbolColor == 'auto' ? lineItemColor : symbolColor;
              context.fill();

              context.beginPath();
              context.arc(x, y, symbolSize / 4, 0, 2 * Math.PI);
              context.fillStyle = '#fff';
              context.fill();
            });
            context.restore();
            break
        }
      }

      // globalLabel 权重大于 seriesLabel
      labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
      labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
      labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
      labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

      if (labelShow) {
        context.save();
        context.font = `${labelFontSize}px`;
        context.fillStyle = labelColor == 'auto' ? lineItemColor : labelColor;
        context.textAlign = 'center';

        lineItem.data.forEach(dataItem => {
          let { x, y, data } = dataItem;

          if (xAxis.type == 'category') {
            if (maxData >= 0 && minData >= 0) {
              context.textBaseline = 'bottom';
              context.fillText(data, x, y - labelMargin);
            } else if (maxData <= 0 && minData <= 0) {
              context.textBaseline = 'top';
              context.fillText(data, x, y + labelMargin);
            } else {
              if (data) {
                context.textBaseline = 'bottom';
                context.fillText(data, x, y - labelMargin);
              } else {
                context.textBaseline = 'top';
                context.fillText(data, x, y + labelMargin);
              }
            }
          } else {
            context.textBaseline = 'bottom';
            context.fillText(data, x, y - labelMargin);
          }
        });

        context.restore();
      }
    }
  });

  console.log('complete drawChartLine', process);
}

function drawChartPie$1(process) {
  let { context, opts, chartData } = this;
  let { backgroundColor, label: globalLabel } = opts;
  let { data, center, radius, format, offsetAngle, disablePieStroke, valueSum } = chartData.chartPie;
  let [centerX, centerY] = center;
  let [radiusMin, radiusMax] = radius;
  let _start_ = 0;

  data.forEach(dataItem => {
    dataItem._proportion_ = (dataItem.value / valueSum) * process;
    dataItem._start_ = _start_;
    if (offsetAngle !== 0) {
      dataItem._start_ += (offsetAngle * Math.PI) / 180;
    }

    context.beginPath();

    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radiusMax, dataItem._start_, dataItem._start_ + 2 * dataItem._proportion_ * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = backgroundColor;
    context.fillStyle = dataItem.itemStyle.color;
    context.fill();
    if (!disablePieStroke) {
      context.stroke();
    }

    if (radiusMin > 0) {
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radiusMin, dataItem._start_, dataItem._start_ + 2 * dataItem._proportion_ * Math.PI);
      context.fillStyle = backgroundColor;
      context.strokeStyle = backgroundColor;
      context.stroke();
      context.fill();
    }

    _start_ += 2 * dataItem._proportion_ * Math.PI;
  });

  // 绘制文本标签
  if (process == 1) {
    let { label: seriesLabel, labelLine } = chartData.chartPie;
    let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = seriesLabel;
    let { length1, length2, lineWidth, lineDotRadius } = labelLine;
    let lineRadius = radiusMax + length1;
    let lastOrigin = null;

    // globalLabel 权重大于 seriesLabel
    labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
    labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
    labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
    labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

    if (labelShow) {
      data.forEach((dataItem, dataIndex) => {
        let arc = 2 * Math.PI - (dataItem._start_ + (2 * Math.PI * dataItem._proportion_) / 2);
        let text = format ? format(dataItem.value, name) : `${(+dataItem._proportion_ * 100).toFixed(2)}%`;

        // length1 start
        let length1StartOrigin = {
          x: Math.cos(arc) * radiusMax,
          y: Math.sin(arc) * radiusMax,
        };
        // length2 start
        let length2StartOrigin = {
          x: Math.cos(arc) * lineRadius,
          y: Math.sin(arc) * lineRadius,
        };
        // length2 end
        let length2EndOrigin = {
          x: length2StartOrigin.x >= 0 ? length2StartOrigin.x + length2 : length2StartOrigin.x - length2,
          y: length2StartOrigin.y,
        };

        length2EndOrigin = avoidCollision(length2EndOrigin, lastOrigin, Math.max(lineDotRadius, labelFontSize / 2) * 2);
        lastOrigin = length2EndOrigin;

        let length1StartPosition = convertCoordinateOrigin(length1StartOrigin, center);
        let length2StartPosition = convertCoordinateOrigin(length2StartOrigin, center);
        let length2EndPosition = convertCoordinateOrigin(length2EndOrigin, center);

        // text start
        context.font = `${labelFontSize}px`;
        let textWidth = context.measureText(text).width;
        let textStartPosition = Object.assign({}, length2EndPosition);
        if (length2EndOrigin.x > 0) {
          textStartPosition.x += lineDotRadius + labelMargin;
        } else {
          textStartPosition.x -= textWidth + lineDotRadius + labelMargin;
        }

        context.beginPath();
        context.moveTo(length1StartPosition.x, length1StartPosition.y);
        context.quadraticCurveTo(length2StartPosition.x, length2StartPosition.y, length2EndPosition.x, length2EndPosition.y);
        context.lineWidth = lineWidth;
        context.strokeStyle = dataItem.itemStyle.color;
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(length2EndPosition.x, length2EndPosition.y);
        context.arc(length2EndPosition.x, length2EndPosition.y, lineDotRadius, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = dataItem.itemStyle.color;
        context.fill();

        context.font = `${labelFontSize}px`;
        context.textBaseline = 'middle';
        context.fillStyle = labelColor == 'auto' ? dataItem.itemStyle.color : labelColor;
        context.fillText(text, textStartPosition.x, textStartPosition.y);
      });
    }
  }

  console.log('complete drawChartPie', process);
}

function drawChartRadar(process) {
  let { context, opts, chartData } = this;
  let { label: globalLabel } = opts;
  let { center } = chartData.radarAxis;

  chartData.chartRadar.forEach(radarItem => {
    let { dataPosition, itemStyle, area, line, symbol, label } = radarItem;
    let { show: areaShow, color: areaColor, opacity: areaOpactiy } = area;
    let { show: lineShow, lineWidht, color: lineColor, opacity: lineOpacity } = line;
    let { show: symbolShow, type: symbolType, size: symbolSize, color: symbolColor } = symbol;
    let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = label;

    context.beginPath();
    dataPosition.forEach((dataItem, dataIndex) => {
      let point = JSON.parse(JSON.stringify(dataItem.point));
      point.x = point.x * process;
      point.y = point.y * process;

      let position = convertCoordinateOrigin(point, center);
      let { x: positionX, y: positionY } = position;
      dataItem.position = position;

      if (dataIndex == 0) {
        context.moveTo(positionX, positionY);
      } else {
        context.lineTo(positionX, positionY);
      }
    });
    context.closePath();

    if (areaShow) {
      context.save();
      context.globalAlpha = areaOpactiy;
      context.fillStyle = areaColor == 'auto' ? itemStyle.color : areaColor;
      context.fill();
      context.stroke();
      context.restore();
    }

    if (lineShow) {
      context.save();
      context.lineWidht = lineWidht;
      context.globalAlpha = lineOpacity;
      context.strokeStyle = lineColor == 'auto' ? itemStyle.color : lineColor;
      context.stroke();
      context.restore();
    }

    if (process == 1) {
      if (symbolShow) {
        switch (symbolType) {
          case 'circle':
            context.save();
            dataPosition.forEach(dataItem => {
              let { x: positionX, y: positionY } = dataItem.position;
              context.beginPath();
              context.arc(positionX, positionY, symbolSize / 2, 0, Math.PI * 2);
              context.fillStyle = symbolColor == 'auto' ? itemStyle.color : symbolColor;
              context.fill();

              context.beginPath();
              context.arc(positionX, positionY, symbolSize / 4, 0, Math.PI * 2);
              context.fillStyle = '#fff';
              context.fill();
            });
            context.restore();
            break
        }
      }

      // globalLabel 权重大于 seriesLabel
      labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
      labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
      labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
      labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

      if (labelShow) {
        context.save();
        context.font = `${labelFontSize}px`;
        context.fillStyle = labelColor == 'auto' ? itemStyle.color : labelColor;
        context.textAlign = 'center';
        context.textBaseline = 'bottom';

        dataPosition.forEach(dataItem => {
          let { x, y } = dataItem.position;
          context.fillText(dataItem.data, x, y - labelMargin);
        });
      }
    }
  });

  console.log('complete drawChartRadar', process);
}

function drawChartScatter(process) {
  let { context, opts, chartData } = this;
  let { label: globalLabel } = opts;

  chartData.chartScatter.forEach(ScatterItem => {
    let { data, label, itemStyle, opacity, radius } = ScatterItem;
    let { show: labelShow, fontSize: labelFontSize, color: labelColor, margin: labelMargin } = label;
    let { color: ScatterItemColor } = itemStyle;
    radius = radius * process;

    context.save();
    context.beginPath();
    data.forEach(dataItem => {
      let { positionX, positionY } = dataItem;

      context.moveTo(positionX, positionY);
      context.arc(positionX, positionY, radius, 0, Math.PI * 2);
    });
    context.fillStyle = ScatterItemColor;
    context.globalAlpha = opacity;
    context.fill();
    context.restore();

    if (process == 1) {
      // globalLabel 权重大于 seriesLabel
      labelShow = globalLabel && typeof globalLabel.show == 'boolean' ? globalLabel.show : labelShow;
      labelFontSize = globalLabel && globalLabel.fontSize ? globalLabel.fontSize : labelFontSize;
      labelColor = globalLabel && globalLabel.color ? globalLabel.color : labelColor;
      labelMargin = globalLabel && globalLabel.margin ? globalLabel.margin : labelMargin;

      if (labelShow) {
        context.save();
        context.font = `${labelFontSize}px`;
        context.strokeStyle = labelColor == 'auto' ? ScatterItemColor : labelColor;
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        data.forEach(dataItem => {
          let { y, positionX, positionY } = dataItem;

          context.strokeText(y, positionX, positionY);
          context.fillText(y, positionX, positionY);
        });
        context.restore();
      }
    }
  });

  console.log('complete drawChartScatter', process);
}

function drawCharts() {
  let { type, animation, animationDuration, animationTiming } = this.opts;
  let onProcessFn = function() {};

  this.animationInstance && this.animationInstance.stop();

  calSeriesColor.call(this);
  calLegendData.call(this);

  switch (type) {
    case 'bar':
      calAxisYData.call(this);
      calChartBarData.call(this);

      onProcessFn = process => {
        drawBackground.call(this);
        drawAxisY.call(this);
        drawChartPie.call(this, process);

        if (process == 1) {
          drawLegend.call(this);
        }
      };
      break
    case 'line':
      calAxisYData.call(this);
      calChartLineData.call(this);

      onProcessFn = process => {
        drawBackground.call(this);
        drawAxisY.call(this);
        drawChartLine.call(this, process);

        if (process == 1) {
          drawLegend.call(this);
        }
      };
      break
    case 'pie':
      calChartPieData.call(this);

      onProcessFn = process => {
        drawBackground.call(this);
        drawChartPie$1.call(this, process);

        if (process == 1) {
          drawLegend.call(this);
        }
      };
      break
    case 'radar':
      calAxisRadarData.call(this);
      calChartRadarData.call(this);

      onProcessFn = process => {
        drawBackground.call(this);
        drawAxisRadar.call(this);
        drawChartRadar.call(this, process);

        if (process == 1) {
          drawLegend.call(this);
        }
      };
      break
    case 'scatter':
      calAxisYData.call(this);
      calChartScatterData.call(this);

      onProcessFn = process => {
        drawBackground.call(this);
        drawAxisY.call(this);
        drawChartScatter.call(this, process);

        if (process == 1) {
          drawLegend.call(this);
        }
      };
      break
  }

  this.animationInstance = new Animation({
    type,
    animation,
    animationDuration,
    animationTiming,
    onProcess: onProcessFn,
    onAnimationFinish: () => {
      this.event.trigger('renderComplete');
    },
  });
}

class Charts {
  constructor(opts = {}) {
    this.config = Object.assign({}, Config);
    this.opts = Object.assign({}, opts);
    this.context = this.opts.element.getContext('2d');
    this.chartData = {};

    // 绑定事件
    this.event = new Event();
    this.event.addEventListener('renderComplete', opts.onRenderComplete);

    // 将opts的数据补充完整
    calOptions.call(this);

    // 绘制图表
    drawCharts.call(this);
  }

  updateData(data = {}) {
    let { opts, config } = this;

    Object.keys(data).forEach(dataKey => {
      if (dataKey == 'series') {
        opts.series = JSON.parse(JSON.stringify(data.series));
        calSeries.call(this);
      } else {
        replenishData(dataKey, data, opts, true);
      }
    });

    console.log('complete updateData', this);

    drawCharts.call(this);
  }
}

export default Charts;
//# sourceMappingURL=qacharts.js.map
