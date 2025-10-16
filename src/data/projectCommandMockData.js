// Mock data for Project Command Room Dashboard - Cyberpunk Style

export const mockData = {
  // Scanner Ring Data
  scannerInfo: {
    title: "Time Remaining",
    days: 1131,
    subtitle: "Project Description",
    totalDays: 1531
  },

  // Runtime Days
  runtimeDays: 1531,

  // Resource Investment (4 mini-KPIs with horizontal progress)
  resourceInvestment: [
    { label: "Purchased", used: 85, remaining: 15, total: 100, color: "#22D3EE" },
    { label: "Invoked", used: 72, remaining: 28, total: 100, color: "#60A5FA" },
    { label: "Used", used: 68, remaining: 32, total: 100, color: "#34D399" },
    { label: "Remaining", used: 45, remaining: 55, total: 100, color: "#F59E0B" }
  ],

  // Quality Analysis (2 donut charts)
  qualityAnalysis: {
    ringA: { value: 78, label: "Quality Ring A", color: "#22D3EE" },
    ringB: { value: 64, label: "Quality Ring B", color: "#60A5FA" }
  },

  // Quality Rank (vertical bar chart)
  qualityRank: [
    { label: "A", value: 28 },
    { label: "B", value: 25 },
    { label: "C", value: 22 },
    { label: "D", value: 26 },
    { label: "E", value: 24 },
    { label: "F", value: 21 },
    { label: "G", value: 23 },
    { label: "H", value: 27 },
    { label: "I", value: 20 },
    { label: "J", value: 25 },
    { label: "K", value: 19 },
    { label: "L", value: 18 }
  ],

  // Labor Plan (2 big numbers)
  laborPlan: {
    accumulated: 123456,
    remained: 187654
  },

  // Project Schedule (table data)
  scheduleRows: [
    { city: "Ho Chi Minh", leader: "Nguyen Van A", dept: "Engineering", days: 45 },
    { city: "Da Nang", leader: "Tran Thi B", dept: "Construction", days: 32 },
    { city: "Ha Noi", leader: "Le Van C", dept: "Planning", days: 28 },
    { city: "Can Tho", leader: "Pham Thi D", dept: "Quality", days: 38 }
  ],

  // Staff KPIs (hex tiles)
  staffKPIs: {
    total: 1511,
    active: 1447
  },

  // Construction Data (line/area chart)
  constructionSeries: [
    { week: "W1", value: 12, target: 15 },
    { week: "W2", value: 18, target: 20 },
    { week: "W3", value: 25, target: 25 },
    { week: "W4", value: 32, target: 30 },
    { week: "W5", value: 28, target: 35 },
    { week: "W6", value: 35, target: 40 },
    { week: "W7", value: 42, target: 45 },
    { week: "W8", value: 48, target: 50 },
    { week: "W9", value: 45, target: 55 },
    { week: "W10", value: 52, target: 60 },
    { week: "W11", value: 58, target: 65 },
    { week: "W12", value: 62, target: 70 }
  ],

  // Pipeline Groups (chips)
  pipelineGroups: [
    { id: 1, name: "Infrastructure", status: "active", count: 12 },
    { id: 2, name: "Development", status: "pending", count: 8 },
    { id: 3, name: "Testing", status: "active", count: 15 },
    { id: 4, name: "Deployment", status: "completed", count: 6 },
    { id: 5, name: "Monitoring", status: "active", count: 9 },
    { id: 6, name: "Maintenance", status: "pending", count: 4 }
  ]
};

// ECharts configurations for cyberpunk theme
export const getDonutChartConfig = (data) => ({
  series: [{
    type: 'pie',
    radius: ['70%', '88%'],
    avoidLabelOverlap: false,
    label: { show: false },
    emphasis: {
      label: { show: false }
    },
    data: [
      { 
        value: data.value, 
        name: 'completed',
        itemStyle: { 
          color: data.color,
          shadowColor: data.color + '66',
          shadowBlur: 10
        }
      },
      { 
        value: 100 - data.value, 
        name: 'remaining',
        itemStyle: { 
          color: 'rgba(255,255,255,0.06)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      }
    ]
  }],
  tooltip: {
    backgroundColor: '#0F172A',
    borderColor: '#22D3EE',
    textStyle: { color: '#E5F3FF' }
  }
});

export const getBarChartConfig = (data) => ({
  grid: {
    left: 30,
    right: 10,
    top: 20,
    bottom: 30
  },
  xAxis: {
    type: 'category',
    data: data.map(d => d.label),
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
    axisLabel: { color: '#9FB4CC', fontSize: 10 },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#9FB4CC', fontSize: 10 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }
  },
  series: [{
    type: 'bar',
    data: data.map(d => ({
      value: d.value,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 1, x2: 0, y2: 0,
          colorStops: [
            { offset: 0, color: '#22D3EE' },
            { offset: 1, color: '#60A5FA' }
          ]
        },
        shadowColor: '#22D3EE66',
        shadowBlur: 8
      }
    })),
    barWidth: '60%'
  }],
  tooltip: {
    backgroundColor: '#0F172A',
    borderColor: '#22D3EE',
    textStyle: { color: '#E5F3FF' }
  }
});

export const getLineChartConfig = (data) => ({
  grid: {
    left: 40,
    right: 20,
    top: 20,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    data: data.map(d => d.week),
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
    axisLabel: { color: '#9FB4CC', fontSize: 11 },
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#9FB4CC', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }
  },
  series: [
    {
      name: 'Actual',
      type: 'line',
      data: data.map(d => d.value),
      smooth: true,
      lineStyle: { 
        color: '#22D3EE', 
        width: 3,
        shadowColor: '#22D3EE66',
        shadowBlur: 8
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#22D3EE33' },
            { offset: 1, color: '#22D3EE00' }
          ]
        }
      },
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: { color: '#22D3EE' }
    },
    {
      name: 'Target',
      type: 'line',
      data: data.map(d => d.target),
      smooth: true,
      lineStyle: { 
        color: '#60A5FA', 
        width: 2, 
        type: 'dashed'
      },
      symbol: 'none'
    }
  ],
  tooltip: {
    backgroundColor: '#0F172A',
    borderColor: '#22D3EE',
    textStyle: { color: '#E5F3FF' }
  }
});
