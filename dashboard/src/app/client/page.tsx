'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { ClientLogo } from '@/entity/ClientLogo';
import useNavigateTo from '@/hooks/useNavigateTo';
import clientService from '@/services/client.service';
import { BASE_API_URL } from '@/utils/constant';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export default function ClientPage() {
  const meta = {
    title: 'Client',
    resourceName: permission.resources.EMPLOYEE,
    description: "client's list",
  };

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState('');

  const serviceClient = clientService.getClients(limit, offset, keyword);

  const [modalDelete, setModalDelete] = useState(false);
  const [clientActive, setClientActive] = useState<ClientLogo | null>(null);

  const onDeleteHandler = () => {
    if (clientActive) {
      clientService.deleteClient(
        clientActive,
        (error) => serviceClient.setError(error),
        (loading) => serviceClient.setLoading(loading),
        () => serviceClient.fetch()
      );
    }

    setClientActive(null);
    setModalDelete(false);
  };
  const onUpdateHandler = () => {};
  const openModalDelete = (client: ClientLogo) => {
    setModalDelete(true);
    setClientActive(client);
  };
  const onCreateHandler = () => {};

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
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {serviceClient.clients.map((client, index) => (
            <Card key={index}>
              <CardContent className=" dark:bg-light rounded-sm flex flex-col items-center p-0 h-[200px]">
                <div className="ml-auto p-2 flex space-x-2">
                  <Trash2Icon onClick={() => openModalDelete(client)} className="text-red-hris cursor-pointer" />
                  <PencilIcon className="text-blue-hris cursor-pointer" />
                </div>
                <img className="w-full h-full object-cover" alt="Page Not Found" src={`${BASE_API_URL}/${client.image}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ModalConfirmationComponent open={modalDelete} cancel={() => setModalDelete(false)} submit={onDeleteHandler} />
    </div>
  );
}
