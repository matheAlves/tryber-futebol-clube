export interface Login {
  email: string;
  password?: string;
}

export interface Match {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: object;
  teamAway?: object;
}
