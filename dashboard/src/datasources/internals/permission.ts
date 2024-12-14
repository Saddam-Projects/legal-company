const permissionAction = {
  ADD: 'ADD' as const,
  UPDATE: 'UPDATE' as const,
  DELETE: 'DELETE' as const,
  VIEW: 'VIEW' as const,
  EXPORT: 'EXPORT' as const,
  IMPORT: 'IMPORT' as const,
  FILTER: 'FILTER' as const,
  VIEW_DETAIL: 'VIEW_DETAIL' as const,
  APPROVE: 'APPROVE' as const,
  REJECT: 'REJECT' as const,
};

const resources = {
  ACCOUNT: 'ACCOUNT' as const,
  ROLE: 'ROLE' as const,
  PERMISSION: 'PERMISSION' as const,
  COMPANY: 'COMPANY' as const,
  COMPANY_BRANCH: 'COMPANY_BRANCH' as const,
  EMPLOYEE: 'EMPLOYEE' as const,
  ATTENDENCE: 'ATTENDENCE' as const,
  CONSULT: 'CONSULT' as const,
  DEPARTMENT: 'DEPARTMENT' as const,
  DIVISION: 'DIVISION' as const,
  PAYROLL: 'PAYROLL' as const,
  INSURANCE: 'INSURANCE' as const,
  CANDIDATE: 'CANDIDATE' as const,
  COMPANY_POLICY: 'COMPANY_POLICY' as const,
  SETTING: 'SETTING' as const,
  'SETTING.TAX': 'SETTING.TAX' as const,
  'SETTING.EMPLOYMENT_TYPE': 'SETTING.EMPLOYMENT_TYPE' as const,
  'SETTING.OVERTIME': 'SETTING.OVERTIME' as const,
  'SETTING.LEAVE_RULE': 'SETTING.LEAVE_RULE' as const,
  'SETTING.COMPENSATION_RULE': 'SETTING.COMPENSATION_RULE' as const,
  'SETTING.RETIREMENT_PLAN': 'SETTING.RETIREMENT_PLAN' as const,
  'SETTING.BENEFIT': 'SETTING.BENEFIT' as const,
  'SETTING.PAYOUT': 'SETTING.PAYOUT' as const,
  'SETTING.DEVELOPMENT': 'SETTING.DEVELOPMENT' as const,
};

export default {
  permissionAction,
  resources,
};
