import { Model, INTEGER } from 'sequelize';
import TeamModel from './team.model';
import db from '.';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'teamHome' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'teamAway' });

MatchModel.hasMany(TeamModel, { foreignKey: 'homeTeam', as: 'match' });
MatchModel.hasMany(TeamModel, { foreignKey: 'awayTeam', as: 'match' });

export default MatchModel;
