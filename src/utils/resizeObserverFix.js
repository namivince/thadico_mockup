/**
 * Fix for ResizeObserver loop completed with undelivered notifications error
 * This is a common issue in React applications with Ant Design components
 */

// Suppress ResizeObserver errors
const resizeObserverErrorHandler = (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    // Ignore this specific error
    return;
  }
  
  // Let other errors through
  console.error('Unhandled error:', e);
};

// Add error handler for ResizeObserver
if (typeof window !== 'undefined') {
  window.addEventListener('error', resizeObserverErrorHandler);
  
  // Also handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.message?.includes('ResizeObserver')) {
      e.preventDefault();
      return;
    }
  });
}

// Alternative approach: Override ResizeObserver to handle errors gracefully
const originalResizeObserver = window.ResizeObserver;

window.ResizeObserver = class extends originalResizeObserver {
  constructor(callback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (error) {
        if (error.message.includes('ResizeObserver loop completed')) {
          // Ignore this specific error
          return;
        }
        throw error;
      }
    });
  }
};

export default resizeObserverErrorHandler;
