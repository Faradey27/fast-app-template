import { Link } from '../../server/routes';


interface ILinkWrapProps {
  href: string;
  children: any;
}

export default ({ href, children }: ILinkWrapProps ) => {
  return (
    <Link prefetch route={href}>
      <a>{children}</a>
    </Link>
  );
};
