// ==========================================================================
// 1. FIREBASE SETUP & GLOBAL CONFIGURATION
// ==========================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Config ของ Firebase
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
        { roleName: 'Project Site Manager (PSM)' },
        { roleName: 'Electrical/ C&I Engineer (EE)' },
        { roleName: 'Commissioning Engineer (COM)' },
        { roleName: 'Civil Engineer/Technician (CE)' },
        { roleName: 'M/E Technician' },
        { roleName: 'Safety Advisor (SA)' },
        { roleName: 'Site Admin/Document Control (SDC)' },
        { roleName: 'Material Control (MC) 1' },
        { roleName: 'Material Control (MC) 2' },
        { roleName: 'Quality Control (QC)' },
        { roleName: 'Other' }
    ],
    'Wind': [
        { roleName: 'Project Site Manager (PSM)' },
        { roleName: 'Electrical/ C&I Engineer (EE)' },
        { roleName: 'Commissioning Engineer (COM)' },
        { roleName: 'Civil Engineer/Technician (CE)' },
        { roleName: 'M/E Technician' },
        { roleName: 'Safety Advisor (SA)' },
        { roleName: 'Site Admin/Document Control (SDC)' },
        { roleName: 'Material Control (MC) 1' },
        { roleName: 'Material Control (MC) 2' },
        { roleName: 'Quality Control (QC)' },
        { roleName: 'Other' }
    ],
    'Combined': [ 
        { roleName: 'Site Manager' },
        { roleName: 'Administration & Contract Coordinator Leader' },
        { roleName: 'Administration & Contract Coordinator' },
        { roleName: 'Safety health and Environment Manager' },
        { roleName: 'Design Coordinator1' },
        { roleName: 'Design Coordinator2' },
        { roleName: 'Lead Civil Engineer' },
        { roleName: 'Civil Engineer 1' },
        { roleName: 'Civil Engineer 2' },
        { roleName: 'Civil Inspector 1' },
        { roleName: 'Civil Inspector 2' },
        { roleName: 'Lead Mechanical Engineer' },
        { roleName: 'Mechanical Engineer 1' },
        { roleName: 'Mechanical Engineer 2' },
        { roleName: 'Mechanical Engineer 3' },
        { roleName: 'Mechanical Inspector 1' },
        { roleName: 'Mechanical Inspector 2' },
        { roleName: 'Mechanical Inspector 3' },
        { roleName: 'Lead Electrical Engineer' },
        { roleName: 'Electrical Engineer 1' },
        { roleName: 'Electrical Engineer 2' },
        { roleName: 'Electrical Engineer 3' },
        { roleName: 'Electrical Inspector 1' },
        { roleName: 'Electrical Inspector 2' },
        { roleName: 'Electrical Inspector 3' },
        { roleName: 'Lead C&I Engineer' },
        { roleName: 'Control Engineer 1' },
        { roleName: 'Control Engineer 2' },
        { roleName: 'Control Engineer 3' },
        { roleName: 'Instrument Engineer 1' },
        { roleName: 'Instrument Engineer 2' },
        { roleName: 'Commissioning Manager' },
        { roleName: 'Commissioning Coordinator 1' },
        { roleName: 'Commissioning Coordinator 2' },
        { roleName: 'Commissioning Coordinator 3' },
        { roleName: 'Comissioning Engineer ( Mech.)' },
        { roleName: 'Comissioning Engineer (EE)' },
        { roleName: 'Comissioning Engineer (C& I)' },
        { roleName: 'Comissioning Engineer (Chem.)' },
        { roleName: 'Comissioning Engineer (Performance)' }
    ],
    'Iwte': [
        { roleName: 'Project Site Manager (PSM)' },
        { roleName: 'Electrical/ C&I Engineer (EE)' },
        { roleName: 'Commissioning Engineer (COM)' },
        { roleName: 'Civil Engineer/Technician (CE)' },
        { roleName: 'M/E Technician' },
        { roleName: 'Safety Advisor (SA)' },
        { roleName: 'Site Admin/Document Control (SDC)' },
        { roleName: 'Material Control (MC) 1' },
        { roleName: 'Material Control (MC) 2' },
        { roleName: 'Quality Control (QC)' },
        { roleName: 'Other' }
    ],
    'Other': [
        { roleName: 'Site Manager' },
        { roleName: 'Lead Civil Engineer' }
    ]
};

// ==========================================================================
// 1.5 PROJECT MILESTONES (เหตุการณ์สำคัญ)
// ==========================================================================
const PROJECT_MILESTONES = {
    'Combined': [
        { id: 'm1', name: 'Issue LOI / NTP' },
        { id: 'm2', name: 'First Piling' },
        { id: 'm3', name: 'Gas Turbine Delivery' },
        { id: 'm4', name: 'Steam Turbine Delivery' },
        { id: 'm5', name: 'HRSG Delivery' },
        { id: 'm6', name: 'Generator Delivery' },
        { id: 'm7', name: 'Energization' },
        { id: 'm8', name: 'First Synchronization' },
        { id: 'm9', name: 'Performance Test' },
        { id: 'm10', name: 'COD' },
        { id: 'm11', name: 'Final Acceptance (FAC)' }
    ],
    'Solar': [
        { id: 'm1', name: 'Issue LOI / NTP' },
        { id: 'm2', name: 'Condition Precedent' },
        { id: 'm3', name: 'Start Construction' },
        { id: 'm4', name: 'Equipment Delivery (Panel/Inverter)' },
        { id: 'm5', name: 'Mechanical Completion' },
        { id: 'm6', name: 'First Synchronization' },
        { id: 'm7', name: 'COD (Commercial Operation)' },
        { id: 'm8', name: 'PR Test (Performance Ratio)' },
        { id: 'm9', name: 'Final Acceptance (FAC)' }
    ],
    'Wind': [
        { id: 'm1', name: 'NTP' },
        { id: 'm2', name: 'Foundation Pouring' },
        { id: 'm3', name: 'WTG Delivery' },
        { id: 'm4', name: 'WTG Erection' },
        { id: 'm5', name: 'COD' }
    ],
    'Iwte': [
        { id: 'm1', name: 'NTP' },
        { id: 'm2', name: 'First Piling' },
        { id: 'm3', name: 'Boiler Delivery' },
        { id: 'm4', name: 'First Fire' },
        { id: 'm5', name: 'COD' }
    ]
};

