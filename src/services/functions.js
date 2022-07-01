import { getLocationData } from "./requests";
import { dateFormatConfig } from "./consts";

export const timeNow = new Date();

export async function sendToStorage(key,obj) {

  const dateFormatted = timeNow.toLocaleString("en-US", dateFormatConfig);

  const completeObject = {
    ...(await obj),
    date: {
      object: timeNow,
      formatted: dateFormatted
    }};

  return localStorage.setItem(key, JSON.stringify(completeObject));
}

export async function updateStorage(cityObj, storageKey) {

  const apiData = getLocationData(cityObj.city);

  const storageObj = {
    ...(await apiData),
    city: cityObj.city,
  }
  
  await sendToStorage(storageKey, storageObj);

  let cityStorage = localStorage.getItem(storageKey);
  
  cityStorage = JSON.parse(cityStorage);

  return cityStorage;
}

export async function loadCity(city) {
  
  const storageKey = `${city.city}Storage`;
  
  // mock empty storage
  localStorage.setItem(storageKey, "");

  let cityStorage = localStorage.getItem(storageKey);

  // check if storage has available data
  if (cityStorage) {
    cityStorage = JSON.parse(cityStorage);

    const storageDate = new Date(cityStorage.date.object);
    const minutes = storageDate.valueOf();
    const minutesLimit = storageDate.setMinutes(storageDate.getMinutes() > 10);
    
    if (!cityStorage.data || minutes > minutesLimit) {

      return await updateStorage(city, storageKey);
    }

    return;
  }

  return await updateStorage(city, storageKey);
}