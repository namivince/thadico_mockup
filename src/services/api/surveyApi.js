import { surveys, surveyResponses, surveyAnalytics } from '../../data/mockData';

/**
 * API services cho Survey module
 */

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const surveyApi = {
  // Get all surveys
  getSurveys: async (params = {}) => {
    await delay();
    
    let filteredSurveys = [...surveys];
    
    // Filter by status
    if (params.status && params.status !== 'all') {
      filteredSurveys = filteredSurveys.filter(s => s.status === params.status);
    }
    
    // Search by name/description
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredSurveys = filteredSurveys.filter(s => 
        s.name.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm) ||
        s.createdBy.toLowerCase().includes(searchTerm)
      );
    }
    
    // Pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      data: filteredSurveys.slice(start, end),
      total: filteredSurveys.length,
      page,
      pageSize
    };
  },

  // Get survey by ID
  getSurvey: async (id) => {
    await delay();
    const survey = surveys.find(s => s.id === parseInt(id));
    if (!survey) {
      throw new Error('Survey not found');
    }
    return survey;
  },

  // Create new survey
  createSurvey: async (surveyData) => {
    await delay(1000);
    
    const newSurvey = {
      id: Date.now(),
      ...surveyData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      totalInvitations: 0,
      totalResponses: 0,
      responseRate: 0
    };
    
    // In real app, this would be saved to backend
    surveys.push(newSurvey);
    
    return newSurvey;
  },

  // Update survey
  updateSurvey: async (id, surveyData) => {
    await delay(800);
    
    const index = surveys.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
      throw new Error('Survey not found');
    }
    
    surveys[index] = {
      ...surveys[index],
      ...surveyData,
      updatedAt: new Date().toISOString()
    };
    
    return surveys[index];
  },

  // Delete survey
  deleteSurvey: async (id) => {
    await delay();
    
    const index = surveys.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
      throw new Error('Survey not found');
    }
    
    if (surveys[index].status === 'running') {
      throw new Error('Cannot delete running survey');
    }
    
    surveys.splice(index, 1);
    return { success: true };
  },

  // Publish survey
  publishSurvey: async (id) => {
    await delay(1200);
    
    const survey = surveys.find(s => s.id === parseInt(id));
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    if (survey.status !== 'draft') {
      throw new Error('Only draft surveys can be published');
    }
    
    // Update survey status
    survey.status = 'published';
    survey.publishedAt = new Date().toISOString();
    
    // Calculate total invitations based on audience
    const totalInvitations = survey.audience.departments.reduce((total, dept) => {
      // Simulate calculation based on department size
      return total + Math.floor(Math.random() * 50) + 20;
    }, 0);
    
    survey.totalInvitations = totalInvitations;
    
    // Simulate sending invitations
    return {
      survey,
      invitationsSent: totalInvitations,
      message: `Survey published successfully. ${totalInvitations} invitations sent.`
    };
  },

  // Close survey
  closeSurvey: async (id) => {
    await delay();
    
    const survey = surveys.find(s => s.id === parseInt(id));
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    if (survey.status !== 'running') {
      throw new Error('Only running surveys can be closed');
    }
    
    survey.status = 'closed';
    survey.closedAt = new Date().toISOString();
    
    return survey;
  },

  // Send reminders
  sendReminders: async (id, reminderType = 'manual') => {
    await delay(800);
    
    const survey = surveys.find(s => s.id === parseInt(id));
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    if (survey.status !== 'running') {
      throw new Error('Can only send reminders for running surveys');
    }
    
    // Calculate pending responses
    const pendingCount = survey.totalInvitations - survey.totalResponses;
    
    return {
      remindersSent: pendingCount,
      reminderType,
      sentAt: new Date().toISOString(),
      message: `Reminders sent to ${pendingCount} participants`
    };
  },

  // Get survey responses
  getSurveyResponses: async (id, params = {}) => {
    await delay();
    
    let responses = surveyResponses.filter(r => r.surveyId === parseInt(id));
    
    // Pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      data: responses.slice(start, end),
      total: responses.length,
      page,
      pageSize
    };
  },

  // Get survey analytics
  getSurveyAnalytics: async (id) => {
    await delay();
    
    const analytics = surveyAnalytics[id];
    if (!analytics) {
      // Generate basic analytics if not available
      const survey = surveys.find(s => s.id === parseInt(id));
      if (!survey) {
        throw new Error('Survey not found');
      }
      
      return {
        responseRate: survey.responseRate,
        departmentStats: [
          { department: 'Phòng Kỹ thuật', invited: 50, responded: 30, rate: 60 },
          { department: 'Phòng Kinh doanh', invited: 40, responded: 25, rate: 62.5 }
        ],
        questionStats: []
      };
    }
    
    return analytics;
  },

  // Export survey data
  exportSurvey: async (id, format = 'csv') => {
    await delay(1500);
    
    const survey = surveys.find(s => s.id === parseInt(id));
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    const responses = surveyResponses.filter(r => r.surveyId === parseInt(id));
    
    // Simulate file generation
    const fileName = `survey_${survey.name.replace(/\s+/g, '_')}_${Date.now()}.${format}`;
    
    return {
      fileName,
      downloadUrl: `/api/surveys/${id}/export/${fileName}`,
      format,
      recordCount: responses.length,
      message: `Export completed: ${responses.length} responses exported to ${format.toUpperCase()}`
    };
  },

  // Get survey statistics
  getSurveyStats: async () => {
    await delay();
    
    return {
      total: surveys.length,
      draft: surveys.filter(s => s.status === 'draft').length,
      published: surveys.filter(s => s.status === 'published').length,
      running: surveys.filter(s => s.status === 'running').length,
      closed: surveys.filter(s => s.status === 'closed').length,
      archived: surveys.filter(s => s.status === 'archived').length,
      totalResponses: surveyResponses.length,
      averageResponseRate: surveys.reduce((sum, s) => sum + s.responseRate, 0) / surveys.length
    };
  },

  // Bulk operations
  bulkDelete: async (ids) => {
    await delay(1000);
    
    const deletedCount = ids.filter(id => {
      const index = surveys.findIndex(s => s.id === parseInt(id));
      if (index !== -1 && surveys[index].status !== 'running') {
        surveys.splice(index, 1);
        return true;
      }
      return false;
    }).length;
    
    return {
      deletedCount,
      message: `Successfully deleted ${deletedCount} surveys`
    };
  },

  bulkPublish: async (ids) => {
    await delay(1200);
    
    const publishedCount = ids.filter(id => {
      const survey = surveys.find(s => s.id === parseInt(id));
      if (survey && survey.status === 'draft') {
        survey.status = 'published';
        survey.publishedAt = new Date().toISOString();
        return true;
      }
      return false;
    }).length;
    
    return {
      publishedCount,
      message: `Successfully published ${publishedCount} surveys`
    };
  },

  // Get survey templates
  getSurveyTemplates: async () => {
    await delay();
    
    return [
      {
        id: 'training_needs',
        name: 'Khảo sát nhu cầu đào tạo',
        description: 'Template chuẩn cho khảo sát nhu cầu đào tạo nhân viên',
        category: 'training',
        questions: [
          {
            type: 'multiple_choice',
            text: 'Bạn muốn được đào tạo về lĩnh vực nào?',
            options: ['Kỹ năng lãnh đạo', 'Kỹ thuật chuyên môn', 'Ngoại ngữ', 'Tin học văn phòng'],
            required: true
          },
          {
            type: 'rating',
            text: 'Đánh giá mức độ cần thiết của việc đào tạo?',
            scale: 5,
            required: true
          }
        ]
      },
      {
        id: 'employee_satisfaction',
        name: 'Khảo sát hài lòng nhân viên',
        description: 'Template đánh giá mức độ hài lòng của nhân viên',
        category: 'satisfaction',
        questions: [
          {
            type: 'rating',
            text: 'Mức độ hài lòng về môi trường làm việc',
            scale: 5,
            required: true
          },
          {
            type: 'multiple_choice',
            text: 'Yếu tố nào bạn muốn cải thiện nhất?',
            options: ['Lương thưởng', 'Phúc lợi', 'Môi trường', 'Cơ hội thăng tiến'],
            required: true
          }
        ]
      }
    ];
  }
};
