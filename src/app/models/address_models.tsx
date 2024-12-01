export interface AddressData {
  addressId: number;
  accountId?: number;
  addressBody: string;
  district: string;
  city: string;
  coordinates: string;
}
export interface AddressParams {
  addressBody: string;
  district: string;
  city: string;
  coordinates: string;
}

export interface UpdateAddressParams {
  addressId: number;
  address: AddressParams;
}

export interface DistanceParams {
  origins: string;
  destination: string;
}

export interface DistanceData {
  duration: {
    text: string;
    value: number;
  };
  distance: {
    text: string;
    value: number;
  };
  status: string;
}

export interface ViewPort {
  width: number | string;
  height: number | string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface CompoundData {
  district: string;
  commune: string;
  province: string;
}

export interface MatchedSubstringsData {
  length: number;
  offset: number;
}

export interface PlusCodeData {
  compound_code: string;
  global_code: string;
}

export interface TermsData {
  offset: number;
  value: string;
}

export interface StructuredFormattingData {
  main_text: string;
  main_text_matched_substrings: MatchedSubstringsData[];
  secondary_text: string;
  secondary_text_matched_substrings: MatchedSubstringsData[];
}

export interface AddressComponentsData {
  long_name: string;
  short_name: string;
}

export interface GeometryData {
  boundary: string;
  location: GeoCodeData;
}

export interface GeoCodeData {
  lat: number;
  lng: number;
}

export interface PredictionData {
  compound: CompoundData;
  description: string;
  distance_meters: number;
  has_children: boolean;
  matched_substrings: MatchedSubstringsData[];
  place_id: string;
  plus_code: PlusCodeData;
  reference: string;
  structured_formatting: StructuredFormattingData;
  terms: TermsData[];
  types: string[];
}

export interface ChosenAddressData {
  address: string;
  address_components: AddressComponentsData[];
  compound: CompoundData;
  formatted_address: string;
  geometry: GeometryData;
  name: string;
  place_id: string;
  plus_code: PlusCodeData;
  reference: string;
  types: string[];
}
