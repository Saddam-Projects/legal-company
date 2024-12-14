'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import { CustomerTable } from '@/components/customer/table';
import HeaderContentComponent from '@/components/HeaderContent';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import useNavigateTo from '@/hooks/useNavigateTo';

export default function CustomerPage() {
  const meta = {
    title: 'customer',
    resourceName: permission.resources.EMPLOYEE,
    description: "customer's list",
  };

  const navigate = useNavigateTo();

  return (
    <div className="grid gap-6 grid-cols-1">
      <HeaderContentComponent title={meta.title} description={meta.description} />

      <div className="flex items-center">
        <div className="flex space-x-2 items-center">
          <ButtonActionComponent buttonType={permission.permissionAction.ADD} currentResource={meta.resourceName} onClick={() => navigate(CUSTOMER_URL)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CustomerTable />
      </div>
    </div>
  );
}