import { KaImage, Link } from '@components/primitive';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
function Fail() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['OrderTemp']);
  }, [queryClient]);

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
