
import React, { useState } from 'react';
import { Database, Table2, ChevronRight, Search } from 'lucide-react';

// ─── Embedded Database (from Dump20260405.sql) ──────────────────────────────

const DB_TABLES: Record<string, { columns: string[]; rows: (string | number | null)[][] }> = {
  campuses: {
    columns: ['campus_id', 'campus_name', 'campus_code', 'location', 'total_area_sqft', 'created_at'],
    rows: [
      [1, 'GreenAudit Main Campus', 'GMC01', 'Delhi', '250000.00', '2026-04-05 07:00:24'],
    ],
  },
  buildings: {
    columns: ['building_id', 'campus_id', 'department_id', 'building_name', 'building_code', 'building_type', 'floors', 'occupancy_capacity', 'status', 'created_at'],
    rows: [
      [1, 1, 1, 'Science Labs',      'BLD-SCI-01', 'LAB',      3, 500, 'ACTIVE', '2026-04-05 07:00:24'],
      [2, 1, 2, 'Engineering Block', 'BLD-ENG-01', 'ACADEMIC', 4, 900, 'ACTIVE', '2026-04-05 07:00:24'],
      [3, 1, 3, 'Admin Block',       'BLD-ADM-01', 'ADMIN',    2, 250, 'ACTIVE', '2026-04-05 07:00:24'],
      [4, 1, null,'Central Library', 'BLD-LIB-01', 'LIBRARY',  3, 600, 'ACTIVE', '2026-04-05 07:00:24'],
    ],
  },
  departments: {
    columns: ['department_id', 'campus_id', 'department_name', 'department_code', 'hod_name', 'created_at'],
    rows: [
      [1, 1, 'Science Faculty',    'SCI', 'Dr. Mehta',  '2026-04-05 07:00:24'],
      [2, 1, 'Engineering Faculty','ENG', 'Dr. Kapoor', '2026-04-05 07:00:24'],
      [3, 1, 'Administration',     'ADM', 'Mr. Sinha',  '2026-04-05 07:00:24'],
    ],
  },
  roles: {
    columns: ['role_id', 'role_name', 'created_at'],
    rows: [
      [1, 'Admin',   '2026-04-05 07:00:24'],
      [2, 'Analyst', '2026-04-05 07:00:24'],
      [3, 'Viewer',  '2026-04-05 07:00:24'],
    ],
  },
  users: {
    columns: ['user_id', 'role_id', 'full_name', 'email', 'password_hash', 'phone', 'status', 'created_at', 'updated_at'],
    rows: [
      [1, 1, 'Khushi Yadav', 'admin@greenaudit.edu',   '[HASHED]', '9999999991', 'ACTIVE', '2026-04-05 07:00:24', '2026-04-05 07:00:24'],
      [2, 2, 'Riya Sharma',  'analyst@greenaudit.edu', '[HASHED]', '9999999992', 'ACTIVE', '2026-04-05 07:00:24', '2026-04-05 07:00:24'],
      [3, 3, 'Aman Verma',   'viewer@greenaudit.edu',  '[HASHED]', '9999999993', 'ACTIVE', '2026-04-05 07:00:24', '2026-04-05 07:00:24'],
    ],
  },
  metric_types: {
    columns: ['metric_type_id', 'metric_name', 'unit', 'description'],
    rows: [
      [1, 'Energy Consumption', 'kWh',     'Electricity consumption'],
      [2, 'Water Usage',        'Liters',  'Water usage'],
      [3, 'Waste Diverted',     '%',       'Waste diversion percentage'],
      [4, 'Carbon Footprint',   'kgCO2e',  'Carbon emissions'],
    ],
  },
  energy_usage: {
    columns: ['energy_id', 'campus_id', 'building_id', 'recorded_by', 'usage_date', 'usage_month', 'kwh_consumed', 'peak_demand_kw', 'source_type', 'notes'],
    rows: [
      [1,  1, 1, 2, '2026-01-31', '2026-01-01', '18200.00', '145.00', 'GRID', 'Science Labs monthly reading'],
      [2,  1, 1, 2, '2026-02-28', '2026-02-01', '17650.00', '141.00', 'GRID', 'Science Labs monthly reading'],
      [3,  1, 1, 2, '2026-03-31', '2026-03-01', '18920.00', '149.00', 'GRID', 'Science Labs monthly reading'],
      [4,  1, 2, 2, '2026-01-31', '2026-01-01', '14300.00', '120.00', 'GRID', 'Engineering Block monthly reading'],
      [5,  1, 2, 2, '2026-02-28', '2026-02-01', '13950.00', '116.00', 'GRID', 'Engineering Block monthly reading'],
      [6,  1, 2, 2, '2026-03-31', '2026-03-01', '14780.00', '123.00', 'GRID', 'Engineering Block monthly reading'],
      [7,  1, 3, 2, '2026-01-31', '2026-01-01',  '4100.00',  '38.00', 'GRID', 'Admin Block monthly reading'],
      [8,  1, 3, 2, '2026-02-28', '2026-02-01',  '3980.00',  '36.00', 'GRID', 'Admin Block monthly reading'],
      [9,  1, 3, 2, '2026-03-31', '2026-03-01',  '4240.00',  '39.00', 'GRID', 'Admin Block monthly reading'],
      [10, 1, 4, 2, '2026-01-31', '2026-01-01',  '9800.00',  '82.00', 'GRID', 'Library monthly reading'],
      [11, 1, 4, 2, '2026-02-28', '2026-02-01',  '9520.00',  '79.00', 'GRID', 'Library monthly reading'],
      [12, 1, 4, 2, '2026-03-31', '2026-03-01', '10120.00',  '85.00', 'GRID', 'Library monthly reading'],
    ],
  },
  water_usage: {
    columns: ['water_id', 'campus_id', 'building_id', 'recorded_by', 'usage_date', 'usage_month', 'liters_consumed', 'recycled_liters', 'source_type', 'notes'],
    rows: [
      [1,  1, 1, 2, '2026-01-31', '2026-01-01', '280000.00', '25000.00', 'MUNICIPAL', 'Science Labs water record'],
      [2,  1, 1, 2, '2026-02-28', '2026-02-01', '265000.00', '22000.00', 'MUNICIPAL', 'Science Labs water record'],
      [3,  1, 1, 2, '2026-03-31', '2026-03-01', '295000.00', '27000.00', 'MUNICIPAL', 'Science Labs water record'],
      [4,  1, 2, 2, '2026-01-31', '2026-01-01', '210000.00', '18000.00', 'MUNICIPAL', 'Engineering Block water record'],
      [5,  1, 2, 2, '2026-02-28', '2026-02-01', '202000.00', '17500.00', 'MUNICIPAL', 'Engineering Block water record'],
      [6,  1, 2, 2, '2026-03-31', '2026-03-01', '218000.00', '19000.00', 'MUNICIPAL', 'Engineering Block water record'],
      [7,  1, 3, 2, '2026-01-31', '2026-01-01',  '52000.00',  '4000.00', 'MUNICIPAL', 'Admin Block water record'],
      [8,  1, 3, 2, '2026-02-28', '2026-02-01',  '50000.00',  '3900.00', 'MUNICIPAL', 'Admin Block water record'],
      [9,  1, 3, 2, '2026-03-31', '2026-03-01',  '54000.00',  '4100.00', 'MUNICIPAL', 'Admin Block water record'],
      [10, 1, 4, 2, '2026-01-31', '2026-01-01', '112000.00',  '8000.00', 'MUNICIPAL', 'Library water record'],
      [11, 1, 4, 2, '2026-02-28', '2026-02-01', '108000.00',  '7600.00', 'MUNICIPAL', 'Library water record'],
      [12, 1, 4, 2, '2026-03-31', '2026-03-01', '115000.00',  '8400.00', 'MUNICIPAL', 'Library water record'],
    ],
  },
  waste_records: {
    columns: ['waste_id', 'campus_id', 'building_id', 'recorded_by', 'record_date', 'record_month', 'waste_generated_kg', 'waste_recycled_kg', 'waste_diverted_percent', 'waste_type', 'notes'],
    rows: [
      [1,  1, 1, 2, '2026-01-31', '2026-01-01', '1200.00',  '930.00', '77.50', 'MIXED', 'Science Labs waste'],
      [2,  1, 1, 2, '2026-02-28', '2026-02-01', '1140.00',  '900.00', '78.95', 'MIXED', 'Science Labs waste'],
      [3,  1, 1, 2, '2026-03-31', '2026-03-01', '1260.00', '1010.00', '80.16', 'MIXED', 'Science Labs waste'],
      [4,  1, 2, 2, '2026-01-31', '2026-01-01',  '980.00',  '790.00', '80.61', 'MIXED', 'Engineering waste'],
      [5,  1, 2, 2, '2026-02-28', '2026-02-01',  '940.00',  '760.00', '80.85', 'MIXED', 'Engineering waste'],
      [6,  1, 2, 2, '2026-03-31', '2026-03-01', '1015.00',  '835.00', '82.27', 'MIXED', 'Engineering waste'],
      [7,  1, 3, 2, '2026-01-31', '2026-01-01',  '220.00',  '175.00', '79.55', 'PAPER', 'Admin waste'],
      [8,  1, 3, 2, '2026-02-28', '2026-02-01',  '210.00',  '168.00', '80.00', 'PAPER', 'Admin waste'],
      [9,  1, 3, 2, '2026-03-31', '2026-03-01',  '230.00',  '186.00', '80.87', 'PAPER', 'Admin waste'],
      [10, 1, 4, 2, '2026-01-31', '2026-01-01',  '460.00',  '360.00', '78.26', 'PAPER', 'Library waste'],
      [11, 1, 4, 2, '2026-02-28', '2026-02-01',  '440.00',  '350.00', '79.55', 'PAPER', 'Library waste'],
      [12, 1, 4, 2, '2026-03-31', '2026-03-01',  '475.00',  '390.00', '82.11', 'PAPER', 'Library waste'],
    ],
  },
  carbon_emissions: {
    columns: ['emission_id', 'campus_id', 'building_id', 'emission_date', 'emission_month', 'energy_emission_kgco2', 'water_emission_kgco2', 'waste_emission_kgco2', 'transport_emission_kgco2', 'total_emission_kgco2'],
    rows: [
      [1,  1, 1, '2026-01-31', '2026-01-01', '210.000', '18.200', '14.000', '12.000', '254.200'],
      [2,  1, 1, '2026-02-28', '2026-02-01', '204.100', '17.600', '13.200', '11.500', '246.400'],
      [3,  1, 1, '2026-03-31', '2026-03-01', '221.800', '19.300', '14.800', '12.700', '268.600'],
      [4,  1, 2, '2026-01-31', '2026-01-01', '166.000', '13.800', '10.900', '11.200', '201.900'],
      [5,  1, 2, '2026-02-28', '2026-02-01', '160.200', '13.100', '10.400', '10.800', '194.500'],
      [6,  1, 2, '2026-03-31', '2026-03-01', '171.100', '14.200', '11.300', '11.600', '208.200'],
      [7,  1, 3, '2026-01-31', '2026-01-01',  '48.000',  '3.200',  '2.100',  '1.800',  '55.100'],
      [8,  1, 3, '2026-02-28', '2026-02-01',  '46.200',  '3.000',  '2.000',  '1.700',  '52.900'],
      [9,  1, 3, '2026-03-31', '2026-03-01',  '50.600',  '3.300',  '2.200',  '1.900',  '58.000'],
      [10, 1, 4, '2026-01-31', '2026-01-01', '112.000',  '7.600',  '5.000',  '3.800', '128.400'],
      [11, 1, 4, '2026-02-28', '2026-02-01', '108.200',  '7.300',  '4.900',  '3.600', '124.000'],
      [12, 1, 4, '2026-03-31', '2026-03-01', '116.400',  '7.900',  '5.300',  '4.100', '133.700'],
    ],
  },
  ai_predictions: {
    columns: ['prediction_id', 'campus_id', 'building_id', 'metric_type_id', 'prediction_for_month', 'predicted_value', 'confidence_score', 'model_name', 'generated_at', 'status'],
    rows: [
      [1, 1, 1, 1, '2026-04-01', '19150.00', '91.40', 'LSTM_Energy_v1',    '2026-04-05 07:00:24', 'GENERATED'],
      [2, 1, 2, 1, '2026-04-01', '14920.00', '89.60', 'LSTM_Energy_v1',    '2026-04-05 07:00:24', 'GENERATED'],
      [3, 1, 1, 2, '2026-04-01','301000.00', '88.20', 'WaterForecast_v1',  '2026-04-05 07:00:24', 'GENERATED'],
      [4, 1, 2, 2, '2026-04-01','221500.00', '87.90', 'WaterForecast_v1',  '2026-04-05 07:00:24', 'GENERATED'],
      [5, 1, 1, 4, '2026-04-01',   '272.00', '90.30', 'CarbonPredict_v2',  '2026-04-05 07:00:24', 'GENERATED'],
      [6, 1, 2, 4, '2026-04-01',   '211.00', '89.10', 'CarbonPredict_v2',  '2026-04-05 07:00:24', 'GENERATED'],
    ],
  },
  ai_recommendations: {
    columns: ['recommendation_id', 'campus_id', 'building_id', 'related_metric_type_id', 'priority_level', 'recommendation_title', 'recommendation_text', 'estimated_impact', 'action_plan', 'recommendation_status', 'generated_on'],
    rows: [
      [1, 1, 1, 1, 'HIGH',   'Deep energy audit for Science Labs',          'Conduct a deep energy audit of the Science Labs to identify HVAC inefficiencies and implement smart scheduling for high-drain lab equipment.', 'Reduce campus energy expenditure by 12% and improve efficiency score.', 'Audit HVAC, install timers, review peak-hour usage.', 'OPEN',        '2026-03-31'],
      [2, 1, 2, 2, 'MEDIUM', 'Optimize water recycling in Engineering Block','Increase recycled water reuse for washrooms and cooling systems in the Engineering Block.',                                                      'Can save 8-10% water monthly.',                                       'Upgrade recycled water line and install monitoring valves.', 'IN_PROGRESS', '2026-03-31'],
      [3, 1, 4, 3, 'MEDIUM', 'Improve paper recycling in Library',           'Improve paper waste segregation and deploy labeled disposal bins inside library zones.',                                                           'Waste diverted percentage may improve by 5%.',                        'Place bins, run awareness drive, weekly monitoring.', 'OPEN',        '2026-03-31'],
      [4, 1, 3, 4, 'LOW',    'Reduce idle power consumption in Admin Block', 'Encourage shutdown policies for printers, PCs and lighting after office hours.',                                                                    'Could reduce carbon footprint by 3-4%.',                              'Add shutdown checklist and occupancy sensors.',  'OPEN',        '2026-03-31'],
    ],
  },
  reports: {
    columns: ['report_id', 'campus_id', 'generated_by', 'report_name', 'report_type', 'file_path', 'date_from', 'date_to', 'generated_at'],
    rows: [
      [1, 1, 1, 'Campus Sustainability Overview Q1 2026', 'OVERVIEW',    '/reports/overview_q1_2026.pdf',       '2026-01-01', '2026-03-31', '2026-04-05 07:00:24'],
      [2, 1, 1, 'Energy Analysis March 2026',             'ENERGY',      '/reports/energy_march_2026.pdf',      '2026-03-01', '2026-03-31', '2026-04-05 07:00:24'],
      [3, 1, 1, 'Water and Waste Summary Q1 2026',        'WATER_WASTE', '/reports/water_waste_q1_2026.pdf',    '2026-01-01', '2026-03-31', '2026-04-05 07:00:24'],
      [4, 1, 1, 'AI Prediction Summary April 2026',       'AI_SUMMARY',  '/reports/ai_summary_april_2026.pdf',  '2026-04-01', '2026-04-30', '2026-04-05 07:00:24'],
    ],
  },
  survey_responses: {
    columns: ['survey_id', 'campus_id', 'department_id', 'building_id', 'response_month', 'respondent_type', 'food_type_id', 'housing_type_id', 'transportation_mode_id', 'recycling_habit_id', 'clothing_spend', 'energy_kwh', 'water_liters_day', 'consumption_spend', 'carbon_kgco2'],
    rows: [
      [9,  1, 1,    1,    '2026-01-01', 'STUDENT', 2, 2, 3, 1, '1360.00', '478.00', '277.00', '4136.00',  '369.630'],
      [10, 1, 2,    2,    '2026-01-01', 'FACULTY', 3, 1, 2, 4, '4272.00',  '69.00', '151.00', '4318.00',  '158.860'],
      [11, 1, 2,    2,    '2026-02-01', 'STUDENT', 1, 4, 4, 2, '3592.00', '322.00', '124.00', '3782.00',  '357.030'],
      [12, 1, 3,    3,    '2026-02-01', 'STAFF',   4, 3, 1, 1,  '966.00', '168.00', '466.00', '8657.00',  '247.745'],
      [13, 1, 1,    1,    '2026-03-01', 'STUDENT', 2, 2, 4, 2, '4926.00', '120.00', '495.00', '5920.00',  '218.610'],
      [14, 1, null, 4,    '2026-03-01', 'STUDENT', 1, 1, 1, 1, '2100.00', '240.00', '220.00', '5000.00',  '190.220'],
      [15, 1, 2,    2,    '2026-03-01', 'FACULTY', 2, 3, 3, 2, '3100.00', '280.00', '180.00', '4600.00',  '205.450'],
      [16, 1, 1,    1,    '2026-03-01', 'STUDENT', 3, 1, 2, 3, '1800.00', '150.00', '130.00', '3900.00',  '145.330'],
    ],
  },
  food_types: {
    columns: ['food_type_id', 'food_type_name'],
    rows: [[1,'Vegetarian'],[2,'Non-Vegetarian'],[3,'Vegan'],[4,'Mixed']],
  },
  housing_types: {
    columns: ['housing_type_id', 'housing_type_name'],
    rows: [[1,'Hostel'],[2,'Apartment'],[3,'Own House'],[4,'Shared Housing']],
  },
  transportation_modes: {
    columns: ['transportation_mode_id', 'transportation_mode_name'],
    rows: [[1,'Walking'],[2,'Bicycle'],[3,'Public Transport'],[4,'Car']],
  },
  recycling_habits: {
    columns: ['recycling_habit_id', 'recycling_habit_name'],
    rows: [[1,'Always'],[2,'Sometimes'],[3,'Rarely'],[4,'Never']],
  },
  vw_campus_overview: {
    columns: ['campus_id', 'campus_name', 'total_energy_kwh', 'total_water_liters', 'avg_waste_diverted_percent', 'total_carbon_kgco2'],
    rows: [
      [1, 'GreenAudit Main Campus', '541920.00', '19404000.00', '80.18', '75672.00'],
    ],
  },
};

