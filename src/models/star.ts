import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Database from '../utils/config/db-config';

export class Star extends Model<
  InferAttributes<Star>,
  InferCreationAttributes<Star>
> {
  declare id: CreationOptional<string>;
  declare name: string;
}

Star.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: Database,
    tableName: 'stars',
  }
);
