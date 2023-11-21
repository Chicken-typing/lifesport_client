import React from 'react';
import { KaImage, Link } from '@components/primitive';
import Background from '@svg/bg-home-new.svg';

function Success() {
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
