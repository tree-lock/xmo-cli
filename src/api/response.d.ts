export interface RawRanking {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: string;
}

export interface RankingResponse {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: string;
  results: Array<RawRanking>;
  last_page: 20;
}
