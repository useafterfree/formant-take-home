'use client';

import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RobotSchema } from 'models/RobotSchema';
import Router from 'next/router';
type FormSchemaType = z.infer<typeof RobotSchema>;
const uiSchema = RobotSchema.omit({ id: true });

type JSONResponse = {
  data?: FormSchemaType[]
  errors?: Array<{message: string}>
}

const createRobot = async (formData: z.infer<typeof uiSchema>): Promise<JSONResponse>  => {
  try {
    const response = await fetch('/api/robots', { method: 'POST', body: JSON.stringify(formData) });
    const data = await response.json();
    Router.push('/robots/list');
    return { data };
  } catch (e: any) {
    return { errors: e };
  }

};

export default function RobotForm() {
    const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(uiSchema), // we generate id on the api
  });
  const router = useRouter();

  watch();

  const onSubmit: SubmitHandler<FormSchemaType> = async (formData: z.infer<typeof uiSchema>) => {
    await new Promise(async (resolve) => {
        console.log(formData);
        try {
          uiSchema.parse(formData);
          const { data } = await createRobot(formData);
          resolve(data);
          router.push('/robots/list');
        } catch (e) {
          console.log(e);
        }
      });
  };

  return (
    <form className="space-y-10 text-red-50" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="">
          <span className="block">Name</span>
          <input
            type="text"
            className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
            {...register("name")}
            disabled={isSubmitting}
          />
        </label>
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="">
          <span className="block">Arms</span>
          <input
            type="number"
            className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
            {...register("arms")}
            disabled={isSubmitting}
          />
        </label>
        {errors.arms && (
          <p className="text-sm text-red-600 mt-1">{errors.arms.message}</p>
        )}
      </div>
      <div>
        <label className="">
          <span className="block">Description</span>
          <input
            type="text"
            className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
            {...register("description")}
            disabled={isSubmitting}
          />
        </label>
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}ddd</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-8 py-4 flex items-center justify-center uppercase text-white font-semibold bg-blue-600 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
        disabled={isSubmitting}
      >
        Add Robot
      </button>
    </form>
  );
};