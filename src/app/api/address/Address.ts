import { VITE_API_MAP_KEY } from "@env";
import {
  AddressParams,
  DistanceParams,
  UpdateAddressParams,
} from "../../models/address_models";
import requests from "../request";

const mapApiKey = VITE_API_MAP_KEY;

const Address = {
  suggestAddresses: (input: string) =>
    requests.mapApiGet(
      `/Place/AutoComplete?api_key=${mapApiKey}&input=${input}&limit=${5}`
    ),
  addressToGeocode: (input: string) =>
    requests.mapApiGet(`geocode?place_id=${input}&api_key=${mapApiKey}`),
  stringAddressToGeocode: (input: string) =>
    requests.mapApiGet(`geocode?address=${input}&api_key=${mapApiKey}`),
  getUserAddress: () => requests.jwtApiGet("/addresses/customer"),
  createAddress: (input: AddressParams) =>
    requests.jwtApiPost("/addresses/customer", {
      addressBody: input.addressBody,
      district: input.district,
      city: input.city,
      coordinates: input.coordinates,
    }),
  getDistance: (input: DistanceParams) =>
    requests.mapApiGet(
      `/DistanceMatrix?origins=${input.origins}&destinations=${input.destination}&vehicle=truck&api_key=${mapApiKey}`
    ),
  updateAddress: (input: UpdateAddressParams) =>
    requests.jwtApiPut(`/addresses/${input.addressId}`, {
      addressBody: input.address.addressBody,
      city: input.address.city,
      coordinates: input.address.coordinates,
      district: input.address.district,
    }),
  deleteAddress: (input: string) => {
    requests.codeJwtApiDelete(`/addresses/${input}`);
  },
};
export default Address;
