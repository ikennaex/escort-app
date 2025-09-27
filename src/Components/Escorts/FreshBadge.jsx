import { differenceInDays } from "date-fns";

export const isFresh = (createdAt) => differenceInDays(new Date(), new Date(createdAt)) <= 30;
