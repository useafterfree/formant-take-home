import { NextApiRequest, NextApiResponse } from 'next'
import ShortUniqueId from 'short-unique-id';
import { Robot } from '../../models/robot';
import { RobotSchema } from 'models/RobotSchema';

const id = new ShortUniqueId({ length: 10 });

const robotStore: Robot[] = [{ id: String(id()), arms: 2, description: 'demo robot!', name: 'HAL 9001'}];

export interface TypedRequestBody<T> extends NextApiRequest {
    body: T
}

export interface TypedResponseBody<T> extends NextApiResponse {
    body: T
}

export default function handler(req: TypedRequestBody<string>, res: TypedResponseBody<Robot[]>) {
  if (req.method === 'POST' || req.method === 'post') {
    // validate the request body with zod
    try {
      const obj = JSON.parse(req.body);
      const robot = RobotSchema.omit({ id: true }).parse(obj);
      obj.id = String(id());
      robotStore.push(obj);
      res.status(200).json(obj);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(200).json(robotStore);
  }
}