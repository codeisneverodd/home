export type Prob = {
  id: string;
  title: string;
  level: 0 | 1 | 2 | 3 | 4 | 5;
};

export type Sol = {
  id: string;
  probId: string;
  code: string;
  author: string;
};

export type Repo = {
  probs: Prob[];
  sols: Sol[];
};
