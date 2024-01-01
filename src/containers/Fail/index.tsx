import { KaImage, Link } from '@components/primitive';
function Fail() {
  return (
    <div className="content-success">
      <KaImage objectFit="contain" src="/images/fail-payment.png" />
      <Link className="button" title="" href="/">
        Back to Home
      </Link>
    </div>
  );
}

export default Fail;
