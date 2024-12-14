import { MouseEvent } from 'react';
import PermissionResource from '../states/permissionResourceInterface';
import PermissionAction from '../states/permissionActionInterface';

export default interface ButtonActionInterface {
  onClick: (e: MouseEvent) => void;
  currentResource: PermissionResource;
  buttonType: PermissionAction;
}
