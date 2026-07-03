// Database of mock candidates
const STUDENT_DATABASE = {
  "foundation": {
    "611535": {
      "regno": "WRO0855721",
      "name": "VISHWAJEET ANIL PATIL",
      "rollno": "611535",
      "total": 115,
      "status": "UNSUCCESSFUL",
      "papers": [
        { "id": "Paper 1", "subject": "Accounting", "marks": "025" },
        { "id": "Paper 2", "subject": "Business Laws", "marks": "032" },
        { "id": "Paper 3", "subject": "Quantitative Aptitude - Business Mathematics, Logical Reasoning, Statistics", "marks": "031" },
        { "id": "Paper 4", "subject": "Business Economics", "marks": "027" }
      ]
    },
    "654321": {
      "regno": "WRO1234567",
      "name": "KAVITA SHARMA",
      "rollno": "654321",
      "total": 240,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Paper 1", "subject": "Accounting", "marks": "058" },
        { "id": "Paper 2", "subject": "Business Laws", "marks": "062" },
        { "id": "Paper 3", "subject": "Quantitative Aptitude - Business Mathematics, Logical Reasoning, Statistics", "marks": "055" },
        { "id": "Paper 4", "subject": "Business Economics", "marks": "065" }
      ]
    }
  },
  "foundation-merit": {
    "611535": {
      "regno": "WRO0855721",
      "name": "VISHWAJEET ANIL PATIL",
      "rollno": "611535",
      "total": 115,
      "status": "UNSUCCESSFUL",
      "papers": [
        { "id": "Rank", "subject": "All India Rank", "marks": "N/A (Failed)" }
      ]
    },
    "654321": {
      "regno": "WRO1234567",
      "name": "KAVITA SHARMA",
      "rollno": "654321",
      "total": 240,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Rank", "subject": "All India Rank", "marks": "Rank 15" }
      ]
    }
  },
  "intermediate": {
    "711535": {
      "regno": "WRO0855721",
      "name": "ANIKET SHARMA",
      "rollno": "711535",
      "total": 350,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Paper 1", "subject": "Advanced Accounting", "marks": "065" },
        { "id": "Paper 2", "subject": "Corporate and Other Laws", "marks": "058" },
        { "id": "Paper 3", "subject": "Cost and Management Accounting", "marks": "070" },
        { "id": "Paper 4", "subject": "Taxation", "marks": "052" },
        { "id": "Paper 5", "subject": "Auditing and Ethics", "marks": "055" },
        { "id": "Paper 6", "subject": "Financial Management and Strategic Management", "marks": "050" }
      ]
    }
  },
  "intermediate-merit": {
    "711535": {
      "regno": "WRO0855721",
      "name": "ANIKET SHARMA",
      "rollno": "711535",
      "total": 350,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Rank", "subject": "All India Rank", "marks": "Rank 08" }
      ]
    }
  },
  "final": {
    "811535": {
      "regno": "WRO0855721",
      "name": "PRIYA MEHTA",
      "rollno": "811535",
      "total": 385,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Paper 1", "subject": "Financial Reporting", "marks": "062" },
        { "id": "Paper 2", "subject": "Advanced Financial Management", "marks": "068" },
        { "id": "Paper 3", "subject": "Advanced Auditing, Assurance and Professional Ethics", "marks": "055" },
        { "id": "Paper 4", "subject": "Direct Tax Laws and International Taxation", "marks": "052" },
        { "id": "Paper 5", "subject": "Indirect Tax Laws", "marks": "072" },
        { "id": "Paper 6", "subject": "Integrated Business Solutions", "marks": "076" }
      ]
    }
  },
  "final-merit": {
    "811535": {
      "regno": "WRO0855721",
      "name": "PRIYA MEHTA",
      "rollno": "811535",
      "total": 385,
      "status": "SUCCESSFUL",
      "papers": [
        { "id": "Rank", "subject": "All India Rank", "marks": "Rank 03" }
      ]
    }
  }
};

