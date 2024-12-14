export const GENDER = {
  MALE: 'MALE' as const,
  FEMALE: 'FEMALE' as const,
};

export type GENDER_TYPE = keyof typeof GENDER;
