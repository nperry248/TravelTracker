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

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS chat_logs (
      log_id INTEGER PRIMARY KEY AUTOINCREMENT,
      query_name TEXT,
      query_response TEXT
    );`
  )
};


// Trip Methods
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


// TravelChat Methods


export const addChatLog = async (queryName, queryResponse) => {
  const result = await db.runAsync(
    `INSERT INTO chat_logs (query_name, query_response) VALUES (?, ?);`,
    queryName, queryResponse
  );
  return result;
};

export const getChatLogs = async () => {
  const result = await db.getAllAsync(`SELECT * FROM chat_logs;`);
  return result;
};

export const deleteChatLog = async (logId) => {
  const result = await db.runAsync(
    `DELETE FROM chat_logs WHERE log_id = ?;`,
    logId
  );
  return result
}

export default db;
