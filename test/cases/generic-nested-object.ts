interface HeapStatistics {}
interface HeapSpaceStatistics {}

interface GCProfilerResult {
  version: number;
  startTime: number;
  endTime: number;
  statistics: Array<{
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
  }>;
}