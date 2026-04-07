import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabase";

export const PAGE_SIZE = 12;

export interface Course {
  id: number;
  name: string;
  duration: number | null;
  intake: string | null;
  price: number | null;
  universities: { name: string }[] | null;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export function useCourses(universityId: number, priceRanges: PriceRange[]) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [allDurations, setAllDurations] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 320);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    supabase
      .from("courses")
      .select("duration")
      .eq("university_id", universityId)
      .then(({ data }) => {
        const s = new Set<string>();
        (data ?? []).forEach((c: { duration: number | null }) => {
          if (c.duration != null) s.add(String(c.duration));
        });
        setAllDurations(Array.from(s).sort((a, b) => Number(a) - Number(b)));
      });
  }, [universityId]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;
      const pr = priceRanges[priceRangeIdx] ?? priceRanges[0];

      let query = supabase
        .from("courses")
        .select("id, name, duration, intake, price, universities(name)", { count: "exact" })
        .eq("university_id", universityId);

      if (debouncedSearch.trim()) {
        query = query.ilike("name", `%${debouncedSearch.trim()}%`);
      }
      if (durationFilter !== "all") {
        query = query.eq("duration", Number(durationFilter));
      }
      if (pr.min > 0) query = query.gte("price", pr.min);
      if (pr.max < Infinity) query = query.lt("price", pr.max);

      const { data, count, error: sbError } = await query
        .order("name")
        .range(start, end);

      if (sbError) throw new Error(sbError.message);
      setCourses((data ?? []) as Course[]);
      setTotal(count ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }, [universityId, page, debouncedSearch, durationFilter, priceRangeIdx, priceRanges]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [page, totalPages]);

  function handleFilterChange(fn: () => void) {
    fn();
    setPage(1);
  }

  return {
    courses,
    total,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch: (s: string) => handleFilterChange(() => setSearch(s)),
    durationFilter,
    setDurationFilter: (d: string) => handleFilterChange(() => setDurationFilter(d)),
    priceRangeIdx,
    setPriceRangeIdx: (i: number) => handleFilterChange(() => setPriceRangeIdx(i)),
    allDurations,
    totalPages,
    pageNumbers,
  };
}
