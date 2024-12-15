'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import { CustomerTable } from '@/components/customer/table';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { Gallery } from '@/entity/Gallery';
import useNavigateTo from '@/hooks/useNavigateTo';
import bannerService from '@/services/banner.service';
import galleryService from '@/services/gallery.service';
import { BASE_API_URL } from '@/utils/constant';
import { DUMMY_LOGO } from '@/utils/images';
import { PencilIcon, Trash2Icon } from 'lucide-react';
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
  const [modalDelete, setModalDelete] = useState(false);
  const [galleryActive, setsetGalleryActive] = useState<Gallery | null>(null);

  const onDeleteHandler = () => {
    if (galleryActive) {
      galleryService.deleteGallery(
        galleryActive,
        (error) => galleryBanner.setError(error),
        (loading) => galleryBanner.setLoading(loading),
        () => galleryBanner.fetch()
      );
    }

    setsetGalleryActive(null);
    setModalDelete(false);
  };
  const onUpdateHandler = () => {};
  const openModalDelete = (gallery: Gallery) => {
    setModalDelete(true);
    setsetGalleryActive(gallery);
  };
  const onCreateHandler = () => {};

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
              <CardContent className=" dark:bg-light rounded-sm flex flex-col items-center p-0 h-[200px]">
                <div className="ml-auto p-2 flex space-x-2">
                  <Trash2Icon onClick={() => openModalDelete(gallery)} className="text-red-hris cursor-pointer" />
                  <PencilIcon className="text-blue-hris cursor-pointer" />
                </div>
                <img className="w-full h-full object-cover" alt="Page Not Found" src={`${BASE_API_URL}/${gallery.image}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ModalConfirmationComponent open={modalDelete} cancel={() => setModalDelete(false)} submit={onDeleteHandler} />
    </div>
  );
}
