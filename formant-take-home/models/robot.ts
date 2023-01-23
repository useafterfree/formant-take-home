import * as z from 'zod';
import { RobotSchema } from './RobotSchema';

export type Robot = z.infer<typeof RobotSchema>;
