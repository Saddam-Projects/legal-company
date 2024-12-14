import permission from '@/datasources/internals/permission';

type PermissionResource = keyof typeof permission.resources;

export default PermissionResource;
