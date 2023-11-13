import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

function FacebookMsg() {
  return (
    <FacebookProvider appId="323024230475710" chatSupport>
      <CustomChat pageId="171581632701580" minimized={false} />
    </FacebookProvider>
  );
}

export default FacebookMsg;
