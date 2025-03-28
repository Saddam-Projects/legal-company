'use client';

import { BlogTable } from '@/components/blog/table';
import ButtonActionComponent from '@/components/ButtonAction';
import DialogErrorComponent from '@/components/DialogError';
import HeaderContentComponent from '@/components/HeaderContent';
import ModalConfirmationComponent from '@/components/ModalConfirmation';
import { BLOG_URL } from '@/datasources/internals/menus';
import permission from '@/datasources/internals/permission';
import { Blog } from '@/entity/Blog';
import useNavigateTo from '@/hooks/useNavigateTo';
import blogService from '@/services/blog.service';
import { useState } from 'react';

export default function BlogPage() {
  const meta = {
    title: 'Blog',
    resourceName: permission.resources.EMPLOYEE,
    description: "blog's list",
  };

  const [modalDelete, setModalDelete] = useState(false);
  const [blogActive, setBlogActive] = useState<Blog | null>(null);
  const navigate = useNavigateTo();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onDeleteHandler = () => {
    if (blogActive) {
      blogService.deleteBlog(
        blogActive,
        (error) => setError(error),
        (loading) => setLoading(loading),
        () => {
          setOnReload(true);
        }
      );
    }

    setBlogActive(null);
    setModalDelete(false);
  };

  const [onReload, setOnReload] = useState(false);

  const openModalDelete = (blog: Blog) => {
    setModalDelete(true);
    setBlogActive(blog);
  };

  const onUpdateHandler = (blog: Blog) => {
    navigate(`${BLOG_URL}/${blog.id}/update`);
  };

  return (
    <div className="grid gap-6 grid-cols-1">
      <HeaderContentComponent title={meta.title} description={meta.description} />

      <div className="flex items-center">
        <div className="flex space-x-2 items-center">
          <ButtonActionComponent buttonType={permission.permissionAction.ADD} currentResource={meta.resourceName} onClick={() => navigate(`${BLOG_URL}/create`)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <BlogTable onDelete={openModalDelete} onUpdate={onUpdateHandler} reload={onReload} onReload={(reload: boolean) => setOnReload(reload)} />
      </div>

      <ModalConfirmationComponent open={modalDelete} cancel={() => setModalDelete(false)} submit={onDeleteHandler} />
      <DialogErrorComponent active={error !== ''} onClose={() => setError('')} message={error} />
    </div>
  );
}
