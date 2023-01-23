'use client';
import { use, useEffect, useState } from 'react';

import { SkeletonCard } from '@/ui/SkeletonCard';
import { RobotCard } from '@/ui/RobotCard';
import { PageProps } from '@/ui/PageProps';

import { z } from "zod";
import { RobotSchema } from 'models/RobotSchema';
import RobotForm from '@/ui/RobotForm';
type FormSchemaType = z.infer<typeof RobotSchema>;

type JSONResponse = {
  data?: FormSchemaType[]
  errors?: Array<{message: string}>
}

const getRobots = async (): Promise<JSONResponse>  => {
  try {
    const response = await fetch('/api/robots');
    const data = await response.json();
    return { data };
  } catch (e: any) {
    return { errors: e };
  }
};

export default function Page({ params }: PageProps) {
  const [robotsList, setList] = useState<FormSchemaType[]>([]);
  useEffect(() => { 
    getRobots().then(({ data, errors }) => {
      if (data && !errors) {
        setList(data || []);
      } else {
        console.log(errors);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const route = params.action;
  return (
    <div className="space-y-4">
      {route === 'add' && <RobotForm />}
      {route === 'list' && robotsList.length === 0 && <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>}
      {route === 'list' && robotsList.length !== 0 && <div className="grid grid-cols-3 gap-6">
        {robotsList.map((robot) => {
          return <RobotCard key={robot.id} isLoading={false} robot={robot} />;
        })}
      </div>}

    </div>
  );
}
