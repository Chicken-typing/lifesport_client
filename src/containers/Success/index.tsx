import React from 'react';
import { Link } from '@components/primitive';
import Background from '@svg/bg-home-new.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import KsLayout from '@/layout';
function Success() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['OrderTemp']);
  }, [queryClient]);

  return (
    <KsLayout title="Success">
      <div style={{ marginBottom: '50px' }} className="content-success">
        <Background />

        <Link className="button" title="" href="/">
          Back to Home
        </Link>
      </div>
    </KsLayout>
  );
}

export default Success;
