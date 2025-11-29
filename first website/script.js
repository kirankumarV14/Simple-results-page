// Default results data
const defaultData = {
  "students": [
    {
      "rollNumber": "2024001",
      "name": "Rajesh Kumar",
      "totalMarks": 485,
      "grade": "A"
    },
    {
      "rollNumber": "2024002",
      "name": "Priya Sharma",
      "totalMarks": 472,
      "grade": "A"
    },
    {
      "rollNumber": "2024003",
      "name": "Amit Patel",
      "totalMarks": 438,
      "grade": "B"
    },
    {
      "rollNumber": "2024004",
      "name": "Sneha Reddy",
      "totalMarks": 456,
      "grade": "A"
    },
    {
      "rollNumber": "2024005",
      "name": "Vikram Singh",
      "totalMarks": 415,
      "grade": "B"
    },
    {
      "rollNumber": "2024006",
      "name": "Anjali Desai",
      "totalMarks": 398,
      "grade": "C"
    },
    {
      "rollNumber": "2024007",
      "name": "Rohit Mehta",
      "totalMarks": 445,
      "grade": "A"
    },
    {
      "rollNumber": "2024008",
      "name": "Kavita Nair",
      "totalMarks": 428,
      "grade": "B"
    },
    {
      "rollNumber": "2024009",
      "name": "Suresh Iyer",
      "totalMarks": 385,
      "grade": "C"
    },
    {
      "rollNumber": "2024010",
      "name": "Meera Joshi",
      "totalMarks": 462,
      "grade": "A"
    },
    {
      "rollNumber": "2024011",
      "name": "Arjun Malhotra",
      "totalMarks": 405,
      "grade": "B"
    },
    {
      "rollNumber": "2024012",
      "name": "Divya Kapoor",
      "totalMarks": 375,
      "grade": "C"
    },
    {
      "rollNumber": "2024013",
      "name": "Nikhil Agarwal",
      "totalMarks": 352,
      "grade": "D"
    },
    {
      "rollNumber": "2024014",
      "name": "Pooja Verma",
      "totalMarks": 441,
      "grade": "A"
    },
    {
      "rollNumber": "2024015",
      "name": "Manish Gupta",
      "totalMarks": 392,
      "grade": "C"
    }
  ]
};

// Load data from localStorage or use default
let resultsData = loadDataFromStorage();

// Load data from localStorage
function loadDataFromStorage() {
    try {
        const stored = localStorage.getItem('examResultsData');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
    // Save default data to localStorage
    saveDataToStorage(defaultData);
    return defaultData;
}

// Save data to localStorage
function saveDataToStorage(data) {
    try {
        localStorage.setItem('examResultsData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Error saving data. Please check browser storage settings.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize views
    initializeViews();
    
    // Handle student search form submission
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
    
    // Allow Enter key to submit
    const rollNumberInput = document.getElementById('rollNumber');
    rollNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e);
        }
    });

    // Admin panel toggle
    const adminToggle = document.getElementById('adminToggle');
    adminToggle.addEventListener('click', toggleAdminView);

    // Admin form submission
    const adminForm = document.getElementById('adminForm');
    adminForm.addEventListener('submit', handleAdminFormSubmit);

    // Cancel edit button
    const cancelEdit = document.getElementById('cancelEdit');
    cancelEdit.addEventListener('click', cancelEditMode);

    // Load and display students list
    displayStudentsList();
});

// Initialize views
function initializeViews() {
    const studentView = document.getElementById('studentView');
    const adminView = document.getElementById('adminView');
    const adminToggle = document.getElementById('adminToggle');
    
    // Check if admin view was active
    const isAdminView = sessionStorage.getItem('adminViewActive') === 'true';
    
    if (isAdminView) {
        studentView.classList.add('hidden');
        adminView.classList.remove('hidden');
        adminToggle.textContent = 'Student View';
    } else {
        studentView.classList.remove('hidden');
        adminView.classList.add('hidden');
        adminToggle.textContent = 'Admin Panel';
    }
}

// Toggle between student and admin views
function toggleAdminView() {
    const studentView = document.getElementById('studentView');
    const adminView = document.getElementById('adminView');
    const adminToggle = document.getElementById('adminToggle');
    
    if (adminView.classList.contains('hidden')) {
        // Switch to admin view
        studentView.classList.add('hidden');
        adminView.classList.remove('hidden');
        adminToggle.textContent = 'Student View';
        sessionStorage.setItem('adminViewActive', 'true');
        displayStudentsList();
    } else {
        // Switch to student view
        studentView.classList.remove('hidden');
        adminView.classList.add('hidden');
        adminToggle.textContent = 'Admin Panel';
        sessionStorage.setItem('adminViewActive', 'false');
    }
}

// Handle search functionality
function handleSearch(event) {
    event.preventDefault();
    
    const rollNumber = document.getElementById('rollNumber').value.trim();
    const resultSection = document.getElementById('resultSection');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide previous results and errors
    resultSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Validate input
    if (!rollNumber) {
        showError('Please enter a roll number');
        return;
    }
    
    // Search for student by roll number
    const student = resultsData.students.find(
        s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase()
    );
    
    if (student) {
        displayResults(student);
    } else {
        showError();
    }
}

