export const reqUrl = 'http://localhost:3000/api/lanes';

interface Coordinate {
  coordinates: [number, number];
}

interface Adjacent {
  adjacentVertex: number;
  interiorPath: Coordinate[];
}
interface Vertices {
  id: string;
  name: string;
  vertices: Vertex[];
}

export interface Vertex {
  id: number;
  name: string;
  vertexType: string;
  isEntry: boolean;
  location: Coordinate;
  adjacent: Adjacent[];
}
export interface Lanes {
  id: number;
  data: Vertices;
}

export function getLanesData() {
  return [
    { id: 1, value: 'Lane 1' },
    { id: 2, value: 'Lane 2' },
  ];
}

const mockVertices: Vertex[] = [
  {
    id: 0,
    name: 'Order',
    vertexType: 'SERVICE_POINT',
    isEntry: true,
    location: { coordinates: [1, 2] },
    adjacent: [
      {
        adjacentVertex: 1,
        interiorPath: [],
      },
    ],
  },
  {
    id: 1,
    name: 'Cash',
    vertexType: 'SERVICE_POINT',
    isEntry: false,
    location: { coordinates: [3, 4] },
    adjacent: [],
  },
];

export function mockLanesData() {
  return {
    id: 1,
    data: {
      id: '1',
      name: 'Lane 1',
      vertices: mockVertices,
    },
  };
}
