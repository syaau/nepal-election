class Party {
  constructor(index, voteCount) {
    this.index = index;
    this.voteCount = voteCount;
    this.seatCount = 0;
    this.divisor = 1.4;

    this.effectiveVotes = this.voteCount / this.divisor;
  }

  addSeat() {
    this.seatCount += 1;
    if (this.divisor < 3) {
      this.divisor = 3;
    } else {
      this.divisor += 2;
    }

    this.effectiveVotes = this.voteCount / this.divisor;
  }
}

export default function distribute(votes, seats) {
  const parties = votes.map((v, i) => new Party(i, v));

  // Sort the parties by the effective vote count
  parties.sort((a, b) => b.effectiveVotes - a.effectiveVotes);
  for (let i = 0; i < seats; i += 1) {
    // console.log(parties.map(p => p.effectiveVotes).join(', '));

    const highest = parties[0];
    highest.addSeat();

    // Bubble down the party to sort the list
    // Using a simple loop based method
    for (let j = 1; j < parties.length; j += 1) {
      if (parties[j].effectiveVotes < highest.effectiveVotes) {
        break;
      }

      parties[j - 1] = parties[j];
      parties[j] = highest;
    }
  }

  // The seat has been distrbuted, return the seat counts
  // in the same order as the votes were provided
  parties.sort((a, b) => a.index - b.index);
  return parties.map(p => p.seatCount);
}