// Table grouping for sidebar
const TABLE_GROUPS = [
  { label: 'Infrastructure', tables: ['campuses', 'buildings', 'departments'] },
  { label: 'Access Control', tables: ['roles', 'users'] },
  { label: 'Metrics',        tables: ['metric_types', 'energy_usage', 'water_usage', 'waste_records', 'carbon_emissions'] },
  { label: 'AI & Reports',   tables: ['ai_predictions', 'ai_recommendations', 'reports'] },
  { label: 'Survey Data',    tables: ['survey_responses', 'food_types', 'housing_types', 'transportation_modes', 'recycling_habits'] },
  { label: 'Views',          tables: ['vw_campus_overview'] },
];

// Cell colour hints
const cellClass = (val: string | number | null): string => {
  if (val === null) return 'text-slate-400 italic';
  if (val === 'ACTIVE' || val === 'GENERATED' || val === 'OPEN') return 'text-emerald-600 font-medium';
  if (val === 'IN_PROGRESS') return 'text-blue-600 font-medium';
  if (val === 'HIGH' || val === 'CRITICAL') return 'text-red-500 font-semibold';
  if (val === 'MEDIUM') return 'text-amber-500 font-medium';
  if (val === 'LOW') return 'text-slate-500';
  return 'text-slate-700';
};

