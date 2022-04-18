export class Movie {
  title!: string;
  description!: string;
  durationInMinutes!: number;
  language!: number;
  releaseDate!: Date;
  country!: string;
  director!: string;
  genres!: string[];
  imageUrl!: string | ArrayBuffer | null;
  file?: File;
}
