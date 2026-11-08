import { z } from "zod";

// JSON Resume dates may be "YYYY" or "YYYY-MM" (month 01–12).
const PartialDateSchema = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, {
    message: 'Expected a date in the form "YYYY" or "YYYY-MM"',
  })
  .transform((v) => {
    const [year, month] = v.split("-").map(Number);
    return month === undefined
      ? ({ kind: "year", year } as const)
      : ({ kind: "year-month", year, month } as const);
  });

export type PartialDate = z.infer<typeof PartialDateSchema>;

export const ResumeSchema = z.object({
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
    z.object({
      name: z.string(),
      position: z.string().optional(),
      website: z.string().url().optional(),
      summary: z.string().optional(),
      highlights: z.array(z.string()).optional(),
      startDate: PartialDateSchema,
      endDate: PartialDateSchema.optional(),
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
