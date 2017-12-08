import distribute from '../proportionate/distribute';
import csv2json from './csv2json';

describe('check for seat distribution', () => {
  const oldDataCheck = (csv) => {
    const data = csv2json(csv);
    const totalSeats = data.reduce((res, d) => res + d.seats, 0);
    // Just randomize the data, to make sure the algorithim works for any votes order
    data.sort(() => (Math.random() - 0.5));
    const res = distribute(data.map(d => d.votes), totalSeats);
    expect(res.reduce((t, a) => t + a)).toBe(totalSeats);
    expect(res).toEqual(data.map(d => d.seats));
  };

  it('validate algorithm for 2008', () => {
    oldDataCheck('election.2008.csv');
  });

  it('validate algorithm for 2013', () => {
    oldDataCheck('election.2013.csv');
  });
});
