'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import { CustomerTable } from '@/components/customer/table';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { Banner } from '@/entity/Banner';
import useNavigateTo from '@/hooks/useNavigateTo';
import bannerService from '@/services/banner.service';
import { BASE_API_URL } from '@/utils/constant';
import { DUMMY_LOGO } from '@/utils/images';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { PencilIcon, PenIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function BannerPage() {
  const meta = {
    title: 'Banner Promo',
    resourceName: permission.resources.EMPLOYEE,
    description: "banner's list",
  };
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState('');
  const serviceBanner = bannerService.getBanners(limit, offset, keyword);

  const [modalDelete, setModalDelete] = useState(false);
  const [bannerActive, setBannerActive] = useState<Banner | null>(null);

  const onDeleteHandler = () => {
    if (bannerActive) {
      bannerService.deleteBanner(
        bannerActive,
        (error) => serviceBanner.setError(error),
        (loading) => serviceBanner.setLoading(loading),
        () => serviceBanner.fetch()
      );
    }

    setBannerActive(null);
    setModalDelete(false);
  };
  const onUpdateHandler = () => {};
  const openModalDelete = (banner: Banner) => {
    setModalDelete(true);
    setBannerActive(banner);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {serviceBanner.banners.map((banner, index) => (
            <Card key={index}>
              <CardContent className=" dark:bg-light rounded-sm flex flex-col items-center p-0 h-[200px]">
                <div className="ml-auto p-2 flex space-x-2">
                  <Trash2Icon onClick={() => openModalDelete(banner)} className="text-red-hris cursor-pointer" />
                  <PencilIcon className="text-blue-hris cursor-pointer" />
                </div>
                <img className="w-full h-full object-cover" alt="Page Not Found" src={`${BASE_API_URL}/${banner.image}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ModalConfirmationComponent open={modalDelete} cancel={() => setModalDelete(false)} submit={onDeleteHandler} />
    </div>
  );
}
