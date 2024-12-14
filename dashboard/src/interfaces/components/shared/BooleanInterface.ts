import React from 'react';

export default interface BooleanInterface {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
