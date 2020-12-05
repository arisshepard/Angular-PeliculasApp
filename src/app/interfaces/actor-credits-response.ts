export interface ActorCreditsResponse {
  cast: CastActor[];
  crew: any[];
  id: number;
}

export interface CastActor {
  character: string;
  credit_id: string;
  release_date?: Date;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: OriginalLanguage;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: null | string;
  overview: string;
  poster_path: null | string;
}

export enum OriginalLanguage {
  CN = 'cn',
  En = 'en',
  Zh = 'zh',
}
