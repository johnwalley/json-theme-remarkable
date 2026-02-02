import "./App.css";

import { Resume } from "./components/resume";
import resumeJson from "./assets/resume.json";
import { z } from "zod";

const PartialDateSchema = z
  .string()
  .refine(v => /^\d{4}(-\d{2})?$/.test(v))
  .transform(v => {
    if (v.length === 4) {
      return { kind: 'year', year: Number(v) } as const;
    }

    const [y, m] = v.split('-').map(Number);
    if (m < 1 || m > 12) {
      throw new Error('Invalid month');
    }

    return { kind: 'year-month', year: y, month: m } as const;
  });

export type PartialDate = z.infer<typeof PartialDateSchema>;

const ResumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    email: z.string().email(),
    url: z.string().optional(),
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
        position: z.string().optional(),
        website: z.string().url().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        startDate: PartialDateSchema,
        endDate: PartialDateSchema.optional()
      })
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
      startDate: PartialDateSchema,
      endDate: PartialDateSchema.optional(),
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
