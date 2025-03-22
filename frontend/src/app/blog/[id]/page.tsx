import { validate } from 'uuid';
import { Blog } from '@/entity/Blog';
import { getBlog, getBlogBySlug } from '@/actions/blog';
import BlogComponent from '@/components/BlogComponent';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  let blog: Blog | null = null;

  const isUuid = validate(id);

  if (isUuid) {
    blog = await getBlog(id);
  }
  if (!isUuid) {
    blog = await getBlogBySlug(id);
  }
  const data = {
    title: '',
    description: '',
    keywords: '',
  };

  if (blog) {
    data.title = blog.title;
    data.description = blog.description;
    data.keywords = blog.keywords;
  }

  return data;
}

export default function BlogPage() {
  return <BlogComponent />;
}
