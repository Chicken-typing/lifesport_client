import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

function FacebookMsg() {
  return (
    <FacebookProvider appId="832579561994705" chatSupport>
      <CustomChat pageId="107599875679349" minimized={false} />
    </FacebookProvider>
  );
}

export default FacebookMsg;
