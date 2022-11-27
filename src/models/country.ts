type CountryType = "Sovereign country" | "Country" | "Dependency" | "Indeterminate" | "Disputed";

export type CountryRaw = {
  scalerank: number;
  labelrank: number;
  featurecla: string;
  sovereignt: string;
  sov_a3: string;
  adm0_dif: number;
  level: number;
  type: CountryType;
  admin: string;
  adm0_a3: string;
  geou_dif: number;
  geounit: string;
  gu_a3: string;
  su_dif: number;
  subunit: string;
  su_a3: string;
  name: string;
  abbrev: string;
  postal: string;
  name_forma: string;
  terr_: string;
  name_sort: string;
  map_color: number;
  pop_est: number;
  gdp_md_est: number;
  fips_10_: number;
  iso_a2: string;
  iso_a3: string;
  iso_n3: number;
  flag_png: string;
  lat: number;
  lng: number;
};

export type Country = Pick<
  CountryRaw,
  "name" | "pop_est" | "type" | "iso_a3" | "flag_png" | "gdp_md_est" | "sovereignt" | "lat" | "lng"
>;
