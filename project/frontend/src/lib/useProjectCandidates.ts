import { useQuery } from "@tanstack/react-query";

export interface Candidate {
  id: number;
  name: string;
  title: string;
  skills: string;
  yearsExperience: number;
  bio: string;
  availability: string;
  monthlyRate: number;
  location: string;
  categories: string;
  matchScore?: number;
}

export function useProjectCandidates(projectId: number) {
  return useQuery<Candidate[]>({
    queryKey: ["project-candidates", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/suggested-candidates`);
      if (!res.ok) throw new Error("Failed to fetch candidates");
      return res.json();
    },
    enabled: projectId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
