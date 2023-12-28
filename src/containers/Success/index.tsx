import React from 'react';
import { Link } from '@components/primitive';
import Background from '@svg/bg-home-new.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

function Success() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries(['OrderTemp']);

  return (
    <div className="content-success">
      <Background />

      <Link className="button" title="" href="/">
        Back to Home
      </Link>
    </div>
  );
}

export default Success;
