'use client';

import ButtonActionComponent from '@/components/ButtonAction';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { Card, CardContent } from '@/components/ui/card';
import permission from '@/datasources/internals/permission';
import { Gallery } from '@/entity/Gallery';
import useNavigateTo from '@/hooks/useNavigateTo';
import fileUploaodService from '@/services/fileupload.service';
import galleryService from '@/services/gallery.service';
import { GALLERY_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useRef, useState } from 'react';

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
  const openModalDelete = (gallery: Gallery) => {
    setModalDelete(true);
    setsetGalleryActive(gallery);
  };
  const fileRef = useRef<HTMLInputElement>(null);

  const clickImage = (gallery?: Gallery) => {
    if (gallery) {
      setsetGalleryActive(gallery);
    }
    fileRef.current?.click();
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const newGallery = new FormData();
      newGallery.append('file', file);

      fileUploaodService.fileUpload(
        newGallery,
        GALLERY_PATH,
        (loading) => galleryBanner.setLoading(loading),
        (error) => galleryBanner.setError(error),
        () => galleryBanner.fetch(),
        galleryActive ? galleryActive.id : undefined
      );

      e.target.value = '';
      setsetGalleryActive(null);
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
          {galleryBanner.galleries.map((gallery, index) => (
            <Card key={index}>
              <CardContent className=" dark:bg-light rounded-sm flex flex-col items-center p-0 h-[300px]">
                <div className="ml-auto p-2 flex space-x-2">
                  <Trash2Icon onClick={() => openModalDelete(gallery)} className="text-red-hris cursor-pointer" />
                  <PencilIcon onClick={() => clickImage(gallery)} className="text-blue-hris cursor-pointer" />
                </div>
                <img className="w-[100%] h-[80%] object-contain" alt="Page Not Found" src={`${BASE_API_URL}/${gallery.image}`} />
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
