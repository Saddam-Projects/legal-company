'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import { CustomerTable } from '@/components/customer/table';
import HeaderContentComponent from '@/components/HeaderContent';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import useNavigateTo from '@/hooks/useNavigateTo';
import bannerService from '@/services/banner.service';
import galleryService from '@/services/gallery.service';
import { BASE_API_URL } from '@/utils/constant';
import { DUMMY_LOGO } from '@/utils/images';
import Image from 'next/image';
import { useState } from 'react';

export default function GalleryPage() {
  const meta = {
    title: 'gallery ',
    resourceName: permission.resources.EMPLOYEE,
    description: "gallery's list",
  };

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState('');

  const galleryBanner = galleryService.getGalleries(limit, offset, keyword);

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
          {galleryBanner.galleries.map((gallery, index) => (
            <Card key={index}>
              <CardContent className=" dark:bg-light rounded-sm flex justify-center p-0">
                <Image width={240} height={240} alt="Page Not Found" src={`${BASE_API_URL}/${gallery.image}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
