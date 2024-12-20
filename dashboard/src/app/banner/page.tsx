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
import fileUploaodService from '@/services/fileupload.service';
import { BANNER_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';
import { DUMMY_LOGO } from '@/utils/images';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { PencilIcon, PenIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

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
  const openModalDelete = (banner: Banner) => {
    setModalDelete(true);
    setBannerActive(banner);
  };

  const fileRef = useRef<HTMLInputElement>(null);

  const clickImage = (banner?: Banner) => {
    if (banner) {
      setBannerActive(banner);
    }
    fileRef.current?.click();
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const newBanner = new FormData();
      newBanner.append('file', file);

      fileUploaodService.fileUpload(
        newBanner,
        BANNER_PATH,
        (loading) => serviceBanner.setLoading(loading),
        (error) => serviceBanner.setError(error),
        () => serviceBanner.fetch(),
        bannerActive ? bannerActive.id : undefined
      );

      e.target.value = '';
      setBannerActive(null);
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1">
      <HeaderContentComponent title={meta.title} description={meta.description} />
      <div className="flex items-center">
        <div className="flex space-x-2 items-center">
          <ButtonActionComponent buttonType={permission.permissionAction.ADD} currentResource={meta.resourceName} onClick={() => clickImage()} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {serviceBanner.banners.map((banner, index) => (
            <Card key={index}>
              <CardContent className=" dark:bg-light rounded-sm flex flex-col items-center p-0 h-[300px]">
                <div className="ml-auto p-2 flex space-x-2">
                  <Trash2Icon onClick={() => openModalDelete(banner)} className="text-red-hris cursor-pointer" />
                  <PencilIcon onClick={() => clickImage(banner)} className="text-blue-hris cursor-pointer" />
                </div>
                <img className="w-[100%] h-[80%] object-contain" alt="Page Not Found" src={`${BASE_API_URL}/${banner.image}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <input className="hidden" ref={fileRef} type="file" onChange={(e) => onChangeImage(e)} />
      <ModalConfirmationComponent open={modalDelete} cancel={() => setModalDelete(false)} submit={onDeleteHandler} />
    </div>
  );
}
