import { ObjectId } from "mongodb";
import { ProviderId } from "../data/providerIds";
import { RawTorontoBeachDateResponse, RawTorontoBeachResponsePoint } from "../types/toronto-city-response";


type formattedBackfillResponse = {
  _id: string,
  beachReadings: Record<string, FormattedBeachReading>
}[]

export default function formatBackfill(d: RawTorontoBeachDateResponse) {
  return d.filter(v => v?.data).map(day => {
    if (day.data) {
      return {
        createdAt: new Date(day.CollectionDate),
        ecoliData: formatReadingsForDay(day.data, day.CollectionDate)
      }
    } else {
      return null;
    }
  })
}


const addAdditionalDataToTorontoResponse = (data: RawTorontoBeachResponsePoint, date: string) => {
  return {
    ...data,
    collectionDate: date,
    provider: 'City of Toronto',
    providerId: ProviderId['CityOfToronto'],
  }
}


const formatReadingsForDay = (readings: RawTorontoBeachResponsePoint[], date: string) => {
  const formattedReadings = readings.reduce((accum, r) => {
    return {
      ...accum,
      [r.beachId]: addAdditionalDataToTorontoResponse(r, date)
    }
  }, {})

  return formattedReadings
}


type FormattedBeachReading = {
    provider: string;
    providerId: ProviderId;
    beachId: number;
    beachName: string;
    eColi: number | null;
    advisory: string;
    statusFlag: string;
}