const DatabaseViewer: React.FC = () => {
  const [activeTable, setActiveTable] = useState<string>('campuses');
  const [search, setSearch] = useState('');

  const tableData = DB_TABLES[activeTable];
  const totalTables = Object.keys(DB_TABLES).length;
  const totalRows = Object.values(DB_TABLES).reduce((a, t) => a + t.rows.length, 0);

  const filteredRows = tableData.rows.filter(row =>
    row.some(cell => String(cell ?? 'NULL').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900">
        <Database className="w-5 h-5 text-emerald-400" />
        <div>
          <h3 className="text-white font-bold text-sm tracking-wide">greenaudit — MySQL 8.0.41</h3>
          <p className="text-slate-500 text-xs">Dump20260405.sql &nbsp;·&nbsp; {totalTables} tables &nbsp;·&nbsp; {totalRows} total rows</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter rows…"
            className="bg-transparent text-slate-300 text-xs outline-none w-32 placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex" style={{ minHeight: '480px' }}>
        {/* Sidebar */}
        <aside className="w-56 border-r border-slate-800 bg-slate-900 overflow-y-auto shrink-0">
          {TABLE_GROUPS.map(group => (
            <div key={group.label} className="pt-4 pb-2">
              <p className="px-4 mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{group.label}</p>
              {group.tables.map(tbl => (
                <button
                  key={tbl}
                  onClick={() => { setActiveTable(tbl); setSearch(''); }}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-left text-xs transition-colors ${
                    activeTable === tbl
                      ? 'bg-emerald-900/40 text-emerald-400 font-semibold border-r-2 border-emerald-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Table2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tbl}</span>
                  <span className="ml-auto text-[10px] text-slate-600">{DB_TABLES[tbl].rows.length}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Table viewer */}
        <div className="flex-1 overflow-auto">
          {/* Table title bar */}
          <div className="sticky top-0 z-10 flex items-center gap-2 px-5 py-3 bg-slate-900 border-b border-slate-800">
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-mono text-sm font-semibold">SELECT * FROM</span>
            <span className="text-white font-mono text-sm">`{activeTable}`</span>
            <span className="ml-auto text-xs text-slate-500">
              {filteredRows.length} / {tableData.rows.length} rows &nbsp;·&nbsp; {tableData.columns.length} columns
            </span>
          </div>

          {/* Data grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/60">
                  <th className="sticky left-0 bg-slate-800/80 text-slate-500 font-semibold px-3 py-2.5 text-right border-r border-slate-700 w-8 select-none">#</th>
                  {tableData.columns.map(col => (
                    <th key={col} className="text-left px-4 py-2.5 text-slate-300 font-semibold whitespace-nowrap border-b border-slate-700/50 font-mono">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={tableData.columns.length + 1} className="text-center py-10 text-slate-500 italic text-sm">
                      No rows match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={`border-b border-slate-800/60 transition-colors ${
                        ri % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
                      } hover:bg-emerald-900/10`}
                    >
                      <td className="sticky left-0 bg-inherit text-slate-600 px-3 py-2 text-right border-r border-slate-800 font-mono select-none">
                        {ri + 1}
                      </td>
                      {row.map((cell, ci) => (
                        <td key={ci} className={`px-4 py-2 whitespace-nowrap font-mono ${cellClass(cell)}`}>
                          {cell === null ? 'NULL' : String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;
