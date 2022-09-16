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

export interface Team {
  id: number;
  teamName: string;
}
