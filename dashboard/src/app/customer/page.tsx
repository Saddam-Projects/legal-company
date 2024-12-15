'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import { CustomerTable } from '@/components/customer/table';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { Customer } from '@/entity/Customer';
import useNavigateTo from '@/hooks/useNavigateTo';
import customerService from '@/services/customer.service';
import { useState } from 'react';

export default function CustomerPage() {
  const meta = {
    title: 'customer',
    resourceName: permission.resources.EMPLOYEE,
    description: "customer's list",
  };

  const [onReload, setOnReload] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigateTo();

  const onDeleteHandler = () => {
    if (customer) {
      customerService.deleteCustomer(
        customer,
        (error) => setError(error),
        (loading) => {
          setLoading(loading);
        },
        () => {
          console.log('customer deleted');
          setOnReload(true);
        }
      );
    }
    setIsModalDeleteOpen(false);
  };
  const onUpdateHandler = (customer: Customer) => {
    navigate(`${CUSTOMER_URL}/${customer.id}/update`);
  };
  const openModalDelete = (customer: Customer) => {
    setIsModalDeleteOpen(true);
    setCustomer(customer);
  };

  return (
    <div className="grid gap-6 grid-cols-1">
      <HeaderContentComponent title={meta.title} description={meta.description} />

      <div className="flex items-center">
        <div className="flex space-x-2 items-center">
          <ButtonActionComponent buttonType={permission.permissionAction.ADD} currentResource={meta.resourceName} onClick={() => navigate(`${CUSTOMER_URL}/create`)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CustomerTable onDelete={openModalDelete} onUpdate={onUpdateHandler} reload={onReload} onReload={(reload) => setOnReload(reload)} />
      </div>

      <ModalConfirmationComponent cancel={() => setIsModalDeleteOpen(false)} open={isModalDeleteOpen} submit={onDeleteHandler} />
    </div>
  );
}