let STAFF_DATABASE = {}; 
let allStaffNames = []; 

const DEFAULT_RATES = { totalSalary: 45000, ot: 5000, allowance: 300, accommodation: 500, gas: 0, phone: 0, overhead: 0 };
const thaiMonthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const engMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthsArray = []; 
let monthsExportArray = []; 
let monthValuesArray = []; 
let chartInstance = null; 
let costChartInstance = null; 

window.GLOBAL_COST_DATA = [];
window.GLOBAL_TOTAL_COST = 0;
window.GLOBAL_MONTHLY_COST_BREAKDOWN = {};
window.selectedMilestones = {}; 

// ==========================================================================
// CUSTOM CHART.JS PLUGIN: วาดเส้น Milestone ทับบนกราฟ (เฉพาะกราฟ Manpower)
// ==========================================================================
const milestoneAnnotationPlugin = {
    id: 'milestoneAnnotation',
    afterDraw: (chart) => {
        if(!window.selectedMilestones || Object.keys(window.selectedMilestones).length === 0) return;

        const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;
        ctx.save();

        let indexMap = {};
        for (const key in window.selectedMilestones) {
            const ms = window.selectedMilestones[key];
            const idx = monthValuesArray.indexOf(ms.month);
            if(idx !== -1) {
                if(!indexMap[idx]) indexMap[idx] = [];
                indexMap[idx].push(ms.name);
            }
        }

        for (const idxStr in indexMap) {
            const idx = parseInt(idxStr);
            const names = indexMap[idx];
            const xPos = x.getPixelForTick(idx);

            // วาดเส้นประแนวตั้ง
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.6)'; 
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.moveTo(xPos, top);
            ctx.lineTo(xPos, bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            // วาดกล่องป้ายชื่อ (Badge)
            ctx.fillStyle = 'rgba(79, 70, 229, 0.9)'; 
            const text = names[0].split(' ')[0] + (names.length > 1 ? ' +' : ''); 
            ctx.font = 'bold 11px sans-serif';
            const textWidth = ctx.measureText(text).width;
            const paddingX = 8;
            const rectHeight = 18;
            const rectWidth = textWidth + (paddingX * 2);
            
            ctx.fillRect(xPos - rectWidth/2, top + 2, rectWidth, rectHeight);

            // วาดข้อความในป้าย
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, xPos, top + 2 + rectHeight/2);
        }
        ctx.restore();
    }
};

// ==========================================================================
// 2. INITIALIZATION
// ==========================================================================
window.onload = async () => {
    const today = new Date();
    const currMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const startEl = document.getElementById('startDate');
    const endEl = document.getElementById('endDate');
    if (startEl) startEl.value = currMonth;
    if (endEl) endEl.value = currMonth;

    await loadStaffFromFirebase();

    if (typeof window.generateTable === 'function' && startEl && endEl) {
        window.handleProjectTypeChange(); 
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
                    position: data.position || "ไม่ระบุ",
                    department: data.department || "ไม่ระบุ"
                };
            }
        });
        allStaffNames = Object.keys(STAFF_DATABASE);
        const dataListHtml = `<datalist id="staff-list">${allStaffNames.map(n => `<option value="${n}">`).join('')}</datalist>`;
        const existingList = document.getElementById('staff-list');
        if(existingList) {
            existingList.innerHTML = allStaffNames.map(n => `<option value="${n}">`).join('');
        } else {
            document.body.insertAdjacentHTML('beforeend', dataListHtml);
        }
    } catch (error) {
        console.error("Error loading staff:", error);
    }
}

// ==========================================================================
// 3. UI LOGIC & MANPOWER TABLE & MILESTONES
// ==========================================================================
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('text-blue-700', 'border-b-4', 'border-blue-600', 'bg-blue-50/70');
        el.classList.add('text-slate-500', 'border-transparent');
    });
    document.getElementById(tabId).classList.remove('hidden');
    const activeBtn = document.getElementById('btn-' + tabId);
    if(activeBtn) {
        activeBtn.classList.remove('text-slate-500', 'border-transparent');
        activeBtn.classList.add('text-blue-700', 'border-b-4', 'border-blue-600', 'bg-blue-50/70');
    }
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

window.handleProjectTypeChange = function() {
    const type = document.getElementById('projectType').value;
    const msSection = document.getElementById('milestone-section');
    const msContainer = document.getElementById('milestone-inputs-container');

    window.selectedMilestones = {}; 

    if (type && PROJECT_MILESTONES[type]) {
        if(msSection) msSection.classList.remove('hidden');
        let html = '';
        PROJECT_MILESTONES[type].forEach(m => {
            html += `
            <div class="bg-white p-3 rounded-xl shadow-sm border border-indigo-50">
                <label class="block text-[11px] font-bold text-indigo-700 mb-2 truncate" title="${m.name}">
                    <i class="fa-solid fa-flag text-indigo-400"></i> ${m.name}
                </label>
                <input type="month" id="ms_${m.id}" class="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 font-medium cursor-pointer" onchange="updateMilestoneUI('${m.id}', '${m.name}', this.value)">
            </div>`;
        });
        if(msContainer) msContainer.innerHTML = html;
    } else {
        if(msSection) msSection.classList.add('hidden');
        if(msContainer) msContainer.innerHTML = '';
    }
    window.generateTable();
};

