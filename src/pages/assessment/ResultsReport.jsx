import React, { useState, useEffect } from 'react';
import { 
  Card, Typography, Tabs, Table, Button, Space, 
  Select, Input, Row, Col, Statistic, Progress, 
  Divider, Tag, Badge, Tooltip, Alert, Modal,
  Radio, Spin, Empty, List, Avatar, message
} from 'antd';
import { 
  BarChartOutlined, PieChartOutlined, TeamOutlined, 
  UserOutlined, DownloadOutlined, FileExcelOutlined, 
  FilePdfOutlined, FilterOutlined, SearchOutlined,
  InfoCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import './ResultsReport.css';

// Import Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  ChartTooltip,
  Legend
);

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const ResultsReport = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterScoreRange, setFilterScoreRange] = useState([0, 5]);
  const [searchText, setSearchText] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personDrawerVisible, setPersonDrawerVisible] = useState(false);
  const [stats, setStats] = useState({
    avgScore: 0,
    maxScore: 0,
    minScore: 0,
    distribution: []
  });

  // Fetch round and results data
  useEffect(() => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const mockRound = {
        id: parseInt(id),
        name: 'Đánh giá KPI Q3/2025',
        startDate: '2025-07-20',
        endDate: '2025-07-31',
        objective: 'Đánh giá KPI nhân viên quý 3',
        status: 'completed',
        creator: 'Nguyễn Phúc Vinh',
        createdAt: '2025-07-10',
        completionRate: 100,
        participantCount: 150,
        submissionCount: 150,
        gradingCount: 150,
        resultsPublished: true,
        publishedAt: '2025-08-05'
      };
      
      setRound(mockRound);
      
      // Generate mock departments and positions
      const mockDepartments = ['Phòng Nhân sự', 'Phòng Kỹ thuật', 'Phòng Kinh doanh', 'Phòng Tài chính', 'Ban Giám đốc'];
      setDepartments(mockDepartments);
      
      const mockPositions = ['Giám đốc', 'Phó Giám đốc', 'Trưởng phòng', 'Phó phòng', 'Team Leader', 'Nhân viên'];
      setPositions(mockPositions);
      
      // Generate mock results
      const mockResults = Array(150).fill(0).map((_, index) => {
        const department = mockDepartments[Math.floor(Math.random() * mockDepartments.length)];
        const position = index < 5 ? 'Giám đốc/Phó Giám đốc' : 
                        index < 15 ? 'Trưởng phòng/Phó phòng' : 
                        index < 30 ? 'Team Leader' : 'Nhân viên';
        const score = (Math.random() * 3 + 2).toFixed(1); // Score between 2.0 and 5.0
        
        return {
          id: index + 1,
          employeeId: 1000 + index,
          employeeName: `Nhân viên ${index + 1}`,
          department,
          position,
          score: parseFloat(score),
          selfScore: (parseFloat(score) + (Math.random() * 0.6 - 0.3)).toFixed(1),
          gap: ((Math.random() * 0.6 - 0.3)).toFixed(1),
          criteria: [
            { 
              id: 1, 
              code: 'KN01', 
              name: 'Kỹ năng giao tiếp', 
              weight: 20,
              score: (Math.random() * 3 + 2).toFixed(1)
            },
            { 
              id: 2, 
              code: 'KN02', 
              name: 'Kỹ năng làm việc nhóm', 
              weight: 20,
              score: (Math.random() * 3 + 2).toFixed(1)
            },
            { 
              id: 3, 
              code: 'TĐ01', 
              name: 'Trách nhiệm', 
              weight: 15,
              score: (Math.random() * 3 + 2).toFixed(1)
            },
            { 
              id: 4, 
              code: 'TĐ02', 
              name: 'Chủ động', 
              weight: 15,
              score: (Math.random() * 3 + 2).toFixed(1)
            },
            { 
              id: 5, 
              code: 'KT01', 
              name: 'Kiến thức chuyên môn', 
              weight: 30,
              score: (Math.random() * 3 + 2).toFixed(1)
            }
          ],
          strengths: ['Giao tiếp tốt', 'Làm việc nhóm hiệu quả'],
          weaknesses: ['Cần cải thiện kỹ năng quản lý thời gian'],
          managerNote: 'Nhân viên có kết quả công việc tốt trong quý này'
        };
      });
      
      setResults(mockResults);
      setFilteredResults(mockResults);
      
      // Calculate stats
      const scores = mockResults.map(r => r.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      
      // Calculate distribution
      const distribution = [
        { range: '1.0-1.9', count: scores.filter(s => s >= 1.0 && s < 2.0).length },
        { range: '2.0-2.9', count: scores.filter(s => s >= 2.0 && s < 3.0).length },
        { range: '3.0-3.9', count: scores.filter(s => s >= 3.0 && s < 4.0).length },
        { range: '4.0-5.0', count: scores.filter(s => s >= 4.0 && s <= 5.0).length }
      ];
      
      setStats({
        avgScore: avgScore.toFixed(1),
        maxScore: maxScore.toFixed(1),
        minScore: minScore.toFixed(1),
        distribution
      });
      
      setLoading(false);
    }, 1000);
  }, [id]);

  // Apply filters
  useEffect(() => {
    if (!results.length) return;
    
    let filtered = [...results];
    
    // Apply department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(r => r.department === filterDepartment);
    }
    
    // Apply position filter
    if (filterPosition !== 'all') {
      filtered = filtered.filter(r => r.position === filterPosition);
    }
    
    // Apply score range filter
    filtered = filtered.filter(r => 
      r.score >= filterScoreRange[0] && r.score <= filterScoreRange[1]
    );
    
    // Apply search
    if (searchText) {
      filtered = filtered.filter(r => 
        r.employeeName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredResults(filtered);
  }, [results, filterDepartment, filterPosition, filterScoreRange, searchText]);

  // Handle export
  const handleExport = () => {
    setExportLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // Mock download
      message.success(`Đã xuất báo cáo dạng ${exportFormat.toUpperCase()}`);
      setExportLoading(false);
    }, 1500);
  };

  // Show person details
  const showPersonDetails = (person) => {
    setSelectedPerson(person);
    setPersonDrawerVisible(true);
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 4.0) return '#52c41a'; // Green
    if (score >= 3.0) return '#1890ff'; // Blue
    if (score >= 2.0) return '#faad14'; // Yellow
    return '#f5222d'; // Red
  };

  // Get score badge
  const getScoreBadge = (score) => {
    return (
      <Badge 
        count={score} 
        style={{ backgroundColor: getScoreColor(score) }} 
      />
    );
  };

  // Get gap badge
  const getGapBadge = (gap) => {
    const gapValue = parseFloat(gap);
    if (gapValue > 0) {
      return <Badge count={`+${gap}`} style={{ backgroundColor: '#52c41a' }} />;
    } else if (gapValue < 0) {
      return <Badge count={gap} style={{ backgroundColor: '#f5222d' }} />;
    } else {
      return <Badge count="0" style={{ backgroundColor: '#8c8c8c' }} />;
    }
  };

  // Prepare chart data
  const chartData = {
    labels: stats.distribution.map(d => d.range),
    datasets: [
      {
        label: 'Số người',
        data: stats.distribution.map(d => d.count),
        backgroundColor: [
          '#faad14',
          '#1890ff',
          '#52c41a',
          '#722ed1'
        ]
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Phân phối điểm số'
      }
    }
  };

  // Department summary data
  const departmentSummary = departments.map(dept => {
    const deptResults = results.filter(r => r.department === dept);
    const avgScore = deptResults.reduce((sum, r) => sum + r.score, 0) / deptResults.length;
    
    return {
      department: dept,
      count: deptResults.length,
      avgScore: avgScore.toFixed(1),
      maxScore: Math.max(...deptResults.map(r => r.score)).toFixed(1),
      minScore: Math.min(...deptResults.map(r => r.score)).toFixed(1)
    };
  });

  // Department summary columns
  const departmentColumns = [
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Số người',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: 'Điểm trung bình',
      dataIndex: 'avgScore',
      key: 'avgScore',
      render: (score) => getScoreBadge(score)
    },
    {
      title: 'Điểm cao nhất',
      dataIndex: 'maxScore',
      key: 'maxScore',
      render: (score) => getScoreBadge(score)
    },
    {
      title: 'Điểm thấp nhất',
      dataIndex: 'minScore',
      key: 'minScore',
      render: (score) => getScoreBadge(score)
    }
  ];

  // Person list columns
  const personColumns = [
    {
      title: 'Nhân viên',
      key: 'employee',
      render: (_, record) => (
        <div>
          <div>{record.employeeName}</div>
          <Text type="secondary">{record.position}</Text>
        </div>
      )
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Điểm tự đánh giá',
      dataIndex: 'selfScore',
      key: 'selfScore',
      render: (score) => getScoreBadge(score)
    },
    {
      title: 'Điểm quản lý',
      dataIndex: 'score',
      key: 'score',
      render: (score) => getScoreBadge(score)
    },
    {
      title: 'Chênh lệch',
      dataIndex: 'gap',
      key: 'gap',
      render: (gap) => getGapBadge(gap)
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => showPersonDetails(record)}
        >
          Chi tiết
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <div className="results-report-loading">
        <Spin size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="results-report-empty">
        <Empty description="Không tìm thấy vòng đánh giá" />
        <Button type="primary">
          <Link to="/assessment/rounds">Quay lại danh sách</Link>
        </Button>
      </div>
    );
  }

  if (!round.resultsPublished) {
    return (
      <div className="results-report-container">
        <div className="results-report-header">
          <div className="results-report-title">
            <Title level={2}>Kết quả & Báo cáo</Title>
            <Text>{round.name}</Text>
          </div>
          <div className="results-report-actions">
            <Button type="primary">
              <Link to="/assessment/rounds">Quay lại danh sách</Link>
            </Button>
          </div>
        </div>
        
        <Alert
          message="Kết quả chưa được công bố"
          description="Kết quả của vòng đánh giá này chưa được công bố. Vui lòng công bố kết quả trước khi xem báo cáo."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }

  return (
    <div className="results-report-container">
      <div className="results-report-header">
        <div className="results-report-title">
          <Title level={2}>Kết quả & Báo cáo</Title>
          <Text>{round.name}</Text>
        </div>
        <div className="results-report-actions">
          <Space>
            <Button>
              <Link to={`/assessment/rounds/${round.id}/appeals`}>Phúc khảo</Link>
            </Button>
            <Button type="primary">
              <Link to="/assessment/rounds">Quay lại danh sách</Link>
            </Button>
          </Space>
        </div>
      </div>
      
      <Card className="results-report-filters">
        <div className="filter-container">
          <Space wrap>
            <div className="filter-item">
              <Text>Phòng ban:</Text>
              <Select 
                value={filterDepartment} 
                onChange={setFilterDepartment}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả phòng ban</Option>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item">
              <Text>Vị trí:</Text>
              <Select 
                value={filterPosition} 
                onChange={setFilterPosition}
                style={{ width: 200 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả vị trí</Option>
                {positions.map(pos => (
                  <Option key={pos} value={pos}>{pos}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item">
              <Text>Khoảng điểm:</Text>
              <Select 
                value={filterScoreRange.join('-')} 
                onChange={(value) => setFilterScoreRange(value.split('-').map(Number))}
                style={{ width: 150 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="0-5">Tất cả</Option>
                <Option value="1-2">1.0 - 2.0</Option>
                <Option value="2-3">2.0 - 3.0</Option>
                <Option value="3-4">3.0 - 4.0</Option>
                <Option value="4-5">4.0 - 5.0</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <Input.Search
                placeholder="Tìm kiếm theo tên..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            </div>
          </Space>
        </div>
      </Card>
      
      <Tabs defaultActiveKey="overview" className="results-report-tabs">
        <TabPane 
          tab={<span><BarChartOutlined /> Tổng quan</span>} 
          key="overview"
        >
          <Row gutter={16} className="overview-stats">
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Điểm trung bình" 
                  value={stats.avgScore} 
                  valueStyle={{ color: getScoreColor(stats.avgScore) }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Điểm cao nhất" 
                  value={stats.maxScore} 
                  valueStyle={{ color: getScoreColor(stats.maxScore) }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Điểm thấp nhất" 
                  value={stats.minScore} 
                  valueStyle={{ color: getScoreColor(stats.minScore) }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="Tổng số người" 
                  value={results.length} 
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>
          
          <Card title="Phân phối điểm số" className="distribution-chart">
            <Bar data={chartData} options={chartOptions} />
          </Card>
          
          <Card title="Thống kê theo phòng ban" className="department-summary">
            <Table
              dataSource={departmentSummary}
              columns={departmentColumns}
              rowKey="department"
              pagination={false}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><TeamOutlined /> Theo đơn vị</span>} 
          key="by-unit"
        >
          <Card title="Thống kê theo phòng ban" className="department-summary">
            <Table
              dataSource={departmentSummary}
              columns={departmentColumns}
              rowKey="department"
              pagination={false}
            />
          </Card>
          
          {departments.map(dept => {
            const deptResults = results.filter(r => r.department === dept);
            if (deptResults.length === 0) return null;
            
            // Calculate average scores by criteria
            const criteriaAvg = {};
            deptResults[0].criteria.forEach(c => {
              criteriaAvg[c.code] = {
                name: c.name,
                weight: c.weight,
                avgScore: (deptResults.reduce((sum, r) => {
                  const criterion = r.criteria.find(cr => cr.code === c.code);
                  return sum + parseFloat(criterion.score);
                }, 0) / deptResults.length).toFixed(1)
              };
            });
            
            return (
              <Card 
                title={`Chi tiết: ${dept}`} 
                key={dept}
                className="department-detail"
              >
                <div className="criteria-summary">
                  <Title level={5}>Điểm trung bình theo tiêu chí:</Title>
                  <div className="criteria-list">
                    {Object.entries(criteriaAvg).map(([code, data]) => (
                      <div key={code} className="criteria-item">
                        <div className="criteria-name">
                          <Text>{code} - {data.name}</Text>
                          <Tag color="blue">{data.weight}%</Tag>
                        </div>
                        <div className="criteria-score">
                          {getScoreBadge(data.avgScore)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <Table
                  dataSource={deptResults}
                  columns={personColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            );
          })}
        </TabPane>
        
        <TabPane 
          tab={<span><UserOutlined /> Theo cá nhân</span>} 
          key="by-person"
        >
          <Card title="Danh sách kết quả cá nhân" className="person-list">
            <Table
              dataSource={filteredResults}
              columns={personColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
          
          <Modal
            title={
              <div className="person-modal-title">
                <div>
                  {selectedPerson?.employeeName}
                  <div className="person-modal-subtitle">
                    <Text type="secondary">{selectedPerson?.position} - {selectedPerson?.department}</Text>
                  </div>
                </div>
                <div className="person-modal-score">
                  <Text>Điểm:</Text>
                  {selectedPerson && getScoreBadge(selectedPerson.score)}
                </div>
              </div>
            }
            open={personDrawerVisible}
            onCancel={() => setPersonDrawerVisible(false)}
            footer={null}
            width={700}
          >
            {selectedPerson && (
              <div className="person-details">
                <div className="person-summary">
                  <div className="summary-item">
                    <Text>Điểm tự đánh giá:</Text>
                    <Text strong>{selectedPerson.selfScore}</Text>
                  </div>
                  <div className="summary-item">
                    <Text>Điểm quản lý:</Text>
                    <Text strong>{selectedPerson.score}</Text>
                  </div>
                  <div className="summary-item">
                    <Text>Chênh lệch:</Text>
                    <Text strong>{selectedPerson.gap}</Text>
                  </div>
                </div>
                
                <Divider />
                
                <div className="person-criteria">
                  <Title level={5}>Chi tiết theo tiêu chí:</Title>
                  <Table
                    dataSource={selectedPerson.criteria}
                    columns={[
                      {
                        title: 'Tiêu chí',
                        key: 'name',
                        render: (_, record) => (
                          <div>
                            <div>{record.code} - {record.name}</div>
                            <Tag color="blue">{record.weight}%</Tag>
                          </div>
                        )
                      },
                      {
                        title: 'Điểm',
                        dataIndex: 'score',
                        key: 'score',
                        render: (score) => getScoreBadge(score)
                      }
                    ]}
                    rowKey="id"
                    pagination={false}
                    size="small"
                  />
                </div>
                
                <Divider />
                
                <div className="person-feedback">
                  <div className="feedback-section">
                    <Title level={5}>Điểm mạnh:</Title>
                    <ul>
                      {selectedPerson.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="feedback-section">
                    <Title level={5}>Điểm cần cải thiện:</Title>
                    <ul>
                      {selectedPerson.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="feedback-section">
                    <Title level={5}>Nhận xét của quản lý:</Title>
                    <Paragraph>{selectedPerson.managerNote}</Paragraph>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </TabPane>
        
        <TabPane 
          tab={<span><DownloadOutlined /> Xuất báo cáo</span>} 
          key="export"
        >
          <Card title="Xuất báo cáo" className="export-options">
            <div className="export-format">
              <Title level={5}>Chọn định dạng:</Title>
              <Radio.Group 
                value={exportFormat} 
                onChange={e => setExportFormat(e.target.value)}
              >
                <Radio.Button value="xlsx">
                  <FileExcelOutlined /> Excel (.xlsx)
                </Radio.Button>
                <Radio.Button value="pdf">
                  <FilePdfOutlined /> PDF (.pdf)
                </Radio.Button>
              </Radio.Group>
            </div>
            
            <Divider />
            
            <div className="export-filters">
              <Title level={5}>Phạm vi xuất báo cáo:</Title>
              <div className="filter-summary">
                <div className="filter-item">
                  <Text>Phòng ban:</Text>
                  <Text strong>{filterDepartment === 'all' ? 'Tất cả phòng ban' : filterDepartment}</Text>
                </div>
                <div className="filter-item">
                  <Text>Vị trí:</Text>
                  <Text strong>{filterPosition === 'all' ? 'Tất cả vị trí' : filterPosition}</Text>
                </div>
                <div className="filter-item">
                  <Text>Khoảng điểm:</Text>
                  <Text strong>{filterScoreRange.join(' - ')}</Text>
                </div>
                <div className="filter-item">
                  <Text>Tổng số người:</Text>
                  <Text strong>{filteredResults.length}</Text>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="export-actions">
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleExport}
                loading={exportLoading}
                size="large"
              >
                Xuất báo cáo
              </Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResultsReport;
