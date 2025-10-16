// Mock data for Sales Conversion Dashboard - exact values from design

// 5 KPI Chips - exact values from mock
export const kpiMetrics = [
  {
    title: '24,186',
    value: '24186',
    delta: 12.5,
    deltaDir: 'up',
    subtitle: 'Total Leads',
    color: '#22D3EE'
  },
  {
    title: '1,489',
    value: '1489',
    delta: 8.2,
    deltaDir: 'up',
    subtitle: 'Qualified Leads',
    color: '#8B5CF6'
  },
  {
    title: '1,056',
    value: '1056',
    delta: -2.1,
    deltaDir: 'down',
    subtitle: 'Opportunities',
    color: '#34D399'
  },
  {
    title: '738',
    value: '738',
    delta: 15.3,
    deltaDir: 'up',
    subtitle: 'Proposals',
    color: '#F59E0B'
  },
  {
    title: '360',
    value: '360',
    delta: 22.1,
    deltaDir: 'up',
    subtitle: 'Wins',
    color: '#EF4444'
  }
];

// Area Chart Data - 12 months
export const conversionChartData = [
  { month: 'Jan', converted: 24, thisYearAvg: 22, prevPeriod: 18 },
  { month: 'Feb', converted: 26, thisYearAvg: 23, prevPeriod: 19 },
  { month: 'Mar', converted: 28, thisYearAvg: 24, prevPeriod: 21 },
  { month: 'Apr', converted: 22, thisYearAvg: 24, prevPeriod: 20 },
  { month: 'May', converted: 25, thisYearAvg: 24, prevPeriod: 22 },
  { month: 'Jun', converted: 33, thisYearAvg: 25, prevPeriod: 23 },
  { month: 'Jul', converted: 29, thisYearAvg: 25, prevPeriod: 22 },
  { month: 'Aug', converted: 21, thisYearAvg: 24, prevPeriod: 20 },
  { month: 'Sep', converted: 18, thisYearAvg: 23, prevPeriod: 19 },
  { month: 'Oct', converted: 27, thisYearAvg: 23, prevPeriod: 20 },
  { month: 'Nov', converted: 24, thisYearAvg: 24, prevPeriod: 21 },
  { month: 'Dec', converted: 30, thisYearAvg: 24, prevPeriod: 22 }
];

// Donut Ratios - exact percentages from mock
export const leadToOpportunityRatio = {
  title: 'Lead to Opportunity Ratio',
  value: 70.92,
  delta: 5.2,
  deltaDir: 'up',
  subnote: 'vs previous period'
};

export const opportunityToWinRatio = {
  title: 'Opportunity to Win Ratio',
  value: 34.09,
  delta: -2.8,
  deltaDir: 'down',
  subnote: 'vs previous period'
};

// Top Converting Agents - exact data from mock
export const topConvertingAgents = [
  {
    name: 'Benjamin Davis',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    percent: 29.25,
    delta: -0.36,
    leads: 156,
    closed: 46,
    revenue: '$125,000',
    sparkline: [0.23, 0.26, 0.24, 0.28, 0.30, 0.27, 0.29, 0.32, 0.28, 0.31, 0.29, 0.33]
  },
  {
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    percent: 28.1,
    delta: 2.4,
    leads: 142,
    closed: 40,
    revenue: '$108,000',
    sparkline: [0.22, 0.25, 0.27, 0.24, 0.28, 0.30, 0.26, 0.29, 0.31, 0.28, 0.32, 0.30]
  },
  {
    name: 'Jack Ding',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    percent: 25.6,
    delta: 1.8,
    leads: 134,
    closed: 34,
    revenue: '$95,000',
    sparkline: [0.24, 0.23, 0.26, 0.25, 0.28, 0.26, 0.29, 0.27, 0.30, 0.28, 0.27, 0.31]
  }
];

// Non-Converting Agents - exact data from mock
export const nonConvertingAgents = [
  {
    name: 'Joshua Holmes',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    percent: 18.3,
    delta: -1.2,
    leads: 98,
    closed: 18,
    revenue: '$52,000',
    sparkline: [0.20, 0.18, 0.22, 0.19, 0.24, 0.21, 0.19, 0.23, 0.20, 0.26, 0.22, 0.21]
  },
  {
    name: 'Max Young',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    percent: 22.5,
    delta: 0.8,
    leads: 87,
    closed: 20,
    revenue: '$48,000',
    sparkline: [0.18, 0.21, 0.19, 0.24, 0.22, 0.26, 0.24, 0.21, 0.25, 0.23, 0.27, 0.25]
  },
  {
    name: 'Anna Black',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    percent: 22.7,
    delta: -0.5,
    leads: 92,
    closed: 21,
    revenue: '$55,000',
    sparkline: [0.21, 0.20, 0.24, 0.22, 0.26, 0.24, 0.22, 0.27, 0.24, 0.28, 0.26, 0.23]
  }
];

