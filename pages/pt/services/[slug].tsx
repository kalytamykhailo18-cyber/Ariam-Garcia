import { GetStaticPaths, GetStaticProps } from 'next';
import { servicesPT, LocalizedService } from '../../../lib/services-i18n';
import LocalizedServicePage from '../../../components/LocalizedServicePage';

interface Props {
  service: LocalizedService;
  otherServices: LocalizedService[];
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: servicesPT.map((s) => ({ params: { slug: s.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = servicesPT.find((s) => s.slug === slug);
  if (!service) return { notFound: true };
  return {
    props: { service, otherServices: servicesPT.filter((s) => s.slug !== slug) },
    revalidate: 86400,
  };
};

export default function ServicePT({ service, otherServices }: Props) {
  return <LocalizedServicePage locale="pt" service={service} otherServices={otherServices} />;
}
