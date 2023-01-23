import { PageProps } from 'app/PageProps';
import { use } from 'react';

export default function Layout({ children,  params }: PageProps) {

  return (
    <div className="space-y-9">
      <div className="space-y-4">
        <div className="text-xl font-medium text-zinc-500">{params.action}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