// ECharts Configuration Templates - Updated to match design
export const getAreaChartOption = () => ({
  grid: { 
    left: 40, 
    right: 24, 
    top: 60, 
    bottom: 60 
  },
  tooltip: { 
    trigger: 'axis', 
    axisPointer: { type: 'line' },
    backgroundColor: '#121826',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    textStyle: { color: '#A8B5C8' }
  },
  legend: { 
    bottom: 10, 
    left: 'center',
    textStyle: { color: '#A8B5C8', fontSize: 12 },
    itemGap: 20,
    data: ['Below threshold', 'Above threshold', 'Conv vs prev year', 'Average conversion rate']
  },
  xAxis: { 
    type: 'category', 
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisLine: { lineStyle: { color: 'rgba(100, 116, 139, 0.4)' } }, 
    axisLabel: { color: '#A8B5C8', fontSize: 11 },
    axisTick: { show: false }
  },
  yAxis: { 
    type: 'value', 
    min: 0.15,
    max: 0.35,
    splitLine: { lineStyle: { color: 'rgba(100, 116, 139, 0.4)' } }, 
    axisLabel: { 
      color: '#A8B5C8',
      fontSize: 11,
      formatter: '{value}'
    }
  },
  series: [
    // Below threshold bars (pink/red)
    { 
      name: 'Below threshold',
      type: 'bar',
      stack: 'conversion',
      data: [0.23, 0, 0, 0, 0, 0, 0, 0, 0.19, 0.21, 0, 0.18],
      itemStyle: { color: '#EF4444' },
      barWidth: '60%'
    },
    // Above threshold bars (green/teal)
    { 
      name: 'Above threshold',
      type: 'bar', 
      stack: 'conversion',
      data: [0, 0.25, 0.25, 0.26, 0.27, 0.31, 0, 0, 0, 0, 0.28, 0],
      itemStyle: { color: '#34D399' },
      barWidth: '60%'
    },
    // Dotted line - Conv vs prev year
    { 
      name: 'Conv vs prev year',
      type: 'line', 
      smooth: false, 
      symbol: 'none', 
      lineStyle: { 
        width: 2, 
        type: [5, 5], 
        color: '#A8B5C8' 
      }, 
      data: [0.23, 0.22, 0.21, 0.22, 0.25, 0.26, 0.32, 0.33, 0.32, 0.31, 0.22, 0.22]
    },
    // Solid yellow line - Average conversion rate
    { 
      name: 'Average conversion rate',
      type: 'line', 
      smooth: false, 
      symbol: 'none', 
      lineStyle: { width: 2, color: '#F59E0B' }, 
      data: [0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24]
    }
  ]
});

export const getDonutOption = (value) => ({
  series: [{
    type: 'pie', 
    radius: ['70%', '90%'], 
    avoidLabelOverlap: false, 
    label: { show: false },
    data: [
      { value, name: 'ratio', itemStyle: { color: '#34D399' } },
      { value: 100 - value, name: 'rest', itemStyle: { color: 'rgba(100, 116, 139, 0.4)' } }
    ]
  }]
});

export const getSparklineOption = (data, isPositive = true) => ({
  grid: { left: 2, right: 2, top: 2, bottom: 2 }, 
  xAxis: { type: 'category', show: false }, 
  yAxis: { type: 'value', show: false },
  series: [
    // Below threshold bars (red/pink)
    { 
      type: 'bar',
      data: data.map((val, idx) => val < 0.25 ? val : null),
      itemStyle: { color: '#EF4444' },
      barWidth: '80%'
    },
    // Above threshold bars (green/teal)  
    { 
      type: 'bar',
      data: data.map((val, idx) => val >= 0.25 ? val : null),
      itemStyle: { color: '#34D399' },
      barWidth: '80%'
    },
    // Yellow line overlay
    { 
      type: 'line', 
      data: data.map(() => 0.25), 
      smooth: false, 
      symbol: 'none',
      lineStyle: { width: 1, color: '#F59E0B' }
    }
  ]
});
