import React, { useState, useEffect } from 'react';
import { 
  Layout, Typography, Card, Radio, Checkbox, Input, 
  Button, Space, Progress, Alert, Upload, Modal, 
  Divider, Spin, Result, Statistic
} from 'antd';
import { 
  ClockCircleOutlined, UploadOutlined, 
  SaveOutlined, SendOutlined, InfoCircleOutlined,
  HistoryOutlined, CheckCircleOutlined, SyncOutlined,
  WarningOutlined, HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './TestRunner.css';

const { Content, Header } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Countdown } = Statistic;

/**
 * Component cho học viên làm bài thi
 * Theo spec: SCR_TEST_RUNNER
 */
const TestRunner = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle'); // idle, saving, saved, error

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchSessionData();
    
    // Set up auto-save timer (mỗi 30s)
    const autoSaveInterval = setInterval(() => {
      if (!submitted) {
        handleAutoSave();
      }
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, []);

  // Mock API call để lấy dữ liệu session
  const fetchSessionData = async () => {
    setLoading(true);
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock session data
    const mockSession = {
      candidate: { id: 'u_1001', name: 'Nguyễn Văn A' },
      campaign: { 
        id: 'cmp_01', 
        name: 'Đánh giá tay nghề Q4', 
        gradeDueAt: '2025-10-20T17:00:00Z',
        timeLimit: 60 // thời gian làm bài tính bằng phút
      },
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          text: 'Quy trình an toàn lao động gồm những bước nào sau đây?',
          options: [
            'A. Kiểm tra thiết bị - Thực hiện công việc - Báo cáo',
            'B. Kiểm tra thiết bị - Đánh giá rủi ro - Thực hiện công việc - Báo cáo',
            'C. Đánh giá rủi ro - Thực hiện công việc - Báo cáo',
            'D. Kiểm tra thiết bị - Đánh giá rủi ro - Báo cáo'
          ],
          multi: false
        },
        {
          id: 'q2',
          type: 'mcq',
          text: 'Khi gặp sự cố máy móc, thứ tự xử lý đúng là gì?',
          options: [
            'A. Ngắt nguồn - Báo cáo - Xử lý sự cố',
            'B. Báo cáo - Ngắt nguồn - Xử lý sự cố',
            'C. Xử lý sự cố - Ngắt nguồn - Báo cáo',
            'D. Ngắt nguồn - Xử lý sự cố - Báo cáo'
          ],
          multi: false
        },
        {
          id: 'q3',
          type: 'mcq',
          text: 'Chọn các thiết bị bảo hộ cần thiết khi vận hành máy CNC (có thể chọn nhiều đáp án)',
          options: [
            'A. Kính bảo hộ',
            'B. Găng tay',
            'C. Mũ bảo hiểm',
            'D. Giày bảo hộ'
          ],
          multi: true
        },
        {
          id: 'q4',
          type: 'essay',
          text: 'Mô tả quy trình thao tác máy X theo tiêu chuẩn ISO 9001.',
          maxLen: 800
        },
        {
          id: 'q5',
          type: 'essay',
          text: 'Nêu các biện pháp đảm bảo an toàn khi vận hành thiết bị có nhiệt độ cao.',
          maxLen: 500
        }
      ],
      submitted: false,
      startTime: new Date().toISOString(),
      endTime: moment().add(60, 'minutes').toISOString()
    };
    
    setSession(mockSession);
    setTimeLeft(moment(mockSession.endTime).diff(moment(), 'milliseconds'));
    setSubmitted(mockSession.submitted);
    setLoading(false);
    
    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem('test_answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  };

  // Xử lý khi chọn đáp án MCQ
  const handleMCQChange = (questionId, value, isMulti = false) => {
    if (submitted) return;
    
    setAnswers(prev => {
      let newAnswers;
      
      if (isMulti) {
        // Xử lý cho câu hỏi multi-choice
        const currentSelections = prev[questionId] || [];
        if (currentSelections.includes(value)) {
          newAnswers = {
            ...prev,
            [questionId]: currentSelections.filter(item => item !== value)
          };
        } else {
          newAnswers = {
            ...prev,
            [questionId]: [...currentSelections, value]
          };
        }
      } else {
        // Xử lý cho câu hỏi single-choice
        newAnswers = {
          ...prev,
          [questionId]: value
        };
      }
      
      // Save to localStorage
      localStorage.setItem('test_answers', JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  // Xử lý khi nhập đáp án Essay
  const handleEssayChange = (questionId, value) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: value
      };
      
      // Save to localStorage
      localStorage.setItem('test_answers', JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  // Xử lý auto-save
  const handleAutoSave = () => {
    if (submitted || Object.keys(answers).length === 0) return;
    
    setAutoSaveStatus('saving');
    
    // Mock API call
    setTimeout(() => {
      localStorage.setItem('test_answers', JSON.stringify(answers));
      setAutoSaveStatus('saved');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus('idle');
      }, 3000);
    }, 1000);
  };

  // Xử lý khi nộp bài
  const handleSubmit = () => {
    setSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      setSubmitModalVisible(false);
      
      // Update session
      setSession(prev => ({
        ...prev,
        submitted: true
      }));
    }, 2000);
  };

  // Render câu hỏi hiện tại
  const renderCurrentQuestion = () => {
    if (!session || loading) return null;
    
    const question = session.questions[currentQuestionIndex];
    if (!question) return null;
    
    return (
      <Card 
        title={`Câu ${currentQuestionIndex + 1}/${session.questions.length}`}
        className="question-card"
      >
        <div className="question-text">{question.text}</div>
        
        {question.type === 'mcq' ? (
          <div className="question-options">
            {question.multi ? (
              // Multi-choice question
              <Checkbox.Group 
                value={answers[question.id] || []}
                onChange={values => handleMCQChange(question.id, values, true)}
                disabled={submitted}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {question.options.map((option, index) => (
                    <Checkbox key={index} value={index}>
                      {option}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            ) : (
              // Single-choice question
              <Radio.Group 
                value={answers[question.id]}
                onChange={e => handleMCQChange(question.id, e.target.value)}
                disabled={submitted}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {question.options.map((option, index) => (
                    <Radio key={index} value={index}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            )}
          </div>
        ) : (
          // Essay question
          <div className="question-essay">
            <TextArea 
              rows={6} 
              placeholder="Nhập câu trả lời của bạn"
              value={answers[question.id] || ''}
              onChange={e => handleEssayChange(question.id, e.target.value)}
              maxLength={question.maxLen}
              showCount
              disabled={submitted}
            />
            
            <div className="essay-attachments">
              <Upload 
                disabled={submitted}
                listType="text"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} disabled={submitted}>
                  Đính kèm minh chứng
                </Button>
              </Upload>
            </div>
          </div>
        )}
      </Card>
    );
  };

  // Render navigation
  const renderNavigation = () => {
    if (!session || loading) return null;
    
    return (
      <div className="question-navigation">
        <div className="navigation-buttons">
          <Button 
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          >
            Câu trước
          </Button>
          <Button 
            disabled={currentQuestionIndex === session.questions.length - 1}
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            type="primary"
          >
            Câu tiếp theo
          </Button>
        </div>
        
        <div className="question-progress">
          <div className="progress-indicators">
            {session.questions.map((_, index) => (
              <Button 
                key={index}
                type={currentQuestionIndex === index ? 'primary' : 
                      answers[session.questions[index].id] ? 'default' : 'dashed'}
                shape="circle"
                size="small"
                onClick={() => setCurrentQuestionIndex(index)}
                className="progress-indicator"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          
          <Progress 
            percent={Math.round(Object.keys(answers).length / session.questions.length * 100)} 
            size="small" 
            status="active"
          />
          <Text type="secondary">
            Đã làm {Object.keys(answers).length}/{session.questions.length} câu
          </Text>
        </div>
      </div>
    );
  };

  // Render auto-save status
  const renderAutoSaveStatus = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return <Text type="secondary"><SyncOutlined spin /> Đang lưu...</Text>;
      case 'saved':
        return <Text type="success"><CheckCircleOutlined /> Đã lưu tự động</Text>;
      case 'error':
        return <Text type="danger"><WarningOutlined /> Lỗi lưu tự động</Text>;
      default:
        return null;
    }
  };

  // Render kết quả sau khi nộp bài
  const renderSubmittedResult = () => {
    if (!session) return null;
    
    return (
      <Result
        status="success"
        title="Bài thi đã được ghi nhận thành công!"
        subTitle={`Chờ kết quả trước ngày ${moment(session.campaign.gradeDueAt).format('DD/MM/YYYY')}`}
        extra={[
          <Button type="primary" key="console" icon={<HomeOutlined />} onClick={() => window.location.href = '/dashboard'}>
            Về Dashboard
          </Button>,
          <Button key="view" onClick={() => setSubmitted(false)}>
            Xem lại bài làm
          </Button>,
          <Button key="demo" onClick={() => window.location.href = '/demo'}>
            Quay về trang demo
          </Button>
        ]}
      />
    );
  };

  if (loading) {
    return (
      <div className="test-runner-loading">
        <Spin size="large" tip="Đang tải bài thi..." />
      </div>
    );
  }

  return (
    <Layout className="test-runner">
      <Header className="test-header">
        <div className="test-header-left">
          <Title level={4} style={{ margin: 0, color: '#fff' }}>
            {session?.campaign?.name}
          </Title>
        </div>
        <div className="test-header-right">
          <Button 
            type="primary" 
            ghost
            icon={<HomeOutlined />} 
            onClick={() => window.location.href = '/dashboard'}
            style={{ marginRight: '16px' }}
          >
            Về Dashboard
          </Button>
          {timeLeft && !submitted && (
            <Countdown
              value={Date.now() + timeLeft}
              format="HH:mm:ss"
              prefix={<ClockCircleOutlined />}
              className="time-countdown"
            />
          )}
        </div>
      </Header>
      
      <Content className="test-content">
        {submitted ? (
          // Hiển thị kết quả sau khi nộp bài
          renderSubmittedResult()
        ) : (
          // Hiển thị bài thi
          <div className="test-container">
            <div className="test-info">
              <Card className="info-card">
                <div className="info-item">
                  <InfoCircleOutlined /> <strong>Thí sinh:</strong> {session?.candidate?.name}
                </div>
                <div className="info-item">
                  <ClockCircleOutlined /> <strong>Thời gian:</strong> {session?.campaign?.timeLimit} phút
                </div>
                <div className="info-item">
                  <HistoryOutlined /> <strong>Bắt đầu lúc:</strong> {moment(session?.startTime).format('HH:mm:ss DD/MM/YYYY')}
                </div>
              </Card>
              
              <Alert
                message="Lưu ý"
                description="Hệ thống sẽ tự động lưu bài làm của bạn mỗi 30 giây. Bạn có thể nộp bài bất cứ lúc nào."
                type="info"
                showIcon
              />
              
              <div className="auto-save-status">
                {renderAutoSaveStatus()}
              </div>
            </div>
            
            <Divider />
            
            {/* Render câu hỏi hiện tại */}
            {renderCurrentQuestion()}
            
            {/* Render navigation */}
            {renderNavigation()}
            
            <div className="test-actions">
              <Button 
                icon={<SaveOutlined />} 
                onClick={handleAutoSave}
                disabled={Object.keys(answers).length === 0}
              >
                Lưu bài
              </Button>
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={() => setSubmitModalVisible(true)}
                disabled={Object.keys(answers).length === 0}
              >
                Nộp bài
              </Button>
            </div>
          </div>
        )}
      </Content>
      
      {/* Submit confirmation modal */}
      <Modal
        title="Xác nhận nộp bài"
        visible={submitModalVisible}
        onOk={handleSubmit}
        onCancel={() => setSubmitModalVisible(false)}
        okText="Nộp bài"
        cancelText="Hủy"
        confirmLoading={submitting}
      >
        <p>Bạn đã hoàn thành {Object.keys(answers).length}/{session?.questions?.length} câu hỏi.</p>
        <p>Bạn có chắc chắn muốn nộp bài?</p>
        <p><strong>Lưu ý:</strong> Sau khi nộp bài, bạn sẽ không thể chỉnh sửa câu trả lời.</p>
      </Modal>
    </Layout>
  );
};

export default TestRunner;