// Display results
function displayResults(student) {
    const resultSection = document.getElementById('resultSection');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide error message
    errorMessage.classList.add('hidden');
    
    // Update result fields
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('displayRollNumber').textContent = student.rollNumber;
    document.getElementById('totalMarks').textContent = student.totalMarks;
    
    // Update grade with appropriate class
    const gradeElement = document.getElementById('grade');
    gradeElement.textContent = student.grade;
    gradeElement.className = 'value grade ' + student.grade;
    
    // Show result section
    resultSection.classList.remove('hidden');
    
    // Scroll to results smoothly
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show error message
function showError(customMessage) {
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');
    
    // Hide result section
    resultSection.classList.add('hidden');
    
    // Update error message if custom message provided
    if (customMessage) {
        errorMessage.querySelector('p').textContent = customMessage;
    }
    
    // Show error message
    errorMessage.classList.remove('hidden');
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Admin Panel Functions

// Handle admin form submission
function handleAdminFormSubmit(event) {
    event.preventDefault();
    
    const rollNumber = document.getElementById('adminRollNumber').value.trim();
    const name = document.getElementById('adminName').value.trim();
    const totalMarks = parseInt(document.getElementById('adminMarks').value);
    const grade = document.getElementById('adminGrade').value;
    const editIndex = document.getElementById('editIndex').value;
    
    // Validate
    if (!rollNumber || !name || !totalMarks || !grade) {
        showAdminMessage('Please fill in all fields', 'error');
        return;
    }
    
    const studentData = {
        rollNumber: rollNumber,
        name: name,
        totalMarks: totalMarks,
        grade: grade
    };
    
    if (editIndex !== '') {
        // Update existing student
        const index = parseInt(editIndex);
        // Check if roll number is being changed and if it conflicts
        if (resultsData.students[index].rollNumber !== rollNumber) {
            const existing = resultsData.students.find(s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
            if (existing) {
                showAdminMessage('Roll number already exists', 'error');
                return;
            }
        }
        resultsData.students[index] = studentData;
        showAdminMessage('Student updated successfully!', 'success');
    } else {
        // Add new student
        // Check if roll number already exists
        const existing = resultsData.students.find(s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
        if (existing) {
            showAdminMessage('Roll number already exists', 'error');
            return;
        }
        resultsData.students.push(studentData);
        showAdminMessage('Student added successfully!', 'success');
    }
    
    // Save to localStorage
    saveDataToStorage(resultsData);
    
    // Reset form
    resetAdminForm();
    
    // Refresh students list
    displayStudentsList();
}

// Reset admin form
function resetAdminForm() {
    document.getElementById('adminForm').reset();
    document.getElementById('editIndex').value = '';
    document.getElementById('formTitle').textContent = 'Add New Student';
    document.getElementById('cancelEdit').classList.add('hidden');
}

// Cancel edit mode
function cancelEditMode() {
    resetAdminForm();
}

// Edit student
function editStudent(index) {
    const student = resultsData.students[index];
    
    document.getElementById('adminRollNumber').value = student.rollNumber;
    document.getElementById('adminName').value = student.name;
    document.getElementById('adminMarks').value = student.totalMarks;
    document.getElementById('adminGrade').value = student.grade;
    document.getElementById('editIndex').value = index;
    document.getElementById('formTitle').textContent = 'Edit Student';
    document.getElementById('cancelEdit').classList.remove('hidden');
    
    // Scroll to form
    document.getElementById('adminForm').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Delete student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student record?')) {
        resultsData.students.splice(index, 1);
        saveDataToStorage(resultsData);
        displayStudentsList();
        showAdminMessage('Student deleted successfully!', 'success');
    }
}

// Display students list
function displayStudentsList() {
    const studentsList = document.getElementById('studentsList');
    const studentCount = document.getElementById('studentCount');
    
    studentCount.textContent = resultsData.students.length;
    
    if (resultsData.students.length === 0) {
        studentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No students found. Add your first student above.</p>';
        return;
    }
    
    // Sort by roll number
    const sortedStudents = [...resultsData.students].sort((a, b) => 
        a.rollNumber.localeCompare(b.rollNumber)
    );
    
    studentsList.innerHTML = sortedStudents.map((student, index) => {
        const actualIndex = resultsData.students.findIndex(s => s.rollNumber === student.rollNumber);
        return `
            <div class="student-item">
                <div class="student-info">
                    <div class="student-info-item">
                        <span class="info-label">Roll Number</span>
                        <span class="info-value">${student.rollNumber}</span>
                    </div>
                    <div class="student-info-item">
                        <span class="info-label">Name</span>
                        <span class="info-value">${student.name}</span>
                    </div>
                    <div class="student-info-item">
                        <span class="info-label">Total Marks</span>
                        <span class="info-value">${student.totalMarks}</span>
                    </div>
                    <div class="student-info-item">
                        <span class="info-label">Grade</span>
                        <span class="info-value grade ${student.grade}">${student.grade}</span>
                    </div>
                </div>
                <div class="student-actions">
                    <button class="btn-edit" onclick="editStudent(${actualIndex})">Edit</button>
                    <button class="btn-danger" onclick="deleteStudent(${actualIndex})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Show admin message
function showAdminMessage(message, type) {
    // Remove existing messages
    const existing = document.querySelector('.admin-message');
    if (existing) {
        existing.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `admin-message ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    const adminSection = document.querySelector('.admin-section');
    adminSection.insertBefore(messageDiv, adminSection.firstChild);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Make functions globally available for onclick handlers
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;

