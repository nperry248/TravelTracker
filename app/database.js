// app/database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('TravelTrackerDB.db');

export const initializeDatabase = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      startdate TEXT,
      enddate TEXT,
      status TEXT,
      people TEXT,
      TravelTo TEXT,
      TravelBack TEXT,
      Accomodation1 TEXT,
      Accomodation2 TEXT,
      ExtraTravel TEXT,
      ExtraAccomodation TEXT,
      notes TEXT
    );`
  );
};

export const addTrip = async (trip) => {
  const { title, startdate, enddate, status, people, TravelTo, TravelBack, Accomodation1, Accomodation2, ExtraTravel, ExtraAccomodation, notes } = trip;
  const result = await db.runAsync(
    `INSERT INTO trips (title, startdate, enddate, status, people, TravelTo, TravelBack, Accomodation1, Accomodation2, ExtraTravel, ExtraAccomodation, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    title, startdate, enddate, status, people, TravelTo, TravelBack, Accomodation1, Accomodation2, ExtraTravel, ExtraAccomodation, notes
  );
  return result;
};

export const updateTrip = async (trip) => {
  const { id, title, startdate, enddate, status, people, TravelTo, TravelBack, Accomodation1, Accomodation2, ExtraTravel, ExtraAccomodation, notes } = trip;
  const result = await db.runAsync(
    `UPDATE trips SET title = ?, startdate = ?, enddate = ?, status = ?, people = ?, TravelTo = ?, TravelBack = ?, Accomodation1 = ?, Accomodation2 = ?, ExtraTravel = ?, ExtraAccomodation = ?, notes = ?
     WHERE id = ?;`,
    title, startdate, enddate, status, people, TravelTo, TravelBack, Accomodation1, Accomodation2, ExtraTravel, ExtraAccomodation, notes, id
  );
  return result;
};

export const deleteTrip = async (id) => {
  const result = await db.runAsync(
    `DELETE FROM trips WHERE id = ?;`,
    id
  );
  return result;
};

export const getTrips = async () => {
  const result = await db.getAllAsync(`SELECT * FROM trips;`);
  return result;
};

export default db;
