import "./App.css";

import { Resume } from "./components/resume";
import resumeJson from "./assets/resume.json";
import { z } from "zod";

const ResumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    email: z.string().email(),
    url: z.string().url().optional(),
    phone: z.string().optional(),
    summary: z.string(),
    location: z
      .object({
        city: z.string(),
        countryCode: z.string(),
      })
      .optional(),
    profiles: z.array(
      z.object({
        network: z.string(),
        username: z.string(),
        url: z.string().url(),
      })
    ),
  }),
  work: z.array(
    z
      .object({
        name: z.string(),
        position: z.string(),
        website: z.string().url().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      })
      .and(
        z.union([
          z.object({ startDate: z.string(), endDate: z.string().optional() }),
          z.object({ date: z.string() }),
        ])
      )
  ),
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.string().optional(),
      keywords: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      area: z.string(),
      studyType: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      score: z.string().optional(),
      summary: z.string().optional(),
      highlights: z.array(z.string()).optional(),
    })
  ),
});

export type ResumeType = z.infer<typeof ResumeSchema>;

const resume = ResumeSchema.parse(resumeJson);

function App() {
  return <Resume resume={resume} />;
}

export default App;
