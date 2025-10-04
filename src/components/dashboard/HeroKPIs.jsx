import React from 'react';
import { Row, Col, Card, Statistic, Tooltip, Badge } from 'antd';
import { 
  FormOutlined, 
  BookOutlined, 
  TrophyOutlined,
  FileAddOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  PercentageOutlined,
  FileExclamationOutlined,
  AuditOutlined,
  CheckSquareOutlined,
  DeploymentUnitOutlined,
  FileDoneOutlined,
  PauseCircleOutlined,
  EditOutlined,
  StopOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './HeroKPIs.css';

/**
 * Component hiển thị Hero KPIs cho 3 luồng chính
 * Theo spec: SCR_ADMIN_DASHBOARD
 */
const HeroKPIs = ({ data, loading }) => {
  const navigate = useNavigate();

  // Xử lý khi click vào KPI
  const handleKpiClick = (flow, kpi) => {
    // Điều hướng đến trang tương ứng với filter preset
    switch (flow) {
      case 'F1':
        navigate(`/surveys?status=${kpi}`);
        break;
      case 'F2':
        navigate(`/training/plans?status=${kpi}`);
        break;
      case 'F3':
        navigate(`/assessment/rounds?status=${kpi}`);
        break;
      default:
        break;
    }
  };

  // Render KPI cho F1 - Surveys
  const renderF1KPIs = () => {
    const f1Data = data?.F1 || {};
    
    return (
      <Card 
        title={
          <div className="kpi-card-title">
            <FormOutlined style={{ marginRight: 8, color: '#7C4DFF' }} />
            <span>Khảo sát</span>
          </div>
        }
        className="kpi-card f1-card"
        loading={loading}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Tooltip title="Số khảo sát đang soạn thảo">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F1', 'draft')}
              >
                <Statistic 
                  title="Nháp" 
                  value={f1Data.draft || 0} 
                  prefix={<FileAddOutlined />} 
                  valueStyle={{ color: '#7C4DFF' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số khảo sát đang chạy">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F1', 'running')}
              >
                <Statistic 
                  title="Đang chạy" 
                  value={f1Data.running || 0} 
                  prefix={<ClockCircleOutlined />} 
                  valueStyle={{ color: '#7C4DFF' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số khảo sát sắp đến hạn">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F1', 'dueSoon')}
              >
                <Statistic 
                  title="Sắp đến hạn" 
                  value={f1Data.dueSoon || 0} 
                  prefix={<WarningOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title="Số khảo sát quá hạn">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F1', 'overdue')}
              >
                <Statistic 
                  title="Quá hạn" 
                  value={f1Data.overdue || 0} 
                  prefix={<FileExclamationOutlined />} 
                  valueStyle={{ color: '#f5222d' }}
                />
                {f1Data.overdue > 0 && (
                  <Badge 
                    count="Cần xử lý" 
                    style={{ backgroundColor: '#f5222d' }} 
                  />
                )}
              </Card>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title="Tỷ lệ phản hồi trung bình">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F1', 'responseRate')}
              >
                <Statistic 
                  title="Tỷ lệ phản hồi" 
                  value={f1Data.responseRate || 0} 
                  precision={1}
                  suffix="%" 
                  prefix={<PercentageOutlined />} 
                  valueStyle={{ color: '#7C4DFF' }}
                />
              </Card>
            </Tooltip>
          </Col>
        </Row>
      </Card>
    );
  };

  // Render KPI cho F2 - Training Plans
  const renderF2KPIs = () => {
    const f2Data = data?.F2 || {};
    
    return (
      <Card 
        title={
          <div className="kpi-card-title">
            <BookOutlined style={{ marginRight: 8, color: '#10BDBD' }} />
            <span>Kế hoạch đào tạo</span>
          </div>
        }
        className="kpi-card f2-card"
        loading={loading}
      >
        <Row gutter={[16, 16]}>
          {/* Hàng 1 */}
          <Col span={6}>
            <Tooltip title="Số kế hoạch đang soạn thảo">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'draft')}
              >
                <Statistic 
                  title="Nháp" 
                  value={f2Data.draft || 0} 
                  prefix={<FileAddOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đang chờ phê duyệt">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'waitingApproval')}
              >
                <Statistic 
                  title="Chờ duyệt" 
                  value={f2Data.waitingApproval || 0} 
                  prefix={<AuditOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đang điều chỉnh">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'inAdjustment')}
              >
                <Statistic 
                  title="Điều chỉnh" 
                  value={f2Data.inAdjustment || 0} 
                  prefix={<EditOutlined />} 
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đã được phê duyệt">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'approved')}
              >
                <Statistic 
                  title="Đã duyệt" 
                  value={f2Data.approved || 0} 
                  prefix={<CheckCircleOutlined />} 
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Tooltip>
          </Col>

          {/* Hàng 2 */}
          <Col span={6}>
            <Tooltip title="Số kế hoạch đang tạm hoãn">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'onHold')}
              >
                <Statistic 
                  title="Tạm hoãn" 
                  value={f2Data.onHold || 0} 
                  prefix={<PauseCircleOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đã hủy">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'canceled')}
              >
                <Statistic 
                  title="Đã hủy" 
                  value={f2Data.canceled || 0} 
                  prefix={<StopOutlined />} 
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đã triển khai">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'deployed')}
              >
                <Statistic 
                  title="Đã triển khai" 
                  value={f2Data.deployed || 0} 
                  prefix={<DeploymentUnitOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip title="Số kế hoạch đã hoàn thành">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'completed')}
              >
                <Statistic 
                  title="Đã hoàn thành" 
                  value={f2Data.completed || 0} 
                  prefix={<FileDoneOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>

          {/* Hàng 3 - KPI mới */}
          <Col span={8}>
            <Tooltip title="Số khóa học đã triển khai / bị hoãn / bị hủy">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'courses')}
              >
                <Statistic 
                  title="Khóa học" 
                  value={`${f2Data.courseStats?.deployed || 0}/${f2Data.courseStats?.onHold || 0}/${f2Data.courseStats?.canceled || 0}`} 
                  prefix={<BookOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số nhân sự đã tham gia / chưa tham gia / không tham gia">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'staff')}
              >
                <Statistic 
                  title="Nhân sự" 
                  value={`${f2Data.staffStats?.participated || 0}/${f2Data.staffStats?.notParticipated || 0}/${f2Data.staffStats?.declined || 0}`} 
                  prefix={<TeamOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số giảng viên đã tham gia / chưa tham gia / bị thay thế">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'teachers')}
              >
                <Statistic 
                  title="Giảng viên" 
                  value={`${f2Data.teacherStats?.participated || 0}/${f2Data.teacherStats?.notParticipated || 0}/${f2Data.teacherStats?.replaced || 0}`} 
                  prefix={<UserOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>

          {/* Hàng 4 - KPI mới */}
          <Col span={12}>
            <Tooltip title="Tổng số bộ môn thực hiện / chưa thực hiện">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'subjects')}
              >
                <Statistic 
                  title="Bộ môn" 
                  value={`${f2Data.subjectStats?.completed || 0}/${f2Data.subjectStats?.pending || 0}`} 
                  prefix={<BookOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title="Tổng chi phí theo kế hoạch vs phát sinh thêm">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F2', 'budget')}
              >
                <Statistic 
                  title="Chi phí" 
                  value={`${formatCurrency(f2Data.budget?.plan || 0)} / +${formatCurrency(f2Data.budget?.actual || 0)}`} 
                  prefix={<DollarOutlined />} 
                  valueStyle={{ color: '#10BDBD' }}
                />
              </Card>
            </Tooltip>
          </Col>
        </Row>
      </Card>
    );
  };
  
  // Hàm format tiền tệ
  const formatCurrency = (value) => {
    if (!value) return '0';
    return new Intl.NumberFormat('vi-VN', { 
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(value / 1000000) + 'M';
  };

  // Render KPI cho F3 - Assessments
  const renderF3KPIs = () => {
    const f3Data = data?.F3 || {};
    
    return (
      <Card 
        title={
          <div className="kpi-card-title">
            <TrophyOutlined style={{ marginRight: 8, color: '#FF9800' }} />
            <span>Đánh giá năng lực</span>
          </div>
        }
        className="kpi-card f3-card"
        loading={loading}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Tooltip title="Số đợt đánh giá đang soạn thảo">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F3', 'draft')}
              >
                <Statistic 
                  title="Nháp" 
                  value={f3Data.draft || 0} 
                  prefix={<FileAddOutlined />} 
                  valueStyle={{ color: '#FF9800' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số đợt đánh giá đang chạy">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F3', 'running')}
              >
                <Statistic 
                  title="Đang chạy" 
                  value={f3Data.running || 0} 
                  prefix={<ClockCircleOutlined />} 
                  valueStyle={{ color: '#FF9800' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Số đợt đánh giá đang chấm">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F3', 'grading')}
              >
                <Statistic 
                  title="Đang chấm" 
                  value={f3Data.grading || 0} 
                  prefix={<CheckSquareOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title="Số đợt đánh giá đã công bố kết quả">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F3', 'resultsPublished')}
              >
                <Statistic 
                  title="Đã công bố" 
                  value={f3Data.resultsPublished || 0} 
                  prefix={<FileDoneOutlined />} 
                  valueStyle={{ color: '#FF9800' }}
                />
              </Card>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip title="Số đợt đánh giá đã hoàn tất">
              <Card 
                className="kpi-item-card" 
                onClick={() => handleKpiClick('F3', 'finalized')}
              >
                <Statistic 
                  title="Đã hoàn tất" 
                  value={f3Data.finalized || 0} 
                  prefix={<CheckCircleOutlined />} 
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Tooltip>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div className="hero-kpis-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          {renderF1KPIs()}
        </Col>
        <Col xs={24} lg={16}>
          {renderF2KPIs()}
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          {renderF3KPIs()}
        </Col>
      </Row>
    </div>
  );
};

export default HeroKPIs;
