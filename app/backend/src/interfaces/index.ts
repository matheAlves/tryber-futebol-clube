export interface Login {
  email: string;
  password?: string;
}

export interface Score {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface Match extends Score {
  homeTeam: number;
  awayTeam: number;
  inProgress?: boolean;
  teamHome?: object;
  teamAway?: object;
}

// export interface Team {
//   id?: number;
//   teamName: string;
// }

export interface TeamStats {
  name?: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