// Generate dynamic deterministic results for other credentials
function getStudentResult(examType, rollNo, regNo) {
  // Check predefined database first
  const normalizedRoll = rollNo.trim();
  const normalizedReg = regNo.trim().toUpperCase();

  if (STUDENT_DATABASE[examType] && STUDENT_DATABASE[examType][normalizedRoll]) {
    const dbRecord = STUDENT_DATABASE[examType][normalizedRoll];
    if (dbRecord.regno.toUpperCase() === normalizedReg) {
      return dbRecord;
    }
  }

  // Fallback: Generate dynamic deterministic mock candidate
  if (!/^\d{6}$/.test(normalizedRoll)) return null;
  if (!/^[a-zA-Z]{3}\d{7}$/.test(normalizedReg)) return null;

  let seed = 0;
  for (let i = 0; i < normalizedRoll.length; i++) {
    seed += parseInt(normalizedRoll.charAt(i));
  }
  for (let i = 3; i < normalizedReg.length; i++) {
    const val = parseInt(normalizedReg.charAt(i));
    if (!isNaN(val)) seed += val;
  }

  const firstNames = ["Rohan", "Priya", "Amit", "Sneha", "Aditya", "Neha", "Vikram", "Deepika", "Rahul", "Anjali", "Suresh", "Divya", "Karan", "Pooja"];
  const lastNames = ["Sharma", "Verma", "Gupta", "Patel", "Mehta", "Singh", "Joshi", "Kumar", "Iyer", "Sen", "Rao", "Nair", "Das", "Choudhury"];
  const name = `${firstNames[seed % firstNames.length]} ${lastNames[(seed * 7) % lastNames.length]}`.toUpperCase();

  let papers = [];
  if (examType.endsWith("-merit")) {
    const isPass = (seed % 3) !== 0;
    const rank = 1 + (seed % 50);
    return {
      regno: normalizedReg,
      name: name,
      rollno: normalizedRoll,
      total: isPass ? 220 + (seed % 140) : 100 + (seed % 99),
      status: isPass ? "SUCCESSFUL" : "UNSUCCESSFUL",
      papers: [
        { "id": "Rank", "subject": "All India Rank", "marks": isPass ? `Rank ${rank}` : "N/A (Failed)" }
      ]
    };
  }

  if (examType.startsWith("foundation")) {
    papers = [
      { "id": "Paper 1", "subject": "Accounting", "marks": 0 },
      { "id": "Paper 2", "subject": "Business Laws", "marks": 0 },
      { "id": "Paper 3", "subject": "Quantitative Aptitude - Business Mathematics, Logical Reasoning, Statistics", "marks": 0 },
      { "id": "Paper 4", "subject": "Business Economics", "marks": 0 }
    ];
  } else { // intermediate or final
    papers = [
      { "id": "Paper 1", "subject": "Advanced Accounting", "marks": 0 },
      { "id": "Paper 2", "subject": "Corporate and Other Laws", "marks": 0 },
      { "id": "Paper 3", "subject": "Cost and Management Accounting", "marks": 0 },
      { "id": "Paper 4", "subject": "Taxation", "marks": 0 },
      { "id": "Paper 5", "subject": "Auditing and Ethics", "marks": 0 },
      { "id": "Paper 6", "subject": "Financial Management and Strategic Management", "marks": 0 }
    ];
  }

  let total = 0;
  let failedAny = false;
  papers.forEach((p, idx) => {
    // Generate deterministic marks between 30 and 88
    const score = 30 + ((seed * (idx + 4) + idx * 23) % 59);
    p.marks = score.toString().padStart(3, '0');
    total += score;
    if (score < 40) {
      failedAny = true;
    }
  });

  const passAggregate = total >= (papers.length * 50); // 50% aggregate passing criteria
  const status = (!failedAny && passAggregate) ? "SUCCESSFUL" : "UNSUCCESSFUL";

  return {
    regno: normalizedReg,
    name: name,
    rollno: normalizedRoll,
    total: total,
    status: status,
    papers: papers
  };
}

// Generate captcha text
function generateCaptchaText() {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars like o, 0, i, l, 1, O
  let text = "";
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

// Draw captcha on canvas
function drawCaptcha(canvas, text) {
  canvas.setAttribute('data-code', text);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#f3f5f9");
  grad.addColorStop(1, "#e6ebf3");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Noise dots
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${200 + Math.random() * 55}, 0.25)`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.8, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Distortion lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 150}, 0.35)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Draw characters
  ctx.textBaseline = "middle";
  const fonts = ["Arial", "sans-serif", "Helvetica", "Courier New"];
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    // Draw characters with distinct colors, font sizes, rotations and translations
    ctx.font = `bold ${15 + Math.random() * 5}px ${fonts[Math.floor(Math.random() * fonts.length)]}`;
    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 120)}, ${Math.floor(Math.random() * 60)}, ${100 + Math.floor(Math.random() * 120)})`;

    ctx.save();
    const x = 12 + i * 16;
    const y = 14 + (Math.random() * 6 - 3);
    const angle = (Math.random() * 32 - 16) * Math.PI / 180; // rotation angle (-16 to +16 degrees)
    
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }
}

// Setup captcha logic for page
function setupCaptcha(canvasId, refreshLinkId) {
  const canvas = document.getElementById(canvasId);
  const refreshLink = document.getElementById(refreshLinkId);
  
  if (!canvas) return "";

  let currentCaptcha = generateCaptchaText();
  drawCaptcha(canvas, currentCaptcha);

  const regenerate = () => {
    currentCaptcha = generateCaptchaText();
    drawCaptcha(canvas, currentCaptcha);
  };

  canvas.addEventListener('click', regenerate);
  if (refreshLink) {
    refreshLink.addEventListener('click', (e) => {
      e.preventDefault();
      regenerate();
    });
  }

  return {
    getCode: () => currentCaptcha,
    refresh: regenerate
  };
}

