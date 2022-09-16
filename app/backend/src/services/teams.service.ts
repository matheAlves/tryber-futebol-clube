import TeamModel from '../database/models/team.model';

export default class TeamsService {
  static async list() {
    const allTeams = await TeamModel.findAll({ raw: true });
    return allTeams;
  }

  static async getTeamById(id: number): Promise<TeamModel> {
    const team = await TeamModel.findOne({ where: { id } });
    return team as TeamModel;
  }
}
