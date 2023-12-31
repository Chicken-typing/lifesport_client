import { KaImage, Link } from '@components/primitive';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
function Success() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['OrderTemp']);
  }, [queryClient]);

  return (
    <div className="content-success">
      <KaImage objectFit="contain" src="/images/payment1.jpg" />
      <Link className="button" title="" href="/">
        Back to Home
      </Link>
    </div>
  );
}

export default Success;