// Render student result table
function renderResultTable(student, targetContainerId) {
  const container = document.getElementById(targetContainerId);
  if (!container) return;

  const isSuccess = student.status === "SUCCESSFUL";
  const statusClass = isSuccess ? "successful-text" : "unsuccessful-text";

  let paperRowsHtml = "";
  student.papers.forEach(p => {
    paperRowsHtml += `
      <tr>
        <td>${p.id}</td>
        <td>${p.subject}</td>
        <td>${p.marks}</td>
      </tr>
    `;
  });

  const html = `
    <table width="100%" class="result-table" cellpadding="0" cellspacing="0">
      <tr>
        <th width="30%">ROLL NUMBER</th>
        <th width="70%">${student.rollno}</th>
      </tr>
      <tr>
        <td>Name</td>
        <td><strong>${student.name}</strong></td>
      </tr>
      <tr>
        <td colspan="2" class="nopadding">
          <table width="100%" class="result-table" style="margin-bottom: 0; border: none;" cellpadding="0" cellspacing="0">
            <tr class="highlight-row">
              <th width="20%">PAPER</th>
              <th width="60%">SUBJECT</th>
              <th width="20%">MARKS OBTAINED</th>
            </tr>
            ${paperRowsHtml}
            <tr class="highlight-row">
              <td colspan="2">Total</td>
              <td>${student.total}</td>
            </tr>
            <tr class="result-status-row">
              <td colspan="3">Result: <span class="${statusClass}">${student.status}</span></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  container.innerHTML = html;
}

// Handle Form Submission
function initResultChecker(examType, formId, resultSectionId, loginSectionId, resultTableContainerId, captchaHandler) {
  const form = document.getElementById(formId);
  const loginSection = document.getElementById(loginSectionId);
  const resultSection = document.getElementById(resultSectionId);

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const rollNoInput = document.getElementById('rollno');
    const regNoInput = document.getElementById('regno');
    const captchaInput = document.querySelector('input[name="scode"]');

    const rollNo = rollNoInput.value.trim();
    const regNo = regNoInput.value.trim();
    const captchaVal = captchaInput.value.trim();

    // 1. Validation checks
    if (rollNo === "") {
      alert("Please Enter Roll No.");
      rollNoInput.focus();
      return;
    }
    if (!/^\d{6}$/.test(rollNo)) {
      alert("Roll No. must be 6 digits.");
      rollNoInput.focus();
      return;
    }

    if (regNo === "") {
      alert("Please Enter Registration No.");
      regNoInput.focus();
      return;
    }
    if (!/^[a-zA-Z]{3}\d{7}$/.test(regNo)) {
      alert("Registration No. must be in correct format (e.g. WRO0855721).");
      regNoInput.focus();
      return;
    }

    if (captchaVal === "") {
      alert("Please Enter Text as shown in Captcha Box.");
      captchaInput.focus();
      return;
    }

    if (captchaVal.toLowerCase() !== captchaHandler.getCode().toLowerCase()) {
      alert("Invalid Captcha Code entered. Please check and enter again.");
      captchaInput.value = "";
      captchaInput.focus();
      captchaHandler.refresh();
      return;
    }

    // 2. Fetch Result
    const student = getStudentResult(examType, rollNo, regNo);
    if (!student) {
      alert("No Record Found. Please verify your Roll No. and Registration No.");
      captchaHandler.refresh();
      captchaInput.value = "";
      return;
    }

    // 3. Render and show results
    renderResultTable(student, resultTableContainerId);
    
    // Set Header titles for results screen
    const examTitles = {
      "foundation": "Foundation Exam May 2026, Result",
      "intermediate": "Intermediate Examination May 2026, Result",
      "intermediate-units": "Intermediate - UNITS Exam May 2026, Result",
      "final": "Final Exam May 2026, Result"
    };

    const headerTitleElement = document.getElementById('exam-title-header');
    if (headerTitleElement) {
      headerTitleElement.innerText = examTitles[examType] || "Examination Result";
    }

    loginSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
  });

  // Handle logout / check another roll number links
  const resetForm = () => {
    form.reset();
    captchaHandler.refresh();
    resultSection.style.display = 'none';
    loginSection.style.display = 'block';
    
    const originalTitles = {
      "foundation": "Foundation - Result",
      "intermediate": "Intermediate Examination - Result",
      "intermediate-units": "Intermediate Examination (Units) - Result",
      "final": "Final - Result"
    };

    const headerTitleElement = document.getElementById('exam-title-header');
    if (headerTitleElement) {
      headerTitleElement.innerText = originalTitles[examType] || "Result";
    }
  };

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      resetForm();
    });
  }

  const checkAnotherLink = document.getElementById('check-another-link');
  if (checkAnotherLink) {
    checkAnotherLink.addEventListener('click', function(e) {
      e.preventDefault();
      resetForm();
    });
  }
}
