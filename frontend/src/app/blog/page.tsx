'use client';
import DialogErrorComponent from '@/components/DialogError';
import TextComponent from '@/components/Text';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useNavigateTo from '@/hooks/useNavigateTo';
import blogService from '@/services/blog.service';
import { BASE_API_URL } from '@/utils/constant';
import moment from 'moment';

export default function BlogPage() {
  const navigate = useNavigateTo();

  const latestBlog = blogService.getBlogs(1, 0);
  const serviceBlog = blogService.getBlogs(30, 1);

  return (
    <div className="grid grid-cols-1 gap-16 mt-24 container mx-auto px-4 ">
      <DialogErrorComponent active={latestBlog.error !== ''} onClose={() => latestBlog.setError('')} message="Terjadi kesalahan tidak diketahui" />

      {latestBlog.blogs.map((blog, index) => (
        <Card key={index} className="bg-white p-0 border-none h-full shadow-none grid grid-cols-1 gap-4">
          <CardHeader className="p-0">
            <div className="w-full h-full">
              <img className="object-cover rounded-lg w-full h-[400px]" src={`${BASE_API_URL}/${blog.cover}`} alt="cover" />
            </div>
          </CardHeader>
          <CardContent onClick={() => navigate(`/blog/${blog.id}`)} className="p-0 border-none bg-white outline-none w-full h-full">
            <TextComponent className="text-xl cursor-pointer font-bold text-black">{blog.title.slice(0, 50)}</TextComponent>
          </CardContent>
          <CardContent className="p-0 border-none bg-white outline-none w-full h-full flex space-x-4">
            <TextComponent className="text-lg capitalize font-bold text-gray-400">{blog.author}</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
            <TextComponent className="text-lg capitalize font-bold text-gray-400">{blog.category.name}</TextComponent>
            <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
            <TextComponent className="text-lg capitalize font-bold text-gray-400">{moment(blog.created_at).format('DD MMM YYYY')}</TextComponent>
          </CardContent>
        </Card>
      ))}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {serviceBlog.blogs.map((i, index) => (
          <Card key={index} className="bg-white  border-none h-full grid grid-cols-1 gap-4">
            <CardHeader className="p-0">
              <div className="w-full h-full">
                <img className="object-cover  w-full h-[400px]" src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?cs=srgb&dl=pexels-christian-heitz-285904-842711.jpg&fm=jpg" alt="cover" />
              </div>
            </CardHeader>
            <CardContent onClick={() => navigate(`/blog/${i.id}`)} className="py-0 px-4 border-none bg-white outline-none w-full h-full">
              <TextComponent className="text-xl text-justify cursor-pointer font-bold text-black">{i.title.slice(0, 50)}</TextComponent>
            </CardContent>
            <CardContent className="py-0 px-4 border-none mb-8 bg-white outline-none w-full h-full flex space-x-4">
              <TextComponent className="text-lg capitalize font-bold text-gray-400">{i.author}</TextComponent>
              <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
              <TextComponent className="text-lg capitalize font-bold text-gray-400">{i.category.name}</TextComponent>
              <TextComponent className="text-lg font-bold text-gray-400">-</TextComponent>
              <TextComponent className="text-lg capitalize font-bold text-gray-400">{moment(i.created_at).format('DD MMM YYYY')}</TextComponent>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
