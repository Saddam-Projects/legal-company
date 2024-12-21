'use client';

import DialogErrorComponent from '@/components/DialogError';
import HeaderContentComponent from '@/components/HeaderContent';
import ReferenceForm from '@/components/reference/form';
import permission from '@/datasources/internals/permission';
import { referenceSchema } from '@/schema/reference';
import referenceService from '@/services/refernce.service';
import { z } from 'zod';

export default function SettingReferencePage() {
  const meta = {
    title: 'setting reference',
    resourceName: permission.resources.EMPLOYEE,
    description: 'setting reference',
  };
  const reference = referenceService.getReference();
  const submit = (values: z.infer<typeof referenceSchema>) => {
    const currentRef = new FormData();
    const id = reference.reference?.id ?? '';

    currentRef.append('company_name', values.company_name);
    currentRef.append('company_email', values.company_email);
    currentRef.append('company_phone', values.company_phone);
    if (values.file) currentRef.append('file', values.file);
    currentRef.append('address', values.address);
    currentRef.append('address_lat', values.address_lat ?? '');
    currentRef.append('address_long', values.address_long ?? '');

    referenceService.updateReference(
      id,
      currentRef,
      (loading) => reference.setLoading(loading),
      (error) => reference.setError(error),
      () => reference.fetch()
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ReferenceForm submit={submit} reference={reference.reference} />
      </div>

      <DialogErrorComponent active={reference.error !== ''} onClose={() => reference.setError('')} message={reference.error} />
    </div>
  );
}
