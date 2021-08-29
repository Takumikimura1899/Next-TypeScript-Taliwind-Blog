import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Post({
  postData,
}: {
  postData: { title: string; date: string; contentHtml: string };
}) {
  return (
    <Layout>
      <Head>{postData.title}</Head>
      <article>
        <h1>{postData.title}</h1>
        <div className="text-gray-500 mb-8">
          <Date dateString={postData.date} />
        </div>
        <div
          className="text-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};
