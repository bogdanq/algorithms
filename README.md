## Визуализация алгоритмов поиска по графу

[Try it](https://bogdanq.github.io/algorithms/)

- [Поиск в глубину](https://github.com/bogdanq/algorithms/blob/master/src/algoritms/depth-first-search.ts)
- [Поиск в ширину](https://github.com/bogdanq/algorithms/blob/master/src/algoritms/bred-first-search.ts)
- [Алгоритм Дейкстры](https://github.com/bogdanq/algorithms/blob/master/src/algoritms/dijkstra/dijkstra.md)
- [Алгоритм A - star](https://github.com/bogdanq/algorithms/blob/master/src/algoritms/a-start/a-start.md)

## Структура графа

      Стоимость графа указана в самой вершине, потому что во все стороны ее вес одинаков

```ts
export type Vertex = {
  type: BarrierType;
  siblings: Array<{ vertex: number }>;
  weight?: number;
};

export type GraphType = {
  [key: string]: Vertex;
};
```
