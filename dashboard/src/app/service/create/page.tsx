'use client';

import DialogErrorComponent from '@/components/DialogError';
import HeaderContentComponent from '@/components/HeaderContent';
import ServiceForm from '@/components/service/form';
import { SERVICE_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { ServiceTerm } from '@/entity/Service';
import useNavigateTo from '@/hooks/useNavigateTo';
import { serviceSchema } from '@/schema/service';
import serviceService from '@/services/service.service';
import { useState } from 'react';
import { z } from 'zod';

export default function CreateServicePage() {
  const meta = {
    title: 'service',
    resourceName: permission.resources.EMPLOYEE,
    description: 'new service',
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigateTo();
  const submit = (values: z.infer<typeof serviceSchema>, terms: ServiceTerm[]) => {
    const formData = new FormData();

    formData.append('service_name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    if (values.file) formData.append('file', values.file);

    formData.append('terms', terms.map((term) => term.term_name).join(','));

    serviceService.createService(
      formData,
      (loading) => setLoading(loading),
      (error) => setError(error),
      () => navigate(SERVICE_URL)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ServiceForm submit={submit} service={null} />
      </div>

      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} message={error} />
    </div>
  );
}
