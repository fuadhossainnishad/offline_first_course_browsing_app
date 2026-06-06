export type SortBy = "rating" | "price" | "duration";

export interface CourseFilters {
  search?: string;

  premium?: boolean;

  enrolled?: boolean;

  sortBy?: SortBy;
}
