// ==========================================================================
// 1. FIREBASE SETUP & GLOBAL CONFIGURATION
// ==========================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Config ของ Firebase โปรเจกต์คุณ
const firebaseConfig = {
    apiKey: "AIzaSyARtJGeDjvQXmoXPQKUibm2v19xy4ygDs8",
    authDomain: "pmc-app-bcad3.firebaseapp.com",
    projectId: "pmc-app-bcad3",
    storageBucket: "pmc-app-bcad3.firebasestorage.app",
    messagingSenderId: "225546297713",
    appId: "1:225546297713:web:6d8ed9ec06ba51d7b356d0",
    measurementId: "G-1NS545NVKW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PROJECT_ROLES_MAP = {
    'Solar': [
        { roleName: 'Project Site Manager (PSM)', optional: false },
        { roleName: 'Electrical/ C&I Engineer (EE)', optional: false },
        { roleName: 'Commissioning Engineer (COM)', optional: false },
        { roleName: 'Civil Engineer/Technician (CE)', optional: false },
        { roleName: 'M/E Technician', optional: false },
        { roleName: 'Safety Advisor (SA)', optional: false },
        { roleName: 'Site Admin/Document Control (SDC)', optional: false },
        { roleName: 'Material Control (MC) 1', optional:  false },
        { roleName: 'Material Control (MC) 2', optional:  false },
        { roleName: 'Quality Control (QC)', optional:  false },
        { roleName: 'Other', optional:  false }
    ],
    'Wind': [
        { roleName: 'Project Site Manager (PSM)', optional: false },
        { roleName: 'Electrical/ C&I Engineer (EE)', optional: false },
        { roleName: 'Commissioning Engineer (COM)', optional: false },
        { roleName: 'Civil Engineer/Technician (CE)', optional: false },
        { roleName: 'M/E Technician', optional: false },
        { roleName: 'Safety Advisor (SA)', optional: false },
        { roleName: 'Site Admin/Document Control (SDC)', optional: false },
        { roleName: 'Material Control (MC) 1', optional:  false },
        { roleName: 'Material Control (MC) 2', optional:  false },
        { roleName: 'Quality Control (QC)', optional:  false },
        { roleName: 'Other', optional:  false }
    ],
    'Combined': [ 
        { roleName: 'Site Manager', optional: false },
        { roleName: 'Administration & Contract Coordinator Leader', optional: false },
        { roleName: 'Administration & Contract Coordinator', optional: false },
        { roleName: 'Safety health and Environment Manager', optional: false },
        { roleName: 'Design Coordinator1', optional: false },
        { roleName: 'Design Coordinator2', optional: false },
        { roleName: 'Lead Civil Engineer', optional: false },
        { roleName: 'Civil Engineer 1', optional: false },
        { roleName: 'Civil Engineer 2', optional: false },
        { roleName: 'Civil Inspector 1', optional: false },
        { roleName: 'Civil Inspector 2', optional: false },
        { roleName: 'Lead Mechanical Engineer', optional: false },
        { roleName: 'Mechanical Engineer 1', optional: false },
        { roleName: 'Mechanical Engineer 2', optional: false },
        { roleName: 'Mechanical Engineer 3', optional: false },
        { roleName: 'Mechanical Inspector 1', optional: false },
        { roleName: 'Mechanical Inspector 2', optional: false },
        { roleName: 'Mechanical Inspector 3', optional: false },
        { roleName: 'Lead Electrical Engineer', optional: false },
        { roleName: 'Electrical Engineer 1', optional: false },
        { roleName: 'Electrical Engineer 2', optional: false },
        { roleName: 'Electrical Engineer 3', optional: false },
        { roleName: 'Electrical Inspector 1', optional: false },
        { roleName: 'Electrical Inspector 2', optional: false },
        { roleName: 'Electrical Inspector 3', optional: false },
        { roleName: 'Lead C&I Engineer', optional: false },
        { roleName: 'Control Engineer 1', optional: false },
        { roleName: 'Control Engineer 2', optional: false },
        { roleName: 'Control Engineer 3', optional: false },
        { roleName: 'Instrument Engineer 1', optional: false },
        { roleName: 'Instrument Engineer 2', optional: false },
        { roleName: 'Commissioning Manager', optional: false },
        { roleName: 'Commissioning Coordinator 1', optional: false },
        { roleName: 'Commissioning Coordinator 2', optional: false },
        { roleName: 'Commissioning Coordinator 3', optional: false },
        { roleName: 'Comissioning Engineer ( Mech.)', optional: false },
        { roleName: 'Comissioning Engineer (EE)', optional: false },
        { roleName: 'Comissioning Engineer (C& I)', optional: false },
        { roleName: 'Comissioning Engineer (Chem.)', optional: false },
        { roleName: 'Comissioning Engineer (Performance)', optional: false }
    ],
    'Iwte': [
        { roleName: 'Project Site Manager (PSM)', optional: false },
        { roleName: 'Electrical/ C&I Engineer (EE)', optional: false },
        { roleName: 'Commissioning Engineer (COM)', optional: false },
        { roleName: 'Civil Engineer/Technician (CE)', optional: false },
        { roleName: 'M/E Technician', optional: false },
        { roleName: 'Safety Advisor (SA)', optional: false },
        { roleName: 'Site Admin/Document Control (SDC)', optional: false },
        { roleName: 'Material Control (MC) 1', optional:  false },
        { roleName: 'Material Control (MC) 2', optional:  false },
        { roleName: 'Quality Control (QC)', optional:  false },
        { roleName: 'Other', optional:  false }
    ],
    'Other': [
        { roleName: 'Site Manager', optional: false },
        { roleName: 'Administration & Contract Coordinator Leader', optional: false },
        { roleName: 'Administration & Contract Coordinator', optional: false },
        { roleName: 'Safety health and Environment Manager', optional: false },
        { roleName: 'Design Coordinator1', optional: false },
        { roleName: 'Design Coordinator2', optional: false },
        { roleName: 'Lead Civil Engineer', optional: false },
        { roleName: 'Civil Engineer 1', optional: false },
        { roleName: 'Civil Engineer 2', optional: false },
        { roleName: 'Civil Inspector 1', optional: false },
        { roleName: 'Civil Inspector 2', optional: false },
        { roleName: 'Lead Mechanical Engineer', optional: false },
        { roleName: 'Mechanical Engineer 1', optional: false },
        { roleName: 'Mechanical Engineer 2', optional: false },
        { roleName: 'Mechanical Engineer 3', optional: false },
        { roleName: 'Mechanical Inspector 1', optional: false },
        { roleName: 'Mechanical Inspector 2', optional: false },
        { roleName: 'Mechanical Inspector 3', optional: false },
        { roleName: 'Lead Electrical Engineer', optional: false },
        { roleName: 'Electrical Engineer 1', optional: false },
        { roleName: 'Electrical Engineer 2', optional: false },
        { roleName: 'Electrical Engineer 3', optional: false },
        { roleName: 'Electrical Inspector 1', optional: false },
        { roleName: 'Electrical Inspector 2', optional: false },
        { roleName: 'Electrical Inspector 3', optional: false },
        { roleName: 'Lead C&I Engineer', optional: false },
        { roleName: 'Control Engineer 1', optional: false },
        { roleName: 'Control Engineer 2', optional: false },
        { roleName: 'Control Engineer 3', optional: false },
        { roleName: 'Instrument Engineer 1', optional: false },
        { roleName: 'Instrument Engineer 2', optional: false },
        { roleName: 'Commissioning Manager', optional: false },
        { roleName: 'Commissioning Coordinator 1', optional: false },
        { roleName: 'Commissioning Coordinator 2', optional: false },
        { roleName: 'Commissioning Coordinator 3', optional: false },
        { roleName: 'Comissioning Engineer ( Mech.)', optional: false },
        { roleName: 'Comissioning Engineer (EE)', optional: false },
        { roleName: 'Comissioning Engineer (C& I)', optional: false },
        { roleName: 'Comissioning Engineer (Chem.)', optional: false },
        { roleName: 'Comissioning Engineer (Performance)', optional: false }
    ]
};

