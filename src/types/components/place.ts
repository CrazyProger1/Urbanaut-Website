import {
  APIListPlace,
  APIListPlaceFile,
  APIRetrievePlace,
  APISecurityLevel,
  APIPreservationLevel,
  APIPlaceRetrievePreservation,
  APIPlaceRetrieveSecurity,
} from "@/types/services/api";

export type Place = APIListPlace;
export type PlaceFile = APIListPlaceFile;

export type PlaceDetail = APIRetrievePlace;
export type SecurityLevel = APISecurityLevel;
export type PreservationLevel = APIPreservationLevel;
export type PlacePreservation = APIPlaceRetrievePreservation;
export type PlaceSecurity = APIPlaceRetrieveSecurity;
