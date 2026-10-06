import { GetStaticPaths, GetStaticProps } from 'next';
import { servicesES, LocalizedService } from '../../../lib/services-i18n';
import LocalizedServicePage from '../../../components/LocalizedServicePage';

interface Props {
  service: LocalizedService;
  otherServices: LocalizedService[];
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: servicesES.map((s) => ({ params: { slug: s.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = servicesES.find((s) => s.slug === slug);
  if (!service) return { notFound: true };
  return {
    props: { service, otherServices: servicesES.filter((s) => s.slug !== slug) },
    revalidate: 86400,
  };
};

export default function ServiceES({ service, otherServices }: Props) {
  return <LocalizedServicePage locale="es" service={service} otherServices={otherServices} />;
}
