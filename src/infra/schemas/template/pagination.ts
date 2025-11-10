import { z } from "zod";

import {
  PAGE_DEFAULT,
  PAGE_LIMIT_DEFAULT,
} from "../../../app/shared/searchParams";

const paginationSchema = z.strictObject({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : PAGE_DEFAULT))
    .pipe(z.number().int().min(1).optional()),
  pageLimit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : PAGE_LIMIT_DEFAULT))
    .pipe(z.number().int().min(1).optional()),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export { paginationSchema };
