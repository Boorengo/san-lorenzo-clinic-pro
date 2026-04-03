import { useState } from "react";
import { Save, Printer, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DynamicTable, { ColumnDef } from "@/components/DynamicTable";
import FormEntryModal from "@/components/FormEntryModal";

// ── TCL sub-types ──
const tclTypes = [
  { id: "prenatal", label: "Prenatal Care" },
  { id: "senior", label: "For Senior Citizens" },
  { id: "nutrition-1-4", label: "Nutrition & Deworming (1-4 yrs)" },
  { id: "deworming-5-9", label: "Deworming (5-9 yrs)" },
  { id: "deworming-10-19", label: "Deworming (10-19 yrs)" },
  { id: "immunization-0-12m", label: "Immunization & Nutrition (0-12 mos)" },
  { id: "pen-assessment", label: "PEN Target Client Assessment" },
  { id: "pen-cvd", label: "PEN CVD Risk Registry (≥30%)" },
];

const tclColumns: Record<string, ColumnDef[]> = {
  prenatal: [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "address", label: "Address", type: "text" },
    { key: "lmp", label: "LMP", type: "date" },
    { key: "edc", label: "EDC", type: "date" },
    { key: "aog", label: "AOG (weeks)", type: "number", width: "90px" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "fundic", label: "Fundic Height", type: "text", width: "110px" },
    { key: "fht", label: "FHT", type: "text", width: "80px" },
    { key: "tt", label: "TT Status", type: "select", options: ["TT1", "TT2", "TT3", "TT4", "TT5", "Fully Immunized"] },
    { key: "labResults", label: "Lab Results", type: "text" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  senior: [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Blood Sugar", type: "text", width: "110px" },
    { key: "chiefComplaint", label: "Chief Complaint", type: "text" },
    { key: "diagnosis", label: "Diagnosis", type: "text" },
    { key: "treatment", label: "Treatment", type: "text" },
    { key: "referral", label: "Referral", type: "select", options: ["None", "Hospital", "Specialist"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "nutrition-1-4": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Child Name", type: "text" },
    { key: "age", label: "Age (mos)", type: "number", width: "90px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "height", label: "Height (cm)", type: "number", width: "100px" },
    { key: "nutritionStatus", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Severely Underweight", "Overweight"] },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dewormingDate", label: "Deworming Date", type: "date" },
    { key: "vitaminA", label: "Vitamin A", type: "checkbox" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "deworming-5-9": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "school", label: "School", type: "text" },
    { key: "gradeLevel", label: "Grade Level", type: "text", width: "100px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dose", label: "Dose", type: "select", options: ["1st Dose", "2nd Dose"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "deworming-10-19": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "school", label: "School", type: "text" },
    { key: "gradeLevel", label: "Grade/Year Level", type: "text", width: "110px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dose", label: "Dose", type: "select", options: ["1st Dose", "2nd Dose"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "immunization-0-12m": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Child Name", type: "text" },
    { key: "dob", label: "Date of Birth", type: "date" },
    { key: "age", label: "Age (mos)", type: "number", width: "90px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "height", label: "Height (cm)", type: "number", width: "100px" },
    { key: "bcg", label: "BCG", type: "checkbox" },
    { key: "hepB", label: "Hep B", type: "checkbox" },
    { key: "pentavalent", label: "Pentavalent", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "opv", label: "OPV", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "ipv", label: "IPV", type: "select", options: ["1st", "2nd", "N/A"] },
    { key: "pcv", label: "PCV", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "mmr", label: "MMR", type: "select", options: ["1st", "2nd", "N/A"] },
    { key: "nutritionStatus", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Severely Underweight", "Overweight"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "pen-assessment": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Blood Sugar", type: "text", width: "110px" },
    { key: "bmi", label: "BMI", type: "number", width: "80px" },
    { key: "smoker", label: "Smoker", type: "checkbox" },
    { key: "diabetic", label: "Diabetic", type: "checkbox" },
    { key: "cvdRisk", label: "CVD Risk Score", type: "text", width: "110px" },
    { key: "riskLevel", label: "Risk Level", type: "select", options: ["Low (<10%)", "Moderate (10-20%)", "High (20-30%)", "Very High (≥30%)"] },
    { key: "treatment", label: "Treatment", type: "text" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "pen-cvd": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Fasting Blood Sugar", type: "text", width: "130px" },
    { key: "totalCholesterol", label: "Total Cholesterol", type: "text", width: "130px" },
    { key: "cvdRisk", label: "CVD Risk %", type: "text", width: "100px" },
    { key: "medication", label: "Medication", type: "text" },
    { key: "aspirin", label: "Aspirin", type: "checkbox" },
    { key: "statin", label: "Statin", type: "checkbox" },
    { key: "antihypertensive", label: "Anti-HPN", type: "checkbox" },
    { key: "followUp", label: "Follow-up Date", type: "date" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
};

// ── Family Health Columns ──
const familyHealthColumns: ColumnDef[] = [
  { key: "name", label: "Family Member", type: "text" },
  { key: "age", label: "Age", type: "number", width: "80px" },
  { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
  { key: "pregnant", label: "Pregnant", type: "checkbox" },
  { key: "bp", label: "Blood Pressure", type: "text" },
  { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
  { key: "height", label: "Height (cm)", type: "number", width: "100px" },
  { key: "bmi", label: "BMI", type: "number", width: "80px" },
  { key: "diagnosis", label: "Diagnosis", type: "text" },
  { key: "remarks", label: "Remarks", type: "text" },
];

// ── Nutrition Columns ──
const nutritionColumns: ColumnDef[] = [
  { key: "name", label: "Child Name", type: "text" },
  { key: "age", label: "Age (months)", type: "number", width: "100px" },
  { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
  { key: "height", label: "Height (cm)", type: "number", width: "100px" },
  { key: "status", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Overweight", "Severely Underweight"] },
  { key: "feeding", label: "Feeding Program", type: "checkbox" },
];

// ── Vaccine Report Columns ──
const vaccineReportColumns: ColumnDef[] = [
  { key: "date", label: "Date", type: "date" },
  { key: "vaccineName", label: "Vaccine Name", type: "text" },
  { key: "lotNumber", label: "Lot Number", type: "text", width: "120px" },
  { key: "expirationDate", label: "Expiration Date", type: "date" },
  { key: "vialsPrevMonth", label: "No. of Vials from Prev. Month (F)", type: "number", width: "160px" },
  { key: "dosesPrevMonth", label: "No. of Doses from Prev. Month (G)", type: "number", width: "160px" },
  { key: "dosesReceived", label: "No. of Doses Received (H)", type: "number", width: "160px" },
  { key: "dosesDistributed", label: "No. of Doses Distributed to Other BHIs", type: "number", width: "180px" },
  { key: "totalRemaining", label: "Total Remaining Doses (F+G)-H", type: "number", width: "180px" },
  { key: "vialsUsed", label: "No. of Vials Used (I)", type: "number", width: "140px" },
  { key: "dosesUsed", label: "No. of Doses Used (J)", type: "number", width: "140px" },
  { key: "wastage", label: "Wastage (K)", type: "number", width: "120px" },
  { key: "remainingDoses", label: "Remaining Doses I-(J+K)", type: "number", width: "160px" },
];

// ── Prenatal Columns ──
const prenatalColumns: ColumnDef[] = [
  { key: "date", label: "Date", type: "date" },
  { key: "infantName", label: "Name of Infant", type: "text" },
  { key: "bp", label: "BP", type: "text", width: "100px" },
  { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
  { key: "height", label: "Height (cm)", type: "number", width: "100px" },
  { key: "obHistory", label: "OB History", type: "text" },
  { key: "lmp", label: "LMP", type: "date" },
  { key: "aog", label: "AOG (weeks)", type: "number", width: "100px" },
  { key: "fetalHeart", label: "Fetal Heart", type: "text", width: "110px" },
  { key: "presentation", label: "Presentation", type: "select", options: ["Cephalic", "Breech", "Transverse", "Oblique"] },
  { key: "assessment", label: "Assessment", type: "text" },
  { key: "plan", label: "Plan", type: "text" },
];

// ── NCD High-Risk Assessment Columns ──
const ncdColumns: ColumnDef[] = [
  { key: "dateAssessment", label: "Date of Assessment", type: "date" },
  { key: "name", label: "Name", type: "text" },
  { key: "birthDate", label: "Birth Date", type: "date" },
  { key: "age", label: "Age", type: "number", width: "70px" },
  { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
  { key: "civilStatus", label: "Civil Status", type: "select", options: ["Single", "Married", "Widowed", "Separated"] },
  { key: "address", label: "Address", type: "text" },
  { key: "contactNumbers", label: "Contact Numbers", type: "text" },
  { key: "occupation", label: "Occupation", type: "text" },
  { key: "educationalAttainment", label: "Educational Attainment", type: "text" },
  { key: "chestPain", label: "Chest Pain/Discomfort", type: "select", options: ["Yes", "No"] },
  { key: "strokeSymptoms", label: "Stroke/TIA Symptoms", type: "select", options: ["Yes", "No"] },
  { key: "diagnosedDiabetes", label: "Diagnosed Diabetes", type: "select", options: ["Yes", "No", "Do not know"] },
  { key: "familyHypertension", label: "Family Hx: Hypertension", type: "select", options: ["Yes", "No"] },
  { key: "familyStroke", label: "Family Hx: Stroke", type: "select", options: ["Yes", "No"] },
  { key: "familyHeartAttack", label: "Family Hx: Heart Attack", type: "select", options: ["Yes", "No"] },
  { key: "familyDiabetes", label: "Family Hx: Diabetes", type: "select", options: ["Yes", "No"] },
  { key: "familyAsthma", label: "Family Hx: Asthma", type: "select", options: ["Yes", "No"] },
  { key: "familyKidney", label: "Family Hx: Kidney Disease", type: "select", options: ["Yes", "No"] },
  { key: "smokingStatus", label: "Smoking Status", type: "select", options: ["Never", "Former", "Current"] },
  { key: "alcoholIntake", label: "Alcohol Intake", type: "select", options: ["Never consumed", "Yes, drinks alcohol", "Excessive Alcohol Intake"] },
  { key: "excessiveDrinking", label: "5+ drinks in one occasion (past month)", type: "select", options: ["Yes", "No"] },
  { key: "vegetables3", label: "3 servings vegetables daily", type: "select", options: ["Yes", "No"] },
  { key: "fruits2", label: "2-3 servings fruits daily", type: "select", options: ["Yes", "No"] },
  { key: "waistCircumference", label: "Waist Circumference (cm)", type: "number", width: "120px" },
  { key: "physicalActivity", label: "≥2.5 hrs/week moderate activity", type: "select", options: ["Yes", "No"] },
  { key: "systolic1", label: "Systolic 1st Reading", type: "number", width: "110px" },
  { key: "diastolic1", label: "Diastolic 1st Reading", type: "number", width: "110px" },
  { key: "systolic2", label: "Systolic 2nd Reading", type: "number", width: "110px" },
  { key: "diastolic2", label: "Diastolic 2nd Reading", type: "number", width: "110px" },
  { key: "averageBP", label: "Average Blood Pressure", type: "text", width: "120px" },
  { key: "riskLevel", label: "Risk Level", type: "select", options: ["<10%", "10% to <20%", "20% to <30%", ">30%"] },
  { key: "action", label: "Action", type: "select", options: ["Referred to health center", "Given Health Information"] },
  { key: "management", label: "Management", type: "select", options: ["Lifestyle Modification", "Medications", "Both"] },
  { key: "assessedBy", label: "Assessment Done By", type: "text" },
  { key: "followUp", label: "Follow-up Date", type: "date" },
  { key: "findings", label: "Findings", type: "text" },
];

// ── ECCD Card Columns ──
const eccdColumns: ColumnDef[] = [
  { key: "clinicName", label: "Clinic/Health Center", type: "text" },
  { key: "barangay", label: "Barangay", type: "text" },
  { key: "purokSitio", label: "Purok/Sitio", type: "text" },
  { key: "familyAddress", label: "Complete Address", type: "text" },
  { key: "childNo", label: "Child's No.", type: "text", width: "90px" },
  { key: "familyNo", label: "Family No.", type: "text", width: "90px" },
  { key: "childName", label: "Child's Name", type: "text" },
  { key: "motherName", label: "Mother's Name", type: "text" },
  { key: "motherPregnancies", label: "No. of Pregnancies", type: "number", width: "100px" },
  { key: "motherEducation", label: "Mother's Education Level", type: "text" },
  { key: "motherOccupation", label: "Mother's Occupation", type: "text" },
  { key: "fatherName", label: "Father's Name", type: "text" },
  { key: "fatherEducation", label: "Father's Education Level", type: "text" },
  { key: "fatherOccupation", label: "Father's Occupation", type: "text" },
  { key: "birthDate", label: "Birth Date", type: "date" },
  { key: "gestationalAge", label: "Gestational Age at Birth (weeks)", type: "number", width: "120px" },
  { key: "typeOfBirth", label: "Type of Birth", type: "select", options: ["Normal", "Cesarean", "Assisted"] },
  { key: "birthOrder", label: "Birth Order", type: "text", width: "90px" },
  { key: "birthWeight", label: "Birth Weight (g)", type: "number", width: "110px" },
  { key: "birthLength", label: "Birth Length (cm)", type: "number", width: "110px" },
  { key: "placeOfDelivery", label: "Place of Delivery", type: "select", options: ["Home", "Lying In", "Hospital", "Others"] },
  { key: "birthAttendant", label: "Birth Attendant", type: "select", options: ["Doctor", "Nurse", "Midwife", "Hilot", "Others"] },
  { key: "newbornScreening", label: "Newborn Screening Date", type: "date" },
  { key: "bcgDate", label: "BCG Date", type: "date" },
  { key: "pentaDate", label: "PENTA Date", type: "date" },
  { key: "opvDate", label: "OPV Date", type: "date" },
  { key: "hepBDate1", label: "Hepatitis B 1st Date", type: "date" },
  { key: "hepBDate2", label: "Hepatitis B 2nd Date", type: "date" },
  { key: "measlesDate", label: "Measles Date", type: "date" },
  { key: "pcv13Date", label: "PCV 13 Date", type: "date" },
  { key: "ipvDate", label: "IPV Date", type: "date" },
  { key: "vitaminA", label: "Vitamin A Supplementation", type: "select", options: ["100,000 IU", "200,000 IU", "N/A"] },
  { key: "breastfeedingCounseling", label: "Breastfeeding Counseling", type: "checkbox" },
  { key: "growthMonitoring", label: "Growth Monitoring", type: "checkbox" },
  { key: "developmentalScreening", label: "Developmental Screening", type: "checkbox" },
  { key: "dewormingDate", label: "Deworming Date", type: "date" },
  { key: "dentalCheckup", label: "Dental Checkup", type: "checkbox" },
  { key: "remarks", label: "Remarks", type: "text" },
];

// ── Home-Based Mother Record Columns ──
const homeBasedMotherColumns: ColumnDef[] = [
  { key: "motherName", label: "Mother's Name", type: "text" },
  { key: "date", label: "Date", type: "date" },
  { key: "breastfeeding24hrs", label: "Exclusive Breastfeeding (24 hrs)", type: "select", options: ["Oo", "Hindi"] },
  { key: "breastfeeding1wk", label: "Exclusive Breastfeeding (1 Week)", type: "select", options: ["Oo", "Hindi"] },
  { key: "breastfeeding2_4wk", label: "Exclusive Breastfeeding (2-4 Weeks)", type: "select", options: ["Oo", "Hindi"] },
  { key: "familyPlanning24hrs", label: "Family Planning (24 hrs)", type: "select", options: ["Oo", "Hindi"] },
  { key: "familyPlanning1wk", label: "Family Planning (1 Week)", type: "select", options: ["Oo", "Hindi"] },
  { key: "familyPlanning2_4wk", label: "Family Planning (2-4 Weeks)", type: "select", options: ["Oo", "Hindi"] },
  { key: "fever24hrs", label: "Lagnat ≥38°C (24 hrs)", type: "select", options: ["Oo", "Hindi"] },
  { key: "fever1wk", label: "Lagnat ≥38°C (1 Week)", type: "select", options: ["Oo", "Hindi"] },
  { key: "fever2_4wk", label: "Lagnat ≥38°C (2-4 Weeks)", type: "select", options: ["Oo", "Hindi"] },
  { key: "foulDischarge24hrs", label: "Foul Discharge (24 hrs)", type: "select", options: ["Oo", "Hindi"] },
  { key: "foulDischarge1wk", label: "Foul Discharge (1 Week)", type: "select", options: ["Oo", "Hindi"] },
  { key: "foulDischarge2_4wk", label: "Foul Discharge (2-4 Weeks)", type: "select", options: ["Oo", "Hindi"] },
  { key: "pallor24hrs", label: "Pamumutla (24 hrs)", type: "select", options: ["Oo", "Hindi"] },
  { key: "pallor1wk", label: "Pamumutla (1 Week)", type: "select", options: ["Oo", "Hindi"] },
  { key: "pallor2_4wk", label: "Pamumutla (2-4 Weeks)", type: "select", options: ["Oo", "Hindi"] },
  { key: "cordOk", label: "Ayos ang Pusod", type: "select", options: ["Oo", "Hindi"] },
  { key: "vitaminA200k", label: "Vitamin A 200,000 IU", type: "select", options: ["Oo", "Hindi"] },
  { key: "ironFolateDate", label: "Iron/Folate Date", type: "date" },
  { key: "tuberculosis", label: "Tuberculosis (>14 days cough)", type: "select", options: ["Wala", "Oo"] },
  { key: "heartDisease", label: "Sakit sa Puso", type: "select", options: ["Wala", "Oo"] },
  { key: "diabetes", label: "Diabetes", type: "select", options: ["Wala", "Oo"] },
  { key: "asthma", label: "Hika", type: "select", options: ["Wala", "Oo"] },
  { key: "goiter", label: "Bosyo", type: "select", options: ["Wala", "Oo"] },
  { key: "fpDate", label: "FP Follow-up Date", type: "date" },
  { key: "fpMethod", label: "FP Method", type: "text" },
  { key: "fpQuantity", label: "FP Quantity Given", type: "text" },
  { key: "fpRemarks", label: "FP Remarks", type: "text" },
  { key: "referral", label: "Referral Action", type: "select", options: ["Papuntahin sa Doktor/RHU", "Sundan ang Kalagayan", "Masusing Pagsusuri", "Ipinayong Manganak sa Ospital"] },
];

// ── FHSIS Monthly Columns ──
const fhsisColumns: ColumnDef[] = [
  { key: "indicator", label: "Health Indicator", type: "text" },
  { key: "male", label: "Male", type: "number", width: "80px" },
  { key: "female", label: "Female", type: "number", width: "80px" },
  { key: "total", label: "Total", type: "number", width: "80px" },
  { key: "target", label: "Target", type: "number", width: "80px" },
  { key: "remarks", label: "Remarks", type: "text" },
];

const fhsisDefaultData = [
  { indicator: "Prenatal Visits", male: "", female: "", total: "", target: "", remarks: "" },
  { indicator: "Immunizations Given", male: "", female: "", total: "", target: "", remarks: "" },
  { indicator: "TB Cases Treated", male: "", female: "", total: "", target: "", remarks: "" },
];

// ── Form header with month/year ──
function FormHeader({ title, description }: { title: string; description: string }) {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-card-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Month</Label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["2024","2025","2026","2027"].map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="flex flex-wrap gap-3 justify-end pt-2">
      <Button variant="outline" className="gap-1.5">
        <Printer className="h-4 w-4" /> Print
      </Button>
      <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
        <Save className="h-4 w-4" /> Save
      </Button>
    </div>
  );
}

// ── Form card that opens a modal ──
function FormCard({
  title,
  description,
  columns,
  data,
  onAddRecord,
}: {
  title: string;
  description: string;
  columns: ColumnDef[];
  data: Record<string, any>[];
  onAddRecord: (record: Record<string, any>) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormHeader title={title} description={description} />
        <Button
          onClick={() => setModalOpen(true)}
          className="healthcare-gradient text-primary-foreground border-0 gap-1.5"
        >
          <Plus className="h-4 w-4" /> New Record
        </Button>
      </div>

      {/* Show saved records as read-only table */}
      {data.length > 0 && (
        <DynamicTable columns={columns} data={data} readOnly />
      )}

      {data.length === 0 && (
        <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground font-medium">No records yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Click "New Record" to add an entry</p>
        </div>
      )}

      <FormActions />

      <FormEntryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={title}
        description={`Fill out the ${title.toLowerCase()} form`}
        columns={columns}
        onSave={onAddRecord}
      />
    </div>
  );
}

// ── TCL Tab Content ──
function TCLContent() {
  const [activeTcl, setActiveTcl] = useState("prenatal");
  const [tclData, setTclData] = useState<Record<string, Record<string, any>[]>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const currentData = tclData[activeTcl] || [];
  const currentColumns = tclColumns[activeTcl] || [];
  const currentLabel = tclTypes.find(t => t.id === activeTcl)?.label || "";

  const handleAddRecord = (record: Record<string, any>) => {
    setTclData(prev => ({
      ...prev,
      [activeTcl]: [...(prev[activeTcl] || []), record],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormHeader
          title="Target Client List (Doctor Logbook)"
          description="Select the type of TCL logbook to fill out"
        />
        <Button
          onClick={() => setModalOpen(true)}
          className="healthcare-gradient text-primary-foreground border-0 gap-1.5"
        >
          <Plus className="h-4 w-4" /> New Record
        </Button>
      </div>

      {/* TCL Type Selector */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">TCL Type</Label>
        <Select value={activeTcl} onValueChange={setActiveTcl}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tclTypes.map(t => (
              <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
        <p className="text-sm font-medium text-primary">Currently editing: <span className="font-semibold">{currentLabel}</span></p>
      </div>

      {currentData.length > 0 ? (
        <DynamicTable columns={currentColumns} data={currentData} readOnly />
      ) : (
        <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground font-medium">No records yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Click "New Record" to add an entry</p>
        </div>
      )}

      <FormActions />

      <FormEntryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={currentLabel}
        description={`Fill out the ${currentLabel} form`}
        columns={currentColumns}
        onSave={handleAddRecord}
      />
    </div>
  );
}

// ── Main Forms & Reports Page ──
export default function FormsReports() {
  const [familyData, setFamilyData] = useState<Record<string, any>[]>([]);
  const [prenatalData, setPrenatalData] = useState<Record<string, any>[]>([]);
  const [nutritionData, setNutritionData] = useState<Record<string, any>[]>([]);
  const [vaccineData, setVaccineData] = useState<Record<string, any>[]>([]);
  const [ncdData, setNcdData] = useState<Record<string, any>[]>([]);
  const [eccdData, setEccdData] = useState<Record<string, any>[]>([]);
  const [homeBasedData, setHomeBasedData] = useState<Record<string, any>[]>([]);
  const [fhsisData, setFhsisData] = useState<Record<string, any>[]>(fhsisDefaultData);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Forms & Reports</h1>
        <p className="text-sm text-muted-foreground">Select a form to fill out or generate reports</p>
      </div>

      <Tabs defaultValue="family-health" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1.5 rounded-lg">
          <TabsTrigger value="family-health" className="text-xs sm:text-sm">Family Health</TabsTrigger>
          <TabsTrigger value="prenatal" className="text-xs sm:text-sm">Prenatal</TabsTrigger>
          <TabsTrigger value="tcl" className="text-xs sm:text-sm">Target Client List</TabsTrigger>
          <TabsTrigger value="nutrition" className="text-xs sm:text-sm">Nutrition Report</TabsTrigger>
          <TabsTrigger value="vaccine" className="text-xs sm:text-sm">Vaccine Report</TabsTrigger>
          <TabsTrigger value="ncd" className="text-xs sm:text-sm">NCD Assessment</TabsTrigger>
          <TabsTrigger value="eccd" className="text-xs sm:text-sm">ECCD Card</TabsTrigger>
          <TabsTrigger value="home-based" className="text-xs sm:text-sm">Home-Based Mother</TabsTrigger>
          <TabsTrigger value="fhsis" className="text-xs sm:text-sm">FHSIS Monthly</TabsTrigger>
        </TabsList>

        {/* Family Health */}
        <TabsContent value="family-health">
          <FormCard
            title="Family Health Profiling Form"
            description="Household-level health data collection"
            columns={familyHealthColumns}
            data={familyData}
            onAddRecord={(r) => setFamilyData(prev => [...prev, r])}
          />
        </TabsContent>

        {/* Prenatal */}
        <TabsContent value="prenatal">
          <FormCard
            title="Prenatal Care Record"
            description="Maternal and infant health monitoring during pregnancy"
            columns={prenatalColumns}
            data={prenatalData}
            onAddRecord={(r) => setPrenatalData(prev => [...prev, r])}
          />
        </TabsContent>

        {/* TCL */}
        <TabsContent value="tcl">
          <TCLContent />
        </TabsContent>

        {/* Nutrition */}
        <TabsContent value="nutrition">
          <FormCard
            title="Nutrition Report"
            description="Monthly nutrition status tracking for children"
            columns={nutritionColumns}
            data={nutritionData}
            onAddRecord={(r) => setNutritionData(prev => [...prev, r])}
          />
        </TabsContent>

        {/* Vaccine Report */}
        <TabsContent value="vaccine">
          <FormCard
            title="Vaccine Report"
            description="Monthly vaccine inventory and distribution tracking"
            columns={vaccineReportColumns}
            data={vaccineData}
            onAddRecord={(r) => setVaccineData(prev => [...prev, r])}
          />
        </TabsContent>

        {/* FHSIS - keep as inline table since it's a monthly summary */}
        <TabsContent value="fhsis" className="space-y-4">
          <FormHeader title="FHSIS Monthly Report" description="Field Health Service Information System monthly summary" />
          <DynamicTable columns={fhsisColumns} data={fhsisData} onChange={setFhsisData} />
          <FormActions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
