import clsx from 'clsx';

import { Robot } from 'models/robot';

export const RobotCard = ({ isLoading, robot }: { isLoading?: boolean, robot: Robot }) => (
  <div
    className={clsx('rounded-2xl bg-zinc-900/80 p-4', {
      'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
        isLoading,
    })}
  >
    <div className="space-y-3 text-white">
      <div className="">Name: {robot.name}</div>
      <div className="w-11/12  ">Arms: {robot.arms}</div>
      <div className="w-8/12 ">Description: {robot.description}</div>
    </div>
  </div>
);