// ตัวแปรเก็บฐานข้อมูลพนักงาน
let STAFF_DATABASE = {}; 
let allStaffNames = []; 

// เรทมาตรฐานกรณีพิมพ์ชื่อคนที่ไม่มีในระบบ
const DEFAULT_RATES = { totalSalary: 45000, ot: 5000, allowance: 300, accommodation: 500, gas: 0, phone: 0, overhead: 0 };

const thaiMonthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
let monthsArray = []; 
let monthValuesArray = []; 
let chartInstance = null; 
let costChartInstance = null; 

// ==========================================================================
// 2. LOAD DATA FROM FIREBASE ON STARTUP
// ==========================================================================
window.onload = async () => {
    // ตั้งค่า Default Date
    const today = new Date();
    const currMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const startEl = document.getElementById('startDate');
    const endEl = document.getElementById('endDate');
    if (startEl) startEl.value = currMonth;
    if (endEl) endEl.value = currMonth;

    // ดึงข้อมูลพนักงาน
    await loadStaffFromFirebase();

    // สร้างตารางครั้งแรก
    if (typeof window.generateTable === 'function' && startEl && endEl) {
        window.generateTable();
    }
};

async function loadStaffFromFirebase() {
    try {
        const querySnapshot = await getDocs(collection(db, "staff_directory"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name) {
                STAFF_DATABASE[data.name] = {
                    totalSalary: data.totalSalary || 0,
                    ot: data.ot || 0,
                    allowance: data.allowance || 0,
                    accommodation: data.accommodation || 0,
                    gas: data.gas || 0,
                    phone: data.phone || 0,
                    overhead: data.overhead || 0,
                    position: data.position || "ไม่ระบุ"
                };
            }
        });
        
        allStaffNames = Object.keys(STAFF_DATABASE);
        
        // อัปเดต Datalist สำหรับช่อง Dropdown
        const dataListHtml = `<datalist id="staff-list">${allStaffNames.map(n => `<option value="${n}">`).join('')}</datalist>`;
        const existingList = document.getElementById('staff-list');
        if(existingList) {
            existingList.innerHTML = allStaffNames.map(n => `<option value="${n}">`).join('');
        } else {
            document.body.insertAdjacentHTML('beforeend', dataListHtml);
        }
        
        showToast(`โหลดข้อมูลพนักงานสำเร็จ (${allStaffNames.length} รายการ)`);
    } catch (error) {
        console.error("Error loading staff:", error);
        showToast("ไม่สามารถดึงข้อมูลพนักงานจากฐานข้อมูลได้", true);
    }
}

