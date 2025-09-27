import React from 'react';
import { Card, Row, Col, Statistic, Tooltip, Progress, Badge } from 'antd';
import { 
  FormOutlined, 
  RocketOutlined, 
  TrophyOutlined, 
  FileAddOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  WarningOutlined,
  FileProtectOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  AuditOutlined,
  PercentageOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/**
 * Component hiển thị widget KPI cho 3 luồng chính
 */
const KpiWidget = ({ data, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào KPI để điều hướng
  const handleKpiClick = (path, filter) => {
    navigate(path, { state: { filter } });
  };

  // Kiểm tra dữ liệu có sẵn
  if (!data) {
    return (
      <div className="kpi-widgets">
        <Row gutter={[16, 16]}>
          {[1, 2, 3].map(i => (
            <Col xs={24} md={8} key={i}>
              <Card loading={true} className="kpi-card" />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="kpi-widgets">
      <Row gutter={[16, 16]}>
        {/* F1 - Surveys */}
        <Col xs={24} md={8}>
          <Card 
            title={
              <div className="kpi-card-title">
                <FormOutlined className="kpi-card-icon f1-icon" />
                <span>Khảo sát (F1)</span>
              </div>
            }
            className="kpi-card f1-card"
            loading={loading}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Tooltip title="Số khảo sát đang soạn thảo">
                  <Statistic 
                    title="Nháp" 
                    value={data?.surveys?.draft || 0} 
                    prefix={<FileAddOutlined />} 
                    onClick={() => handleKpiClick('/surveys', 'draft')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số khảo sát đang chạy">
                  <Statistic 
                    title="Đang chạy" 
                    value={data?.surveys?.running || 0} 
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<RocketOutlined />}
                    onClick={() => handleKpiClick('/surveys', 'running')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số khảo sát sắp hết hạn">
                  <Statistic 
                    title="Sắp hết hạn" 
                    value={data?.surveys?.dueSoon || 0} 
                    valueStyle={{ color: '#faad14' }}
                    prefix={<ClockCircleOutlined />}
                    onClick={() => handleKpiClick('/surveys', 'dueSoon')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Tooltip title="Số khảo sát quá hạn">
                  <Statistic 
                    title="Quá hạn" 
                    value={data?.surveys?.overdue || 0} 
                    valueStyle={{ color: '#f5222d' }}
                    prefix={<WarningOutlined />}
                    onClick={() => handleKpiClick('/surveys', 'overdue')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={12}>
                <Tooltip title="Tỷ lệ phản hồi trung bình">
                  <Statistic 
                    title="Tỷ lệ phản hồi" 
                    value={data?.surveys?.responseRate || 0} 
                    precision={1}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<PercentageOutlined />}
                    onClick={() => handleKpiClick('/surveys/analytics')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <div className="kpi-progress" style={{ marginTop: 16 }}>
              <div className="progress-header">
                <span>Tiến độ hoàn thành</span>
                <Badge count={data?.progress?.f1?.pendingReminders || 0} overflowCount={99} />
              </div>
              <Progress 
                percent={data?.progress?.f1?.completionPct || 0} 
                status="active" 
                strokeColor="#722ed1"
              />
            </div>
          </Card>
        </Col>

        {/* F2 - Training Plans */}
        <Col xs={24} md={8}>
          <Card 
            title={
              <div className="kpi-card-title">
                <RocketOutlined className="kpi-card-icon f2-icon" />
                <span>Kế hoạch đào tạo (F2)</span>
              </div>
            }
            className="kpi-card f2-card"
            loading={loading}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Tooltip title="Số kế hoạch đang soạn thảo">
                  <Statistic 
                    title="Nháp" 
                    value={data?.trainingPlans?.draft || 0} 
                    prefix={<FileAddOutlined />} 
                    onClick={() => handleKpiClick('/training/plans', 'draft')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số kế hoạch đang chờ duyệt">
                  <Statistic 
                    title="Chờ duyệt" 
                    value={data?.trainingPlans?.waitingApproval || 0} 
                    valueStyle={{ color: '#faad14' }}
                    prefix={<AuditOutlined />}
                    onClick={() => handleKpiClick('/training/plans', 'waiting_approval')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số kế hoạch đã duyệt">
                  <Statistic 
                    title="Đã duyệt" 
                    value={data?.trainingPlans?.approved || 0} 
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                    onClick={() => handleKpiClick('/training/plans', 'approved')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Tooltip title="Số kế hoạch đang triển khai">
                  <Statistic 
                    title="Đang triển khai" 
                    value={data?.trainingPlans?.deployed || 0} 
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<RocketOutlined />}
                    onClick={() => handleKpiClick('/training/plans', 'deployed')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={12}>
                <Tooltip title="Số kế hoạch đã hoàn thành">
                  <Statistic 
                    title="Hoàn thành" 
                    value={data?.trainingPlans?.completed || 0} 
                    valueStyle={{ color: '#13c2c2' }}
                    prefix={<FileDoneOutlined />}
                    onClick={() => handleKpiClick('/training/plans', 'completed')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <div className="kpi-progress" style={{ marginTop: 16 }}>
              <div className="progress-header">
                <span>Tiến độ hoàn thành</span>
                <Badge count={data?.progress?.f2?.approvalsPending || 0} overflowCount={99} />
              </div>
              <Progress 
                percent={data?.progress?.f2?.completionPct || 0} 
                status="active" 
                strokeColor="#13c2c2"
              />
            </div>
          </Card>
        </Col>

        {/* F3 - Assessments */}
        <Col xs={24} md={8}>
          <Card 
            title={
              <div className="kpi-card-title">
                <TrophyOutlined className="kpi-card-icon f3-icon" />
                <span>Đánh giá (F3)</span>
              </div>
            }
            className="kpi-card f3-card"
            loading={loading}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Tooltip title="Số đánh giá đang soạn thảo">
                  <Statistic 
                    title="Nháp" 
                    value={data?.assessments?.draft || 0} 
                    prefix={<FileAddOutlined />} 
                    onClick={() => handleKpiClick('/assessment/rounds', 'draft')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số đánh giá đang chạy">
                  <Statistic 
                    title="Đang chạy" 
                    value={data?.assessments?.running || 0} 
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<RocketOutlined />}
                    onClick={() => handleKpiClick('/assessment/rounds', 'running')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Số đánh giá đang chấm điểm">
                  <Statistic 
                    title="Đang chấm" 
                    value={data?.assessments?.grading || 0} 
                    valueStyle={{ color: '#faad14' }}
                    prefix={<AuditOutlined />}
                    onClick={() => handleKpiClick('/assessment/rounds', 'grading')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Tooltip title="Số đánh giá đã công bố kết quả">
                  <Statistic 
                    title="Đã công bố" 
                    value={data?.assessments?.resultsPublished || 0} 
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<FileProtectOutlined />}
                    onClick={() => handleKpiClick('/assessment/rounds', 'published')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
              <Col span={12}>
                <Tooltip title="Số đánh giá đã hoàn thành">
                  <Statistic 
                    title="Hoàn thành" 
                    value={data?.assessments?.finalized || 0} 
                    valueStyle={{ color: '#13c2c2' }}
                    prefix={<FileDoneOutlined />}
                    onClick={() => handleKpiClick('/assessment/rounds', 'finalized')}
                    className="clickable-stat"
                  />
                </Tooltip>
              </Col>
            </Row>
            <div className="kpi-progress" style={{ marginTop: 16 }}>
              <div className="progress-header">
                <span>Tiến độ hoàn thành</span>
                <Badge count={data?.progress?.f3?.gradingSLA || 0} overflowCount={99} />
              </div>
              <Progress 
                percent={data?.progress?.f3?.completionPct || 0} 
                status="active" 
                strokeColor="#fa8c16"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KpiWidget;
