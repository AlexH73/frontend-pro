export const getThemeStyles = (theme: 'light' | 'dark') => {
  const styles = {
    light: {
      select: {
        color: '#1f2937',
        backgroundColor: '#ffffff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d1d5db',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#9ca3af',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#3b82f6',
        },
        '& .MuiSvgIcon-root': {
          color: '#6b7280',
        },
      },
      label: {
        color: '#6b7280',
        '&.Mui-focused': {
          color: '#3b82f6',
        },
      },
      menu: {
        backgroundColor: '#ffffff',
        color: '#1f2937',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
          '&.Mui-selected': {
            backgroundColor: '#e5e7eb',
          },
        },
      },
      chip: {
        selected: {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2563eb',
          },
        },
        unselected: {
          backgroundColor: 'transparent',
          color: '#4b5563',
          borderColor: '#d1d5db',
          '&:hover': {
            backgroundColor: '#f3f4f6',
            borderColor: '#9ca3af',
          },
        },
      },
      button: {
        secondary: {
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          borderColor: '#8b5cf6',
          '&:hover': {
            backgroundColor: '#7c3aed',
            borderColor: '#7c3aed',
          },
        },
      },
    },
    dark: {
      select: {
        color: '#f9fafb',
        backgroundColor: '#374151',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4b5563',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#6b7280',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#60a5fa',
        },
        '& .MuiSvgIcon-root': {
          color: '#9ca3af',
        },
      },
      label: {
        color: '#9ca3af',
        '&.Mui-focused': {
          color: '#60a5fa',
        },
      },
      menu: {
        backgroundColor: '#374151',
        color: '#f9fafb',
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#4b5563',
          },
          '&.Mui-selected': {
            backgroundColor: '#1f2937',
          },
        },
      },
      chip: {
        selected: {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#2563eb',
          },
        },
        unselected: {
          backgroundColor: 'transparent',
          color: '#d1d5db',
          borderColor: '#4b5563',
          '&:hover': {
            backgroundColor: '#374151',
            borderColor: '#6b7280',
          },
        },
      },
      button: {
        secondary: {
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          borderColor: '#8b5cf6',
          '&:hover': {
            backgroundColor: '#7c3aed',
            borderColor: '#7c3aed',
          },
        },
      },
    },
  };

  return styles[theme];
};