// ==========================================================================
// 3. UI LOGIC & MANPOWER TABLE
// ==========================================================================
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('text-blue-700', 'border-b-4', 'border-blue-600', 'bg-blue-50/70');
        el.classList.add('text-slate-500', 'border-transparent');
    });

    const targetTab = document.getElementById(tabId);
    if(targetTab) targetTab.classList.remove('hidden');
    
    const activeBtn = document.getElementById('btn-' + tabId);
    if(activeBtn) {
        activeBtn.classList.remove('text-slate-500', 'border-transparent');
        activeBtn.classList.add('text-blue-700', 'border-b-4', 'border-blue-600', 'bg-blue-50/70');
    }
    
    // อัปเดตขนาดกราฟเมื่อสลับแท็บ
    if (tabId === 'tab-input' && chartInstance) chartInstance.resize();
    if (tabId === 'tab-summary' && costChartInstance) costChartInstance.resize();
}

window.showToast = function(message, isError = false) {
    const toast = document.getElementById('toast');
    if(!toast) return;

    const toastContent = document.getElementById('toastContent');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    if (isError) {
        toastContent.className = 'p-4 pr-6 rounded-xl shadow-xl text-white font-medium flex items-center space-x-3 bg-red-500';
        toastIcon.className = 'fa-solid fa-circle-exclamation text-xl';
    } else {
        toastContent.className = 'p-4 pr-6 rounded-xl shadow-xl text-white font-medium flex items-center space-x-3 bg-emerald-500';
        toastIcon.className = 'fa-solid fa-circle-check text-xl';
    }
    
    toastMessage.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, 3000); 
}

function getMonthsArray(startDateStr, endDateStr) {
    monthsArray = [];
    monthValuesArray = [];
    const startYear = parseInt(startDateStr.substring(0, 4));
    const startMonth = parseInt(startDateStr.substring(5, 7)); 
    const endYear = parseInt(endDateStr.substring(0, 4));
    const endMonth = parseInt(endDateStr.substring(5, 7)); 
    
    let current = new Date(startYear, startMonth - 1, 1);
    const end = new Date(endYear, endMonth - 1, 1);
    
    while (current <= end && monthsArray.length < 60) { 
        monthsArray.push(`${thaiMonthNames[current.getMonth()]} ${current.getFullYear() + 543}`);
        const mStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthValuesArray.push(mStr);
        current.setMonth(current.getMonth() + 1);
    }
    return monthsArray;
}

