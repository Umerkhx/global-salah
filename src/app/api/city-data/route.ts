// app/api/city-data/route.ts
import { countriesData } from '@/lib/cityDataWithTimezone';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const city = searchParams.get('city');

  if (!country || !city) {
    return NextResponse.json(
      { error: 'Country and city parameters are required' },
      { status: 400 }
    );
  }

  const normalizedCountry = country.toLowerCase().replace(/-/g, ' ');
  // Find all matching countries instead of just the first one
  const matchingCountries = countriesData.filter(c =>
    c.name.toLowerCase() === normalizedCountry ||
    c.code.toLowerCase() === normalizedCountry
  );
  
  // Try to find the country that contains the requested city
  let countryData = null;
  let cityData = null;
  
  for (const country of matchingCountries) {
    const normalizedCity = city.toLowerCase().replace(/-/g, ' ');
    const foundCity = country.cities.find(c =>
      c.name.toLowerCase() === normalizedCity
    );
    if (foundCity) {
      countryData = country;
      cityData = foundCity;
      break;
    }
  }
  
  // If we couldn't find the city in any matching country, use the first match
  if (!countryData && matchingCountries.length > 0) {
    countryData = matchingCountries[0];
  }
  
  if (!countryData) {
    return NextResponse.json(
      { error: 'Country not found' },
      { status: 404 }
    );
  }
  
  // If we haven't found the city yet, try to find it in the selected country
  if (!cityData) {
    const normalizedCity = city.toLowerCase().replace(/-/g, ' ');
    cityData = countryData.cities.find(c =>
      c.name.toLowerCase() === normalizedCity
    );
  }

  if (!cityData) {
    return NextResponse.json(
      { error: 'City not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    country: countryData.name,
    countryCode: countryData.code,
    city: cityData,
    timezones: {
      zone: cityData.timezone
    },
    cities: countryData.cities
  });
}