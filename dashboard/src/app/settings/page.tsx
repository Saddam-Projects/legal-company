'use client';

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
  const submit = (values: z.infer<typeof referenceSchema>) => {};

  return (
    <div className="grid grid-cols-1 gap-6">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ReferenceForm submit={submit} reference={reference.reference} />
      </div>
    </div>
  );
}