window.generateTable = function() {
    const startDateEl = document.getElementById('startDate');
    const endDateEl = document.getElementById('endDate');
    const projectTypeEl = document.getElementById('projectType');
    const container = document.getElementById('manpowerTableContainer');
    
    if(!startDateEl || !endDateEl || !projectTypeEl || !container) return;

    const startDate = startDateEl.value;
    const endDate = endDateEl.value;
    const projectType = projectTypeEl.value;
    
    if (!projectType || !startDate || !endDate || startDate > endDate) {
        container.classList.add('hidden');
        return;
    }
    
    getMonthsArray(startDate, endDate);
    container.classList.remove('hidden');
    
    const roles = PROJECT_ROLES_MAP[projectType] || PROJECT_ROLES_MAP['Other'];
    
    let headers = monthsArray.map(m => `<th class="px-2 py-4 text-center text-xs font-bold text-slate-700 min-w-[65px] uppercase">${m}</th>`).join('');
    
    let rows = roles.map(role => {
        const roleId = role.roleName.replace(/[^a-zA-Z0-9]/g, '_');
        let inputs = monthsArray.map((m, i) => `
            <td class="p-2 text-center">
                <input type="number" step="0.5" min="0" value="0.0" data-month-val="${monthValuesArray[i]}" class="man-month-input w-14 text-center border border-slate-200 rounded py-1 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-colors" oninput="updateTotals()">
            </td>
        `).join('');

        return `
        <tr class="hover:bg-blue-50/50 border-b border-slate-100 transition-colors" id="row-${roleId}">
            <td class="px-4 py-3 font-semibold text-slate-800 sticky-col text-xs bg-white shadow-[1px_0_0_0_#e2e8f0] role-name">${role.roleName}</td>
            <td class="px-2 py-2 min-w-[200px] relative">
                <input type="text" list="staff-list" placeholder="ระบุชื่อพนักงาน..." class="staff-input w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 transition-colors" onchange="updateTotals()">
            </td>
            <td class="px-2 py-2 text-xs font-medium text-slate-600 staff-position min-w-[120px]">-</td>
            <td class="px-2 py-2 text-center min-w-[260px]">
                <div class="flex items-center justify-center gap-1">
                    <input type="month" class="start-month text-xs border border-slate-200 rounded px-1 py-1.5 outline-none focus:border-blue-500 bg-white" title="เดือนเริ่มต้น" min="${startDate}" max="${endDate}">
                    <span class="text-slate-400 text-xs">-</span>
                    <input type="month" class="end-month text-xs border border-slate-200 rounded px-1 py-1.5 outline-none focus:border-blue-500 bg-white" title="เดือนสิ้นสุด" min="${startDate}" max="${endDate}">
                    <button type="button" onclick="fillRange(this)" class="bg-blue-50 text-blue-600 px-2 py-1.5 rounded border border-blue-200 hover:bg-blue-100 hover:text-blue-800 transition-all shadow-sm flex items-center gap-1" title="เติม 1 ตามช่วงเวลา">
                        <i class="fa-solid fa-bolt"></i>
                    </button>
                    <button type="button" onclick="resetRow(this)" class="bg-rose-50 text-rose-600 px-2 py-1.5 rounded border border-rose-200 hover:bg-rose-100 hover:text-rose-800 transition-all shadow-sm flex items-center gap-1" title="รีเซ็ตเป็น 0">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                </div>
            </td>
            ${inputs}
            <td class="px-4 py-3 text-right font-bold text-blue-700 row-total bg-blue-50/30 text-sm">0.0</td>
        </tr>`;
    }).join('');

    let footerTds = monthsArray.map((_, i) => `<td class="px-2 py-4 text-center font-bold text-blue-700 text-lg col-total-${i} bg-slate-50">0.0</td>`).join('');

    document.getElementById('table-output').innerHTML = `
        <table id="manpowerTable" class="min-w-full bg-white text-sm border-collapse">
            <thead class="bg-slate-50">
                <tr>
                    <th class="px-4 py-4 text-left sticky-col bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] text-slate-700 uppercase text-xs">ตำแหน่งงาน (Role)</th>
                    <th class="px-2 py-4 text-left text-slate-700 uppercase text-xs">ชื่อพนักงาน</th>
                    <th class="px-2 py-4 text-left text-slate-700 uppercase text-xs">ระดับ (Position)</th>
                    <th class="px-2 py-4 text-center text-slate-700 uppercase text-xs">ระบุช่วงเวลา (Action)</th>
                    ${headers}
                    <th class="px-4 py-4 text-right text-slate-700 uppercase text-xs bg-slate-50">รวม MM</th>
                </tr>
            </thead>
            <tbody id="manpowerTableBody">${rows}</tbody>
            <tfoot class="border-t-2 border-blue-500 shadow-inner">
                <tr>
                    <td colspan="4" class="px-4 py-5 text-right font-bold text-slate-800 sticky-col bg-slate-50 shadow-[1px_0_0_0_#e2e8f0]">Grand Total</td>
                    ${footerTds}
                    <td class="px-4 py-5 text-right font-extrabold text-rose-600 text-xl bg-rose-50 border-l border-rose-100" id="grandTotalLabel">0.0</td>
                </tr>
            </tfoot>
        </table>
    `;
    updateTotals();
}

