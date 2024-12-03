import permission from '@/datasources/internals/permission';

type PermissionAction = keyof typeof permission.permissionAction;

export default PermissionAction;
