import { z } from "zod";

// JSON Resume dates are ISO 8601: "YYYY", "YYYY-MM" or "YYYY-MM-DD".
// The theme only displays year and month, so any day is dropped.
export const PartialDateSchema = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/, {
    message: 'Expected a date in the form "YYYY", "YYYY-MM" or "YYYY-MM-DD"',
  })
  .transform((v) => {
    const [year, month] = v.split("-").map(Number);
    return month === undefined
      ? ({ kind: "year", year } as const)
      : ({ kind: "year-month", year, month } as const);
  });

export type PartialDate = z.infer<typeof PartialDateSchema>;

// A subset of the JSON Resume schema (https://jsonresume.org/schema).
// Unknown fields are ignored; anything the theme can do without is optional.
export const ResumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string().optional(),
    email: z.string().email().optional(),
    url: z.string().optional(),
    phone: z.string().optional(),
    summary: z.string().optional(),
    location: z
      .object({
        city: z.string().optional(),
        countryCode: z.string().optional(),
      })
      .optional(),
    profiles: z
      .array(
        z.object({
          network: z.string(),
          username: z.string(),
          url: z.string().url().optional(),
        })
      )
      .default([]),
  }),
  work: z
    .array(
      z.object({
        name: z.string(),
        position: z.string().optional(),
        website: z.string().url().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        startDate: PartialDateSchema.optional(),
        endDate: PartialDateSchema.optional(),
      })
    )
    .default([]),
  skills: z
    .array(
      z.object({
        name: z.string(),
        level: z.string().optional(),
        keywords: z.array(z.string()).default([]),
      })
    )
    .default([]),
  education: z
    .array(
      z.object({
        institution: z.string(),
        area: z.string().optional(),
        studyType: z.string().optional(),
        startDate: PartialDateSchema.optional(),
        endDate: PartialDateSchema.optional(),
        score: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      })
    )
    .default([]),
});

/** Resume as accepted on input (before defaults and date parsing). */
export type ResumeInput = z.input<typeof ResumeSchema>;
/** Resume after validation, as the components receive it. */
export type ResumeType = z.infer<typeof ResumeSchema>;

/** Validate a resume, throwing an Error that lists every problem by path. */
export function parseResume(input: unknown): ResumeType {
  const result = ResumeSchema.safeParse(input);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid resume:\n${issues}`);
  }
  return result.data;
}