window.fillRange = function(btn) {
    const row = btn.closest('tr');
    const startVal = row.querySelector('.start-month').value;
    const endVal = row.querySelector('.end-month').value;
    
    row.querySelectorAll('.man-month-input').forEach(input => {
        const mVal = input.getAttribute('data-month-val');
        let shouldFill = true;
        
        if (startVal && mVal < startVal) shouldFill = false;
        if (endVal && mVal > endVal) shouldFill = false;

        if (shouldFill) {
            input.value = "1.0";
        }
    });
    updateTotals();
}

window.resetRow = function(btn) {
    const row = btn.closest('tr');
    row.querySelectorAll('.start-month').forEach(input => input.value = "");
    row.querySelectorAll('.end-month').forEach(input => input.value = "");
    row.querySelectorAll('.man-month-input').forEach(input => {
        input.value = "0.0";
    });
    updateTotals();
}

// ==========================================================================
// 4. CALCULATION LOGIC & COST TABLE (TAB 2)
// ==========================================================================
window.updateTotals = function() {
    let grandTotalMM = 0;
    let monthlyTotalsMM = Array(monthsArray.length).fill(0);
    let costTableData = []; 
    
    document.querySelectorAll('#manpowerTableBody tr').forEach(row => {
        let rowTotalMM = 0;
        let rowMonthlyMM = [];
        
        const roleName = row.querySelector('.role-name').textContent;
        const staffInput = row.querySelector('.staff-input');
        const staffName = staffInput ? staffInput.value.trim() : '';
        const posCell = row.querySelector('.staff-position');
        
        if (posCell) {
            if (staffName && STAFF_DATABASE[staffName]) {
                posCell.textContent = STAFF_DATABASE[staffName].position || '-';
            } else {
                posCell.textContent = '-';
            }
        }
        
        row.querySelectorAll('.man-month-input').forEach((input, index) => {
            let val = parseFloat(input.value) || 0;
            rowTotalMM += val;
            monthlyTotalsMM[index] += val;
            rowMonthlyMM.push(val);
        });

        row.querySelector('.row-total').textContent = rowTotalMM.toFixed(1);
        grandTotalMM += rowTotalMM;
        
        if (rowTotalMM > 0) {
            costTableData.push({
                role: roleName,
                name: staffName,
                mmData: rowMonthlyMM
            });
        }
    });

    monthlyTotalsMM.forEach((total, index) => {
        let td = document.querySelector(`.col-total-${index}`);
        if(td) td.textContent = total.toFixed(1);
    });

    const gtFixed = grandTotalMM.toFixed(1);
    const grandTotalLabel = document.getElementById('grandTotalLabel');
    if (grandTotalLabel) grandTotalLabel.textContent = gtFixed;
    
    const tab1MmTotal = document.getElementById('tab1-mm-total');
    if(tab1MmTotal) tab1MmTotal.innerHTML = `<i class="fa-solid fa-calculator"></i> Total: ${gtFixed} MM`;
    
    const totalMmDisplay = document.getElementById('total-mm-display');
    if(totalMmDisplay) totalMmDisplay.textContent = gtFixed;
    
    generateCostTable(costTableData);
    updateManpowerChart(monthlyTotalsMM);
}

