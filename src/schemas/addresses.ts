import { z } from "zod";

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  city: z.string(),
  country: z.string(),
  pincode: z.string().length(6),
});