window.updateMilestoneUI = function(id, name, value) {
    if (value) {
        window.selectedMilestones[id] = { name: name, month: value };
    } else {
        delete window.selectedMilestones[id];
    }
    window.generateTable(); 
};

function getMonthsArray(startDateStr, endDateStr) {
    monthsArray = [];
    monthsExportArray = [];
    monthValuesArray = [];
    const startYear = parseInt(startDateStr.substring(0, 4));
    const startMonth = parseInt(startDateStr.substring(5, 7)); 
    const endYear = parseInt(endDateStr.substring(0, 4));
    const endMonth = parseInt(endDateStr.substring(5, 7)); 
    
    let current = new Date(startYear, startMonth - 1, 1);
    const end = new Date(endYear, endMonth - 1, 1);
    
    while (current <= end && monthsArray.length < 60) { 
        monthsArray.push(`${thaiMonthNames[current.getMonth()]} ${current.getFullYear() + 543}`);
        monthsExportArray.push(`${engMonthNames[current.getMonth()]}-${String(current.getFullYear()).substring(2)}`);
        const mStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthValuesArray.push(mStr);
        current.setMonth(current.getMonth() + 1);
    }
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
        renderTimeline(); 
        return;
    }
    
    getMonthsArray(startDate, endDate);
    container.classList.remove('hidden');
    
    const roles = PROJECT_ROLES_MAP[projectType] || PROJECT_ROLES_MAP['Other'];
    
    let headers = monthsArray.map((m, i) => {
        const mVal = monthValuesArray[i];
        let msBadges = '';
        let badgeCount = 0;
        
        for (const key in window.selectedMilestones) {
            if (window.selectedMilestones[key].month === mVal) {
                let topOffset = 8 + (badgeCount * 22); 
                msBadges += `
                    <div class="absolute left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded shadow-sm border border-indigo-700 whitespace-nowrap z-20 flex items-center gap-1" style="top: ${topOffset}px;" title="${window.selectedMilestones[key].name}">
                        <i class="fa-solid fa-flag text-[8px]"></i> ${window.selectedMilestones[key].name.split(' ')[0]}
                    </div>
                `;
                badgeCount++;
            }
        }

        return `<th class="px-2 py-4 pt-12 text-center text-xs font-bold text-slate-700 min-w-[65px] uppercase relative align-bottom border-b-2 border-slate-200">
            ${msBadges}
            <div class="mt-1">${m}</div>
        </th>`;
    }).join('');
    
    let rows = roles.map(role => {
        const roleId = role.roleName.replace(/[^a-zA-Z0-9]/g, '_');
        let inputs = monthsArray.map((m, i) => `
            <td class="p-2 text-center border-r border-slate-100">
                <input type="number" step="0.5" min="0" value="0.0" data-month-val="${monthValuesArray[i]}" class="man-month-input w-14 text-center border border-slate-200 rounded py-1 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-colors text-slate-700 font-medium" oninput="updateTotals()">
            </td>
        `).join('');

        return `
        <tr class="hover:bg-blue-50/50 border-b border-slate-100 transition-colors" id="row-${roleId}">
            <td class="px-4 py-3 font-semibold text-slate-800 sticky-col text-xs bg-white shadow-[1px_0_0_0_#e2e8f0] role-name">${role.roleName}</td>
            <td class="px-2 py-2 min-w-[200px] relative border-r border-slate-100">
                <input type="text" list="staff-list" placeholder="ระบุชื่อพนักงาน (ถ้ามี)..." class="staff-input w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 transition-colors" onchange="updateTotals()">
            </td>
            <td class="px-2 py-2 text-xs font-medium text-slate-600 staff-position min-w-[120px] border-r border-slate-100">-</td>
            <td class="px-2 py-2 text-center min-w-[260px] border-r border-slate-100">
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

    let footerTds = monthsArray.map((_, i) => `<td class="px-2 py-4 text-center font-bold text-blue-700 text-lg col-total-${i} bg-slate-50 border-r border-slate-200">0.0</td>`).join('');

    document.getElementById('table-output').innerHTML = `
        <table id="manpowerTable" class="min-w-full bg-white text-sm border-collapse">
            <thead class="bg-slate-50">
                <tr>
                    <th class="px-4 py-4 text-left sticky-col bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] text-slate-700 uppercase text-xs border-b-2 border-slate-200 align-bottom pb-4">ตำแหน่งงาน (Role)</th>
                    <th class="px-2 py-4 text-left text-slate-700 uppercase text-xs border-b-2 border-slate-200 border-r border-slate-200 align-bottom pb-4">ชื่อพนักงาน</th>
                    <th class="px-2 py-4 text-left text-slate-700 uppercase text-xs border-b-2 border-slate-200 border-r border-slate-200 align-bottom pb-4">ระดับ (Position)</th>
                    <th class="px-2 py-4 text-center text-slate-700 uppercase text-xs border-b-2 border-slate-200 border-r border-slate-200 align-bottom pb-4">ระบุช่วงเวลา (Action)</th>
                    ${headers}
                    <th class="px-4 py-4 text-right text-slate-700 uppercase text-xs bg-slate-50 border-b-2 border-slate-200 align-bottom pb-4">รวม MM</th>
                </tr>
            </thead>
            <tbody id="manpowerTableBody">${rows}</tbody>
            <tfoot class="border-t-2 border-blue-500 shadow-inner">
                <tr>
                    <td colspan="4" class="px-4 py-5 text-right font-bold text-slate-800 sticky-col bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] border-r border-slate-200">Grand Total</td>
                    ${footerTds}
                    <td class="px-4 py-5 text-right font-extrabold text-rose-600 text-xl bg-rose-50 border-l border-rose-200" id="grandTotalLabel">0.0</td>
                </tr>
            </tfoot>
        </table>
    `;
    
    renderTimeline(); 
    updateTotals();
}

// ==========================================================================
// วาด Vertical Timeline ด้านซ้ายของกราฟ (แสดงเฉพาะแท็บ 1)
// ==========================================================================
function renderTimeline() {
    const container1 = document.getElementById('vertical-timeline-container');

    let msArray = [];
    for (const key in window.selectedMilestones) {
        msArray.push(window.selectedMilestones[key]);
    }
    
    // เรียงตามวันที่
    msArray.sort((a, b) => new Date(a.month + '-01') - new Date(b.month + '-01'));

    if (msArray.length === 0) {
        const emptyMsg = `<div class="text-sm text-slate-400 italic">ยังไม่มีการระบุ Milestone</div>`;
        if(container1) container1.innerHTML = emptyMsg;
        return;
    }

    let html = '';
    msArray.forEach(ms => {
        const [y, m] = ms.month.split('-');
        const monthName = thaiMonthNames[parseInt(m)-1];
        const yearThai = parseInt(y) + 543;

        html += `
        <div class="relative">
            <div class="absolute -left-[25px] top-1 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full shadow-sm"></div>
            <div class="mb-1 text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded">${monthName} ${yearThai}</div>
            <div class="text-sm font-semibold text-slate-800 leading-tight">${ms.name}</div>
        </div>`;
    });

    if(container1) container1.innerHTML = html;
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
        if (shouldFill) input.value = "1.0";
    });
    updateTotals();
}

window.resetRow = function(btn) {
    const row = btn.closest('tr');
    row.querySelectorAll('.start-month').forEach(input => input.value = "");
    row.querySelectorAll('.end-month').forEach(input => input.value = "");
    row.querySelectorAll('.man-month-input').forEach(input => input.value = "0.0");
    updateTotals();
}

// ==========================================================================
// IMPORT CSV PRESET
// ==========================================================================
window.applyPreset = function() {
    const projectType = document.getElementById('projectType').value;
    const startDateStr = document.getElementById('startDate').value;

    if (!projectType || !startDateStr) {
        showToast("กรุณาเลือกประเภทโครงการ และเดือนเริ่มต้นก่อน", true);
        return;
    }

    let fileInput = document.getElementById('presetCsvUpload');
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'presetCsvUpload';
        fileInput.accept = '.csv, .xlsx, .xls';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const data = new Uint8Array(evt.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const aoa = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ""});
                    
                    let startColIndex = -1;
                    let durationMonths = 0;

                    for (let row of aoa) {
                        if (!row || row.length === 0) continue;
                        for (let i = 1; i < row.length; i++) {
                            let val = parseFloat(row[i]);
                            if (!isNaN(val) && val > 0) {
                                if (startColIndex === -1 || i < startColIndex) startColIndex = i; 
                            }
                        }
                    }

                    if (startColIndex === -1) {
                        showToast("ไม่พบข้อมูลตัวเลขในไฟล์ โปรดตรวจสอบไฟล์อีกครั้ง", true);
                        return;
                    }

                    for (let row of aoa) {
                        if (!row || row.length === 0) continue;
                        for (let i = row.length - 1; i >= startColIndex; i--) {
                            let val = parseFloat(row[i]);
                            if (!isNaN(val) && val > 0) {
                                let currentDuration = (i - startColIndex) + 1;
                                if (currentDuration > durationMonths) durationMonths = currentDuration;
                                break;
                            }
                        }
                    }

                    if (durationMonths < 1) durationMonths = 1;

                    let [year, month] = startDateStr.split('-').map(Number);
                    let endDateObj = new Date(year, month - 1 + durationMonths - 1, 1);
                    document.getElementById('endDate').value = `${endDateObj.getFullYear()}-${String(endDateObj.getMonth() + 1).padStart(2, '0')}`;
                    window.generateTable(); 

                    let matchCount = 0;
                    document.querySelectorAll('#manpowerTableBody tr').forEach(tr => {
                        const roleName = tr.querySelector('.role-name').textContent.trim();
                        const csvRow = aoa.find(r => r && r[0] && String(r[0]).trim() === roleName);
                        
                        if (csvRow) {
                            const inputs = tr.querySelectorAll('.man-month-input');
                            inputs.forEach((input, index) => {
                                let csvColIndex = startColIndex + index;
                                if (csvColIndex < csvRow.length) {
                                    let val = parseFloat(csvRow[csvColIndex]);
                                    if (!isNaN(val) && val > 0) input.value = val.toFixed(1);
                                    else input.value = "0.0";
                                }
                            });
                            matchCount++;
                        }
                    });

                    updateTotals();
                    showToast(`ดึง Preset สำเร็จ! พบ ${matchCount} ตำแหน่ง รวม ${durationMonths} เดือน`);
                } catch(error) {
                    showToast("รูปแบบไฟล์ไม่ถูกต้อง โปรดใช้ไฟล์ CSV หรือ Excel", true);
                } finally {
                    fileInput.value = ''; 
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }
    fileInput.click();
};

window.downloadExcelTemplate = function() {
    if (monthsArray.length === 0) {
        showToast("กรุณาระบุเดือนเริ่ม-สิ้นสุด เพื่อสร้างตารางก่อนโหลด Template", true);
        return;
    }
    const siteName = document.getElementById('siteName').value || 'NewProject';
    const projectType = document.getElementById('projectType').value;
    const roles = PROJECT_ROLES_MAP[projectType] || PROJECT_ROLES_MAP['Other'];
    
    let headerRow = ["ตำแหน่งงาน (Role)"];
    monthsArray.forEach(m => headerRow.push(m));
    let excelData = [headerRow];
    
    roles.forEach(role => {
        let rowData = [role.roleName.trim()]; 
        monthsArray.forEach(() => rowData.push("0.0"));
        excelData.push(rowData);
    });
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(excelData), "Manpower Plan");
    XLSX.writeFile(wb, `Template_${siteName}_Manpower.xlsx`);
    showToast("ดาวน์โหลดไฟล์ Template สำหรับกรอกข้อมูลสำเร็จ!");
};

window.importExcelData = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const importedRows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            let matchCount = 0;

            document.querySelectorAll('#manpowerTableBody tr').forEach(tr => {
                const roleName = tr.querySelector('.role-name').textContent.trim();
                const matchExcelRow = importedRows.find(row => row['ตำแหน่งงาน (Role)'] && row['ตำแหน่งงาน (Role)'].toString().trim() === roleName);
                
                if (matchExcelRow) {
                    const mmInputs = tr.querySelectorAll('.man-month-input');
                    mmInputs.forEach((input, index) => {
                        if (matchExcelRow[monthsArray[index]] !== undefined) {
                            input.value = parseFloat(matchExcelRow[monthsArray[index]]) || 0.0;
                        }
                    });
                    matchCount++;
                }
            });
            updateTotals();
            showToast(`นำเข้าข้อมูลสำเร็จแล้ว (${matchCount} ตำแหน่ง)`);
        } catch(error) {
            showToast("รูปแบบไฟล์ไม่ถูกต้อง โปรดใช้ไฟล์ Template", true);
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsArrayBuffer(file);
};

// ==========================================================================
// 4. CALCULATION LOGIC & COST TABLE
// ==========================================================================
window.updateTotals = function() {
    let grandTotalMM = 0;
    let monthlyTotalsMM = Array(monthsArray.length).fill(0);
    let costTableData = []; 
    
    document.querySelectorAll('#manpowerTableBody tr').forEach(row => {
        let rowTotalMM = 0;
        let rowMonthlyMM = [];
        
        const roleName = row.querySelector('.role-name').textContent.trim();
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

            if (val > 0) {
                input.classList.remove('bg-slate-50', 'text-slate-700', 'border-slate-200', 'font-medium');
                input.classList.add('bg-blue-100', 'text-blue-700', 'font-bold', 'border-blue-300');
            } else {
                input.classList.remove('bg-blue-100', 'text-blue-700', 'font-bold', 'border-blue-300');
                input.classList.add('bg-slate-50', 'text-slate-700', 'border-slate-200', 'font-medium');
            }

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
    window.GLOBAL_COST_DATA = [];
    window.GLOBAL_TOTAL_COST = 0;
    window.GLOBAL_MONTHLY_COST_BREAKDOWN = {};

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
        let monthlyCostMap = {}; 

        let costCells = row.mmData.map((mm, index) => {
            let monthVal = monthValuesArray[index];

            if (mm === 0) {
                accumMM += mm;
                monthlyCostMap[monthVal] = 0;
                return `<td class="px-3 py-2 text-center text-slate-300 border-r border-slate-100 bg-slate-50/30">-</td>`;
            }

            let monthLabel = monthsArray[index];
            let yearDiff = parseInt(monthLabel.split(' ')[1]) - baseProjectYearThai;
            if (yearDiff < 0) yearDiff = 0; 

            let multiplier = Math.pow(1.08, yearDiff);
            let activeSalary = staffData.totalSalary * multiplier;
            let activeOT = (staffData.ot || 0) * multiplier;

            let baseAllowance = (staffData.allowance || 0) * 30;
            let activeAllowanceRate = baseAllowance;
            if (accumMM >= 12) activeAllowanceRate *= 0.75;
            else if (accumMM === 11.5) activeAllowanceRate *= 0.875;

            let baseAccommodation = (staffData.accommodation || 0) * 30;
            let activeAccommodationRate = baseAccommodation;
            if (accumMM >= 3) activeAccommodationRate *= 0.4;
            else if (accumMM === 2.5) activeAccommodationRate *= 0.7;
            
            let fixedGas = staffData.gas || 0;
            let fixedPhone = staffData.phone || 0;
            let fixedOverhead = staffData.overhead || 0;

            let finalMonthlyCost = (activeSalary + activeOT + activeAllowanceRate + activeAccommodationRate + fixedGas + fixedPhone + fixedOverhead) * mm;
            
            monthlyCostMap[monthVal] = finalMonthlyCost;
            rowTotalCost += finalMonthlyCost;
            monthlyCostTotals[index] += finalMonthlyCost;

            costBreakdown.salary[index] += activeSalary * mm;
            costBreakdown.ot[index] += activeOT * mm;
            costBreakdown.allowance[index] += activeAllowanceRate * mm;
            costBreakdown.accommodation[index] += activeAccommodationRate * mm;
            costBreakdown.gas[index] += fixedGas * mm;
            costBreakdown.phone[index] += fixedPhone * mm;
            costBreakdown.overhead[index] += fixedOverhead * mm;

            accumMM += mm;

            let isIncreased = yearDiff > 0;
            let highlightClass = isIncreased ? "text-emerald-700 font-bold bg-emerald-50/30" : "text-slate-800 font-medium";
            
            return `<td class="px-3 py-2 text-right ${highlightClass} border-r border-slate-100 hover:bg-emerald-100 transition-colors">
                ${finalMonthlyCost.toLocaleString('th-TH', {maximumFractionDigits: 0})}
            </td>`;
        }).join('');

        window.GLOBAL_COST_DATA.push({
            role: row.role,
            name: row.name,
            position: STAFF_DATABASE[row.name]?.position || row.role,
            department: STAFF_DATABASE[row.name]?.department || "ไม่ระบุ",
            totalCost: rowTotalCost,
            monthlyCost: monthlyCostMap
        });

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
                ฿${rowTotalCost.toLocaleString('th-TH', {maximumFractionDigits: 0})}
            </td>
        </tr>`;
    }).join('');

    window.GLOBAL_TOTAL_COST = grandTotalCost;

    monthsArray.forEach((m, index) => {
        window.GLOBAL_MONTHLY_COST_BREAKDOWN[monthValuesArray[index]] = {
            total: monthlyCostTotals[index]
        };
    });

    let footerCells = monthlyCostTotals.map(total => 
        `<td class="px-3 py-4 text-right font-bold text-emerald-800 border-r border-emerald-200 bg-emerald-100/50">
            ${total > 0 ? total.toLocaleString('th-TH', {maximumFractionDigits: 0}) : '-'}
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
                            ฿${grandTotalCost.toLocaleString('th-TH', {maximumFractionDigits: 0})}
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
    if(dataArr.length === 0) { if(msg) msg.style.display = 'block'; canvas.style.display = 'none'; return; }
    if(msg) msg.style.display = 'none'; canvas.style.display = 'block';
    
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: monthsArray, datasets: [{ label: 'Man-Month', data: dataArr, backgroundColor: '#3b82f6', borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
        plugins: [milestoneAnnotationPlugin] 
    });
}

function updateCostChart(breakdown) {
    const canvas = document.getElementById('costChart');
    if(!canvas) return;
    const msg = document.getElementById('cost-chart-loading-message');
    if(!breakdown || breakdown.salary.reduce((a,b)=>a+b, 0) === 0) {
        if(msg) msg.style.display = 'block'; canvas.style.display = 'none';
        if(costChartInstance) costChartInstance.destroy(); return;
    }
    if(msg) msg.style.display = 'none'; canvas.style.display = 'block';
    
    if(costChartInstance) costChartInstance.destroy();
    costChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: monthsArray,
            datasets: [
                { label: 'เงินเดือน', data: breakdown.salary, backgroundColor: '#3b82f6' },
                { label: 'OT', data: breakdown.ot, backgroundColor: '#f59e0b' },
                { label: 'เบี้ยเลี้ยง', data: breakdown.allowance, backgroundColor: '#10b981' },
                { label: 'ค่าที่พัก', data: breakdown.accommodation, backgroundColor: '#8b5cf6' },
                { label: 'น้ำมัน', data: breakdown.gas, backgroundColor: '#ef4444' },
                { label: 'โทรศัพท์', data: breakdown.phone, backgroundColor: '#06b6d4' },
                { label: 'โสหุ้ย', data: breakdown.overhead, backgroundColor: '#64748b' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
        // ⚠️ ลบการเรียกใช้ milestoneAnnotationPlugin ออกจากกราฟนี้แล้ว
    });
}

// ==========================================================================
// 6. FUNCTION บันทึกข้อมูลโครงการขึ้น FIREBASE
// ==========================================================================
window.saveProjectData = async function() {
    const siteName = document.getElementById('siteName').value.trim();
    if(!siteName) { showToast("กรุณาระบุชื่อโครงการ", true); return; }
    const btn = document.getElementById('btnSaveProject') || document.getElementById('saveBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...'; btn.disabled = true;

    try {
        const assignments = [];
        document.querySelectorAll('#manpowerTableBody tr').forEach(row => {
            const role = row.querySelector('.role-name').textContent.trim();
            const nameInput = row.querySelector('.staff-input').value.trim();
            let rowTotalMM = 0; const mmData = {}; 
            row.querySelectorAll('.man-month-input').forEach(input => {
                const monthVal = input.getAttribute('data-month-val');
                const val = parseFloat(input.value) || 0;
                mmData[monthVal] = val; rowTotalMM += val;
            });
            if (nameInput !== '' || rowTotalMM > 0) {
                assignments.push({
                    role: role, name: nameInput,
                    department: STAFF_DATABASE[nameInput]?.department || "ไม่ระบุ",
                    totalMM: rowTotalMM, monthlyMM: mmData
                });
            }
        });

        const timeNow = new Date().toISOString();
        const metadata = {
            siteName: siteName, projectType: document.getElementById('projectType').value,
            startDate: document.getElementById('startDate').value, endDate: document.getElementById('endDate').value,
            totalMM: parseFloat(document.getElementById('grandTotalLabel').textContent) || 0,
            totalCost: window.GLOBAL_TOTAL_COST || 0,
            milestones: window.selectedMilestones,
            updatedAt: timeNow
        };
        
        await setDoc(doc(db, "project_plans", siteName), metadata);
        await setDoc(doc(db, "project_manpower", siteName), { siteName, updatedAt: timeNow, assignments });
        await setDoc(doc(db, "project_cost", siteName), { siteName, updatedAt: timeNow, roleCosts: window.GLOBAL_COST_DATA });

        showToast("บันทึกข้อมูลโครงการสำเร็จ!");
    } catch (error) {
        showToast("เกิดข้อผิดพลาดในการบันทึกข้อมูล", true);
    } finally {
        btn.innerHTML = originalText; btn.disabled = false;
    }
}
window.handleSaveData = window.saveProjectData;

// ==========================================================================
// 7. EXPORT REPORT EXCEL & PDF
// ==========================================================================
function getHeaderStructure() {
    let yearSpans = [];
    let monthHeaders = [];
    let currentYear = null;
    let currentYearCount = 0;

    monthValuesArray.forEach(mStr => {
        const [y, m] = mStr.split('-');
        monthHeaders.push(parseInt(m, 10)); 

        if (y !== currentYear) {
            if (currentYear !== null) {
                yearSpans.push({ year: currentYear, span: currentYearCount });
            }
            currentYear = y;
            currentYearCount = 1;
        } else {
            currentYearCount++;
        }
    });
    if (currentYear !== null) {
        yearSpans.push({ year: currentYear, span: currentYearCount });
    }
    
    return { yearSpans, monthHeaders };
}

window.exportToExcel = function() {
    const siteName = document.getElementById('siteName').value || 'Project';
    if (window.GLOBAL_COST_DATA.length === 0) {
        showToast("ไม่มีข้อมูลสำหรับ Export กรุณากรอกตัวเลขก่อน", true); return;
    }

    const { yearSpans, monthHeaders } = getHeaderStructure();

    let excelHeaderRow1 = ["", "", "", ""];
    yearSpans.forEach(ys => {
        excelHeaderRow1.push(ys.year);
        for(let i=1; i<ys.span; i++) excelHeaderRow1.push(""); 
    });
    excelHeaderRow1.push(""); 

    let excelHeaderRow2 = ["No.", "Name - Surname", "Position", "Department", ...monthHeaders, "Total"];

    let mmDataArray = [excelHeaderRow1, excelHeaderRow2];
    let costDataArray = [excelHeaderRow1, excelHeaderRow2];

    let no = 1;
    let colTotalsMM = Array(monthsArray.length).fill(0);
    let colTotalsCost = Array(monthsArray.length).fill(0);
    let grandTotalMM = 0;
    let grandTotalCost = 0;

    document.querySelectorAll('#manpowerTableBody tr').forEach((tr, index) => {
        const role = tr.querySelector('.role-name').textContent.trim();
        const name = tr.querySelector('.staff-input').value.trim() || "-";
        const costItem = window.GLOBAL_COST_DATA.find(c => c.role === role && c.name === (name !== "-" ? name : ""));
        const position = costItem ? costItem.position : role;
        const dept = costItem ? costItem.department : "-";

        let rowMM = [no, name, position, dept];
        let rowCost = [no, name, position, dept];
        let sumMM = 0, sumCost = 0;

        const mmInputs = tr.querySelectorAll('.man-month-input');
        mmInputs.forEach((inp, i) => {
            let mmVal = parseFloat(inp.value) || 0;
            let costVal = (costItem && costItem.monthlyCost[monthValuesArray[i]]) ? costItem.monthlyCost[monthValuesArray[i]] : 0;

            rowMM.push(mmVal > 0 ? mmVal : "-");
            rowCost.push(costVal > 0 ? costVal : "-");
            sumMM += mmVal; sumCost += costVal;
            colTotalsMM[i] += mmVal; colTotalsCost[i] += costVal;
        });

        rowMM.push(sumMM); rowCost.push(sumCost);
        grandTotalMM += sumMM; grandTotalCost += sumCost;

        if (sumMM > 0) {
            mmDataArray.push(rowMM); costDataArray.push(rowCost); no++;
        }
    });

    let footerMM = ["", "Grand Total", "", ""];
    let footerCost = ["", "Grand Total", "", ""];
    
    colTotalsMM.forEach(v => footerMM.push(v > 0 ? v : "-"));
    colTotalsCost.forEach(v => footerCost.push(v > 0 ? v : "-"));
    
    footerMM.push(grandTotalMM);
    footerCost.push(grandTotalCost);

    mmDataArray.push(footerMM);
    costDataArray.push(footerCost);

    const wb = XLSX.utils.book_new();
    const wsMM = XLSX.utils.aoa_to_sheet(mmDataArray);
    const wsCost = XLSX.utils.aoa_to_sheet(costDataArray);

    let merges = [
        { s: {r: 0, c: 0}, e: {r: 1, c: 0} }, 
        { s: {r: 0, c: 1}, e: {r: 1, c: 1} }, 
        { s: {r: 0, c: 2}, e: {r: 1, c: 2} }, 
        { s: {r: 0, c: 3}, e: {r: 1, c: 3} }, 
        { s: {r: 0, c: 4 + monthHeaders.length}, e: {r: 1, c: 4 + monthHeaders.length} } 
    ];
    
    let colIndex = 4;
    yearSpans.forEach(ys => {
        if (ys.span > 1) {
            merges.push({ s: {r: 0, c: colIndex}, e: {r: 0, c: colIndex + ys.span - 1} });
        }
        colIndex += ys.span;
    });

    wsMM['!merges'] = merges;
    wsCost['!merges'] = merges;

    XLSX.utils.book_append_sheet(wb, wsMM, "Manpower Plan");
    XLSX.utils.book_append_sheet(wb, wsCost, "Cost Plan");

    XLSX.writeFile(wb, `Report_${siteName}.xlsx`);
    showToast("ดาวน์โหลดไฟล์ Excel สำเร็จ!");
};

window.exportToPDF = function() {
    const siteName = document.getElementById('siteName').value || 'Project';
    if (window.GLOBAL_COST_DATA.length === 0) {
        showToast("ไม่มีข้อมูลสำหรับ Export กรุณากรอกตัวเลขก่อน", true); return;
    }

    showToast("กำลังสร้างไฟล์ PDF โปรดรอสักครู่...");
    const { yearSpans, monthHeaders } = getHeaderStructure();

    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '20px';
    tempDiv.style.width = '100%';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.fontFamily = 'sans-serif';

    const generateHTMLTable = (type) => {
        const headerBg = type === 'mm' ? '#203764' : '#385723'; 
        const title = type === 'mm' ? 'Manpower Plan' : 'Cost Plan';
        
        let html = `<h2 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: ${headerBg};">${title} : ${siteName}</h2>`;
        html += `<table style="width: 100%; border-collapse: collapse; font-size: 9px; text-align: center; margin-bottom: 30px; border: 1px solid #000;">`;

        html += `<tr style="background-color: ${headerBg}; color: white; border: 1px solid #000;">`;
        html += `<th rowspan="2" style="padding: 5px; border: 1px solid #000;">No.</th>`;
        html += `<th rowspan="2" style="padding: 5px; border: 1px solid #000;">Name - Surname</th>`;
        html += `<th rowspan="2" style="padding: 5px; border: 1px solid #000;">Position</th>`;
        html += `<th rowspan="2" style="padding: 5px; border: 1px solid #000;">Department</th>`;
        yearSpans.forEach(ys => {
            html += `<th colspan="${ys.span}" style="padding: 5px; border: 1px solid #000;">${ys.year}</th>`;
        });
        html += `<th rowspan="2" style="padding: 5px; border: 1px solid #000;">Total</th>`;
        html += `</tr>`;

        html += `<tr style="background-color: ${headerBg}; color: white; border: 1px solid #000;">`;
        monthHeaders.forEach(m => {
            html += `<th style="padding: 5px; border: 1px solid #000; min-width: 20px;">${m}</th>`;
        });
        html += `</tr>`;

        let no = 1;
        let colTotals = Array(monthsArray.length).fill(0);
        let grandTotal = 0;

        document.querySelectorAll('#manpowerTableBody tr').forEach((tr) => {
            const role = tr.querySelector('.role-name').textContent.trim();
            const name = tr.querySelector('.staff-input').value.trim() || "-";
            const costItem = window.GLOBAL_COST_DATA.find(c => c.role === role && c.name === (name !== "-" ? name : ""));
            const position = costItem ? costItem.position : role;
            const dept = costItem ? costItem.department : "-";

            let mmValues = [];
            let sumMM = 0;
            tr.querySelectorAll('.man-month-input').forEach(inp => {
                let v = parseFloat(inp.value) || 0;
                mmValues.push(v);
                sumMM += v;
            });

            if (sumMM === 0) return; 

            html += `<tr>`;
            html += `<td style="padding: 5px; border: 1px solid #000;">${no++}</td>`;
            html += `<td style="padding: 5px; border: 1px solid #000; text-align: left;">${name}</td>`;
            html += `<td style="padding: 5px; border: 1px solid #000; text-align: left;">${position}</td>`;
            html += `<td style="padding: 5px; border: 1px solid #000;">${dept}</td>`;

            let rowTotal = 0;
            mmValues.forEach((mm, i) => {
                let cellVal = type === 'mm' ? mm : ((costItem && costItem.monthlyCost[monthValuesArray[i]]) ? costItem.monthlyCost[monthValuesArray[i]] : 0);
                rowTotal += cellVal;
                colTotals[i] += cellVal;
                
                let displayVal = cellVal > 0 ? (type === 'cost' ? cellVal.toLocaleString('th-TH',{maximumFractionDigits:0}) : cellVal.toFixed(1)) : '-';
                html += `<td style="padding: 5px; border: 1px solid #000; ${cellVal > 0 ? 'background-color: #f8fafc;' : ''}">${displayVal}</td>`;
            });

            grandTotal += rowTotal;
            html += `<td style="padding: 5px; border: 1px solid #000; font-weight: bold; background-color: #f1f5f9;">${type === 'cost' ? rowTotal.toLocaleString('th-TH',{maximumFractionDigits:0}) : rowTotal.toFixed(1)}</td>`;
            html += `</tr>`;
        });

        html += `<tr style="background-color: #e2e8f0; font-weight: bold;">`;
        html += `<td colspan="4" style="padding: 5px; border: 1px solid #000; text-align: right;">Grand Total</td>`;
        colTotals.forEach(val => {
            let displayVal = val > 0 ? (type === 'cost' ? val.toLocaleString('th-TH',{maximumFractionDigits:0}) : val.toFixed(1)) : '-';
            html += `<td style="padding: 5px; border: 1px solid #000;">${displayVal}</td>`;
        });
        html += `<td style="padding: 5px; border: 1px solid #000;">${type === 'cost' ? grandTotal.toLocaleString('th-TH',{maximumFractionDigits:0}) : grandTotal.toFixed(1)}</td>`;
        html += `</tr>`;

        html += `</table>`;
        return html;
    };

    tempDiv.innerHTML = generateHTMLTable('mm') + generateHTMLTable('cost');

    const opt = {
        margin:       [5, 5, 5, 5],
        filename:     `Report_${siteName}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a3', orientation: 'landscape' } 
    };

    html2pdf().set(opt).from(tempDiv).save().then(() => {
        showToast("ดาวน์โหลดไฟล์ PDF สำเร็จ!");
    });
};

window.analyzeWithGemini = function() {
    showToast("ฟีเจอร์ AI นำเสนอกำลังอยู่ระหว่างการเชื่อมต่อ API");
}