function generateCostTable(dataRows) {
    const costOutput = document.getElementById('cost-table-output');
    if (!costOutput) return;

    if (dataRows.length === 0) {
        costOutput.innerHTML = `<div class="text-center text-slate-400 py-10"><p>ไม่มีข้อมูล MM สำหรับคำนวณค่าใช้จ่าย</p></div>`;
        const expenseSummary = document.getElementById('expense-summary');
        if (expenseSummary) expenseSummary.textContent = "฿ 0.00";
        updateCostChart(null);
        return;
    }

    const startYearStr = document.getElementById('startDate').value; 
    const baseProjectYearThai = parseInt(startYearStr.split('-')[0]) + 543;

    let headers = monthsArray.map(m => `<th class="px-3 py-3 text-center text-xs font-bold text-slate-700 min-w-[100px] border-b border-slate-300 bg-emerald-50/50">${m}</th>`).join('');
    
    let grandTotalCost = 0;
    let monthlyCostTotals = Array(monthsArray.length).fill(0);
    
    // โครงสร้างสำหรับเก็บข้อมูลแยกประเภท เพื่อนำไปแสดงในกราฟ Stacked Bar Chart
    let costBreakdown = {
        salary: Array(monthsArray.length).fill(0),
        ot: Array(monthsArray.length).fill(0),
        allowance: Array(monthsArray.length).fill(0),
        accommodation: Array(monthsArray.length).fill(0),
        gas: Array(monthsArray.length).fill(0),
        phone: Array(monthsArray.length).fill(0),
        overhead: Array(monthsArray.length).fill(0)
    };

    let rowsHTML = dataRows.map(row => {
        let staffData = STAFF_DATABASE[row.name] || DEFAULT_RATES;
        let rowTotalCost = 0;
        let accumMM = 0; 

        let costCells = row.mmData.map((mm, index) => {
            if (mm === 0) {
                accumMM += mm;
                return `<td class="px-3 py-2 text-center text-slate-300 border-r border-slate-100 bg-slate-50/30">-</td>`;
            }

            let monthLabel = monthsArray[index];
            let currentYearThai = parseInt(monthLabel.split(' ')[1]);
            let yearDiff = currentYearThai - baseProjectYearThai;
            if (yearDiff < 0) yearDiff = 0; 

            // 1. เงินเดือน (ปรับ 8% ทบต้น)
            let multiplier = Math.pow(1.08, yearDiff);
            let activeSalary = staffData.totalSalary * multiplier;
            
            // 4. ค่าล่วงเวลา (OT) - ปรับ 8% ทบต้น
            let activeOT = (staffData.ot || 0) * multiplier;

            // 2. ค่าเบี้ยเลี้ยง (ลดเหลือ 75% ถ้ายอดสะสม >= 12)
            let baseAllowance = (staffData.allowance || 0) * 30;
            let activeAllowanceRate = baseAllowance;
            let allowRateText = "100%";
            if (accumMM >= 12) {
                activeAllowanceRate = baseAllowance * 0.75;
                allowRateText = "75%";
            } else if (accumMM === 11.5) {
                activeAllowanceRate = baseAllowance * 0.875; 
                allowRateText = "87.5%";
            }

            // 3. ค่าที่พัก (ลดเหลือ 40% ถ้ายอดสะสม >= 3)
            let baseAccommodation = (staffData.accommodation || 0) * 30;
            let activeAccommodationRate = baseAccommodation;
            let accomRateText = "100%";
            if (accumMM >= 3) {
                activeAccommodationRate = baseAccommodation * 0.4;
                accomRateText = "40%";
            } else if (accumMM === 2.5) {
                activeAccommodationRate = baseAccommodation * 0.7; 
                accomRateText = "70%";
            }
            
            // 5, 6, 7. ค่าคงที่
            let fixedGas = staffData.gas || 0;
            let fixedPhone = staffData.phone || 0;
            let fixedOverhead = staffData.overhead || 0;

            // รวมต้นทุนต่อ 1 คน ใน 1 เดือน
            let costPerPerson = activeSalary + activeOT + activeAllowanceRate + activeAccommodationRate + fixedGas + fixedPhone + fixedOverhead;
            
            // นำต้นทุนรวมไปคูณกับสัดส่วน Man-Month
            let finalMonthlyCost = costPerPerson * mm;
            
            rowTotalCost += finalMonthlyCost;
            monthlyCostTotals[index] += finalMonthlyCost;

            // เก็บสถิติแยกประเภท สำหรับกราฟ (คูณสัดส่วน MM ด้วย)
            costBreakdown.salary[index] += activeSalary * mm;
            costBreakdown.ot[index] += activeOT * mm;
            costBreakdown.allowance[index] += activeAllowanceRate * mm;
            costBreakdown.accommodation[index] += activeAccommodationRate * mm;
            costBreakdown.gas[index] += fixedGas * mm;
            costBreakdown.phone[index] += fixedPhone * mm;
            costBreakdown.overhead[index] += fixedOverhead * mm;

            // บวกยอดสะสมสำหรับเดือนถัดไป
            accumMM += mm;

            let isIncreased = yearDiff > 0;
            let highlightClass = isIncreased ? "text-emerald-700 font-bold bg-emerald-50/30" : "text-slate-800 font-medium";
            
            let tooltipText = `แจกแจงค่าใช้จ่าย ${row.name || 'ไม่มีชื่อ'} (${monthLabel}):\n` +
                              `-----------------------------------\n` +
                              `1. เงินเดือน${isIncreased ? ` (+8% x ${yearDiff}ปี)` : ''}: ฿${activeSalary.toLocaleString('th-TH', {maximumFractionDigits:0})}\n` +
                              `2. ค่าเบี้ยเลี้ยง (เรท ${allowRateText}): ฿${activeAllowanceRate.toLocaleString('th-TH', {maximumFractionDigits:0})}\n` +
                              `3. ค่าที่พัก (เรท ${accomRateText}): ฿${activeAccommodationRate.toLocaleString('th-TH', {maximumFractionDigits:0})}\n` +
                              `4. ค่า OT${isIncreased ? ` (+8% x ${yearDiff}ปี)` : ''}: ฿${activeOT.toLocaleString('th-TH', {maximumFractionDigits:0})}\n` +
                              `5. โทรศัพท์ (รายเดือน): ฿${fixedPhone.toLocaleString('th-TH')}\n` +
                              `6. ค่าน้ำมัน (รายเดือน): ฿${fixedGas.toLocaleString('th-TH')}\n` +
                              `7. ค่าโสหุ้ย (รายเดือน): ฿${fixedOverhead.toLocaleString('th-TH')}\n` +
                              `-----------------------------------\n` +
                              `รวมต่อ 1 คน (Base Rate): ฿${costPerPerson.toLocaleString('th-TH', {maximumFractionDigits:0})}\n` +
                              `คูณสัดส่วน Man-Month (${mm}): ฿${finalMonthlyCost.toLocaleString('th-TH', {maximumFractionDigits:0})}`;

            return `<td class="px-3 py-2 text-right ${highlightClass} cursor-help border-r border-slate-100 hover:bg-emerald-100 transition-colors" title="${tooltipText}">
                ${finalMonthlyCost.toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </td>`;
        }).join('');

        grandTotalCost += rowTotalCost;

        return `
        <tr class="hover:bg-blue-50/30 border-b border-slate-200">
            <td class="px-4 py-2 font-medium text-slate-800 text-xs border-r border-slate-200 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">${row.role}</td>
            <td class="px-3 py-2 text-xs border-r border-slate-200 ${STAFF_DATABASE[row.name] ? 'text-indigo-700 font-bold' : 'text-slate-500 italic'}">
                ${row.name || 'ไม่ระบุชื่อ (ใช้เรทมาตรฐาน)'}
                ${STAFF_DATABASE[row.name] && STAFF_DATABASE[row.name].position ? `<br><span class="text-[10px] text-slate-400 font-normal">${STAFF_DATABASE[row.name].position}</span>` : ''}
            </td>
            ${costCells}
            <td class="px-3 py-2 text-right font-bold text-rose-600 bg-rose-50/50">
                ฿${rowTotalCost.toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </td>
        </tr>`;
    }).join('');

    let footerCells = monthlyCostTotals.map(total => 
        `<td class="px-3 py-4 text-right font-bold text-emerald-800 border-r border-emerald-200 bg-emerald-100/50">
            ${total > 0 ? total.toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0}) : '-'}
        </td>`
    ).join('');

    costOutput.innerHTML = `
        <div class="overflow-x-auto relative">
            <table class="min-w-full bg-white text-sm border-collapse">
                <thead class="bg-slate-100">
                    <tr>
                        <th class="px-4 py-4 text-left text-xs uppercase tracking-wider border-b border-slate-300 border-r border-slate-200 sticky left-0 z-20 bg-slate-100 shadow-[1px_0_0_0_#cbd5e1]">ตำแหน่ง (Position)</th>
                        <th class="px-3 py-4 text-left text-xs uppercase tracking-wider border-b border-slate-300 border-r border-slate-200">ชื่อพนักงาน</th>
                        ${headers}
                        <th class="px-3 py-4 text-right text-xs uppercase tracking-wider border-b border-slate-300 bg-rose-100 text-rose-800">รวมรายตำแหน่ง</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
                <tfoot class="border-t-2 border-emerald-500 shadow-inner">
                    <tr>
                        <td colspan="2" class="px-4 py-4 text-right font-extrabold text-slate-800 border-r border-emerald-200 bg-emerald-50 sticky left-0 z-10 shadow-[1px_0_0_0_#a7f3d0]">Grand Total (THB)</td>
                        ${footerCells}
                        <td class="px-3 py-4 text-right font-black text-rose-700 text-lg bg-rose-100 border-t-2 border-rose-500">
                            ฿${grandTotalCost.toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;

    const summaryEl = document.getElementById('expense-summary');
    if (summaryEl) summaryEl.textContent = `฿ ${grandTotalCost.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    updateCostChart(costBreakdown);
}

// ==========================================================================
// 5. CHART JS INTEGRATION
// ==========================================================================
function updateManpowerChart(dataArr) {
    const canvas = document.getElementById('manpowerChart');
    if(!canvas) return; 
    
    const msg = document.getElementById('chart-loading-message');
    
    if(dataArr.length === 0) {
        if(msg) msg.style.display = 'block';
        canvas.style.display = 'none';
        return;
    }
    
    if(msg) msg.style.display = 'none';
    canvas.style.display = 'block';

    if(chartInstance) chartInstance.destroy();
    
    chartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: monthsArray,
            datasets: [{
                label: 'Man-Month (MM)',
                data: dataArr,
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { beginAtZero: true, title: { display: true, text: 'อัตรากำลัง (MM)'} },
                x: { grid: { display: false } }
            }
        }
    });
}

