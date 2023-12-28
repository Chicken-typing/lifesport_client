import React from 'react';
import { Button, KaImage, Link } from '@components/primitive';
import Background from '@svg/bg-home-new.svg';
import { useQueryClient } from '@tanstack/react-query';

function Success() {
  const queryClient = useQueryClient();
  const handleFetch = () => {
    queryClient.invalidateQueries(['OrderTemp']);
  };
  return (
    <div className="content-success">
      <Background />
      <Button onClick={handleFetch}>
        <Link className="button" title="" href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}

export default Success;
