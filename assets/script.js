// ===== Mo Tools - Shared JavaScript ===== 

// ===== Theme Management =====
function applyTheme() {
  const savedTheme = localStorage.getItem('mo-tools-theme') || 'neon';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update theme selector dropdown if exists
  const themeSelector = document.getElementById('theme');
  if (themeSelector) {
    themeSelector.value = savedTheme;
  }
}

function changeTheme(theme) {
  localStorage.setItem('mo-tools-theme', theme);
  applyTheme();
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', applyTheme);

// ===== Common Utility Functions =====

// Copy text to clipboard
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '✓ تم النسخ!';
    buttonElement.style.background = 'var(--primary-color)';
    buttonElement.style.color = 'var(--bg-dark)';
    buttonElement.style.borderColor = 'var(--primary-color)';
    
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.style.background = '';
      buttonElement.style.color = '';
      buttonElement.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert('فشل النسخ إلى الحافظة');
  });
}

// Save to localStorage
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

// Load from localStorage
function loadFromLocalStorage(key, defaultValue = '') {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return defaultValue;
  }
}

// Format JSON with indentation
function formatJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return jsonString; // Return original if invalid
  }
}

// Minify JSON
function minifyJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch (e) {
    return jsonString;
  }
}

// Validate JSON
function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

// Base64 encode/decode functions
function base64Encode(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

function base64Decode(text) {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return 'خطأ: نص Base64 غير صالح';
  }
}

// CSS Beautifier (basic implementation)
function beautifyCSS(css) {
  // Remove comments
  let result = css.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove extra whitespace
  result = result.replace(/\s+/g, ' ');
  
  // Remove whitespace around {, }, :, ;
  result = result.replace(/\s*([{}:;,])\s*/g, '$1');
  
  // Add newlines for better readability
  result = result.replace(/([{}])/g, '$1\n');
  result = result.replace(/([;])/g, '$1\n    ');
  
  // Remove empty lines
  result = result.replace(/\n\s*\n/g, '\n');
  
  return result.trim();
}

// Minify CSS
function minifyCSS(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*([{}:;,])\s*/g, '$1')
            .trim();
}

// Show error message
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.color = '#ff4444';
    setTimeout(() => {
      element.textContent = '';
    }, 3000);
  }
}

// Show success message
function showSuccess(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.color = 'var(--primary-color)';
    setTimeout(() => {
      element.textContent = '';
    }, 3000);
  }
}

// Initialize all copy buttons
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.value || targetElement.textContent, this);
      }
    });
  });
}

// Run on DOM load
document.addEventListener('DOMContentLoaded', function() {
  applyTheme();
  initCopyButtons();
});