// กราฟ Stack แยกประเภทค่าใช้จ่าย (แท็บ 2)
function updateCostChart(breakdown) {
    const canvas = document.getElementById('costChart');
    if(!canvas) return;
    const msg = document.getElementById('cost-chart-loading-message');

    if(!breakdown || breakdown.salary.reduce((a,b)=>a+b, 0) === 0) {
        if(msg) msg.style.display = 'block';
        canvas.style.display = 'none';
        if(costChartInstance) costChartInstance.destroy();
        return;
    }

    if(msg) msg.style.display = 'none';
    canvas.style.display = 'block';

    if(costChartInstance) costChartInstance.destroy();

    costChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: monthsArray,
            datasets: [
                { label: 'เงินเดือน', data: breakdown.salary, backgroundColor: '#3b82f6' }, // ฟ้า
                { label: 'ค่าล่วงเวลา (OT)', data: breakdown.ot, backgroundColor: '#f59e0b' }, // ส้ม
                { label: 'เบี้ยเลี้ยง', data: breakdown.allowance, backgroundColor: '#10b981' }, // เขียว
                { label: 'ค่าที่พัก', data: breakdown.accommodation, backgroundColor: '#8b5cf6' }, // ม่วง
                { label: 'ค่าน้ำมัน', data: breakdown.gas, backgroundColor: '#ef4444' }, // แดง
                { label: 'ค่าโทรศัพท์', data: breakdown.phone, backgroundColor: '#06b6d4' }, // ฟ้าอ่อน
                { label: 'ค่าโสหุ้ย', data: breakdown.overhead, backgroundColor: '#64748b' } // เทา
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, beginAtZero: true, title: { display: true, text: 'ค่าใช้จ่ายรวม (บาท)'} }
            },
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ==========================================================================
// 6. FUNCTION บันทึกข้อมูลโครงการขึ้น FIREBASE & การส่งออกข้อมูล
// ==========================================================================
window.saveProjectData = async function() {
    const siteName = document.getElementById('siteName').value;
    const projectType = document.getElementById('projectType').value;
    const taskType = document.getElementById('taskType').value;
    
    if(!siteName || !projectType) {
        showToast("กรุณาระบุชื่อโครงการและประเภทโครงการก่อนบันทึก", true);
        return;
    }

    const btn = document.getElementById('btnSaveProject') || document.getElementById('saveBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...';
    btn.disabled = true;

    try {
        const docRef = doc(db, "project_plans", siteName);
        
        const projectData = {
            siteName: siteName,
            projectType: projectType,
            taskType: taskType,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            totalMM: parseFloat(document.getElementById('grandTotalLabel').textContent) || 0,
            updatedAt: new Date().toISOString()
        };

        await setDoc(docRef, projectData);
        showToast("บันทึกข้อมูลโครงการลง Database สำเร็จ!");
    } catch (error) {
        console.error("Error saving data:", error);
        showToast("เกิดข้อผิดพลาดในการบันทึกข้อมูล", true);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Placeholder สำหรับปุ่มในแท็บ 3
window.handleSaveData = window.saveProjectData;

window.exportToExcel = function() {
    showToast("ฟีเจอร์ดาวน์โหลด Excel กำลังอยู่ระหว่างการพัฒนา");
}

window.exportToPDF = function() {
    showToast("ฟีเจอร์ดาวน์โหลด PDF กำลังอยู่ระหว่างการพัฒนา");
}

window.analyzeWithGemini = function() {
    showToast("ฟีเจอร์ AI นำเสนอกำลังอยู่ระหว่างการเชื่อมต่อ API");
}