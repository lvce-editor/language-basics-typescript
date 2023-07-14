type Statistics = {
  gcType: string;
  cost: number;
  beforeGC: {
      heapStatistics: HeapStatistics;
      heapSpaceStatistics: HeapSpaceStatistics[];
  };
  afterGC: {
      heapStatistics: HeapStatistics;
      heapSpaceStatistics: HeapSpaceStatistics[];
  };
}