// src/lib/courseAccess.js

export const hasCourseAccess = (courseId) => {
  if (typeof window === 'undefined') return false;

  try {
    const accessCodes = JSON.parse(localStorage.getItem('courseAccess') || '{}');
    return !!accessCodes[courseId];
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
};
