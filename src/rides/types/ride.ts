export enum Currency {
  USD = 'usd',
  EUR = 'eur',
}

// Данные водителя и машины копируются в поездку в момент создания.
export type Ride = {
  clientName: string;
  driverId: string;
  driverName: string;
  vehicleLicensePlate: string;
  vehicleName: string;
  price: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date | null;
  addresses: {
    from: string;
    to: string;
  };
};
