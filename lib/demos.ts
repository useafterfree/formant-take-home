type Item = {
  name: string;
  items: {
    name: string;
    slug: string;
    description?: string;
    isDisabled?: boolean;
  }[];
};

export const demos: Item[] = [
  {
    name: 'Robots',
    items: [
      {
        name: 'Add Robot',
        slug: 'robots/add',
        description: 'Add A Robot',
      },
      {
        name: 'List Robots',
        slug: 'robots/list',
        description: 'List Robots',
      },
    ],
  },
];
