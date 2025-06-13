import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Database from '../utils/config/db-config';
import { Star } from './star';

export class Film extends Model<
  InferAttributes<Film>,
  InferCreationAttributes<Film>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare release_year: number;
  declare format: string;

  declare addStars: BelongsToManyAddAssociationsMixin<Star, number>;
  declare setStars: BelongsToManySetAssociationsMixin<Star, number>;
}

Film.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    tableName: 'films',
  }
);
