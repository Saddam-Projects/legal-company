'use client';

import HeaderContentComponent from '@/components/HeaderContent';
import ServiceForm from '@/components/service/form';
import { SERVICE_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { ServiceTerm } from '@/entity/Service';
import useNavigateTo from '@/hooks/useNavigateTo';
import { serviceSchema } from '@/schema/service';
import serviceService from '@/services/service.service';
import { useParams } from 'next/navigation';
import { z } from 'zod';

export default function UpdateServicePage() {
  const meta = {
    title: 'service',
    resourceName: permission.resources.EMPLOYEE,
    description: 'update service',
  };
  const navigate = useNavigateTo();
  const id = useParams().id;
  const service = serviceService.getService(id as string);
  const submit = (values: z.infer<typeof serviceSchema>, terms: ServiceTerm[]) => {
    const formData = new FormData();

    formData.append('service_name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    if (values.file) formData.append('file', values.file);

    formData.append('terms', terms.map((term) => term.term_name).join(','));

    if (service.service) {
      serviceService.updateService(
        service.service.id,
        formData,
        (loading) => service.setLoading(loading),
        (error) => service.setError(error),
        () => navigate(SERVICE_URL)
      );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ServiceForm submit={submit} service={service.service} />
      </div>
    </div>
  );
}
